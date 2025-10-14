const express = require('express');
const router = express.Router();
require('dotenv').config(); // Make sure this is at the top of your entry file
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../Models/OrderModel');

// Process payment
router.post('/process', async (req, res) => {
  try {
    const {
      name,
      email,
      cardNumber,
      expiryDate,
      cvv,
      address,
      city,
      zipCode,
      country,
      amount,
      currency = 'usd',
      items
    } = req.body;

    // Validate required fields
    if (!name || !email || !cardNumber || !expiryDate || !cvv || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment information'
      });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    // Parse expiry date
    const [month, year] = expiryDate.split('/');
    const expMonth = parseInt(month);
    const expYear = parseInt('20' + year);

    // Validate expiry date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return res.status(400).json({
        success: false,
        message: 'Card has expired'
      });
    }

    // Create payment method
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvv,
      },
      billing_details: {
        name: name,
        email: email,
        address: {
          line1: address,
          city: city,
          postal_code: zipCode,
          country: country,
        },
      },
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency,
      payment_method: paymentMethod.id,
      confirm: true,
      return_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/MainPage`,
      metadata: {
        customer_name: name,
        customer_email: email,
        items: JSON.stringify(items),
        shipping_address: `${address}, ${city}, ${zipCode}, ${country}`
      }
    });

    // Check if payment was successful
    if (paymentIntent.status === 'succeeded') {
      try {
        // Save order to database
        const order = new Order({
          customerName: name,
          customerEmail: email,
          items: items,
          totalAmount: amount / 100, // Convert back to dollars
          currency: currency,
          paymentIntentId: paymentIntent.id,
          paymentStatus: 'succeeded',
          shippingAddress: {
            street: address,
            city: city,
            zipCode: zipCode,
            country: country
          }
        });

        await order.save();

        // Here you would typically:
        // 1. Update inventory
        // 2. Send confirmation email
        // 3. Log the transaction

        return res.status(200).json({
          success: true,
          message: 'Payment processed successfully',
          paymentIntentId: paymentIntent.id,
          orderId: order._id,
          amount: amount / 100, // Convert back to dollars
          currency: currency
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Payment succeeded but order save failed
        return res.status(200).json({
          success: true,
          message: 'Payment processed successfully but order save failed',
          paymentIntentId: paymentIntent.id,
          amount: amount / 100,
          currency: currency
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment failed',
        status: paymentIntent.status
      });
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    } else if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment information'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error during payment processing'
      });
    }
  }
});

// Get payment status
router.get('/status/:paymentIntentId', async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    return res.status(200).json({
      success: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency
    });
  } catch (error) {
    console.error('Error retrieving payment status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving payment status'
    });
  }
});

// Refund payment
router.post('/refund/:paymentIntentId', async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const { amount, reason } = req.body;

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount, // Amount in cents
      reason: reason || 'requested_by_customer'
    });

    return res.status(200).json({
      success: true,
      message: 'Refund processed successfully',
      refundId: refund.id,
      amount: refund.amount / 100
    });
  } catch (error) {
    console.error('Refund error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing refund'
    });
  }
});

// Get all orders (admin endpoint)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .select('-__v');
    
    return res.status(200).json({
      success: true,
      orders: orders
    });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving orders'
    });
  }
});

// Get orders by customer email
router.get('/orders/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    const orders = await Order.find({ customerEmail: email })
      .sort({ createdAt: -1 })
      .select('-__v');
    
    return res.status(200).json({
      success: true,
      orders: orders
    });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving orders'
    });
  }
});

// Get order by ID
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId).select('-__v');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      order: order
    });
  } catch (error) {
    console.error('Error retrieving order:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving order'
    });
  }
});

// Update order status
router.patch('/order/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).select('-__v');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating order status'
    });
  }
});

module.exports = router;
