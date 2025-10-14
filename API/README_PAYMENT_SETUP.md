# Payment System Setup Guide

This guide will help you set up the payment system for the medical SaaS application.

## Prerequisites

1. Node.js and npm installed
2. MongoDB database running
3. Stripe account (for payment processing)

## Setup Steps

### 1. Install Dependencies

Navigate to the API directory and install the required dependencies:

```bash
cd SaaS/API
npm install
```

### 2. Stripe Setup

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add the following environment variables to your `.env` file:

```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
CLIENT_URL=http://localhost:3000
```

### 3. Environment Variables

Create a `.env` file in the `SaaS/API` directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Application
CLIENT_URL=http://localhost:3000
PORT=3500

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Database Setup

The payment system uses MongoDB with the following collections:
- `orders` - Stores order and payment information

The Order model includes:
- Customer information (name, email)
- Order items and total amount
- Payment details (Stripe payment intent ID)
- Shipping address
- Order and payment status

### 5. API Endpoints

The payment system provides the following endpoints:

#### Process Payment
- **POST** `/api/payment/process`
- Processes a payment using Stripe
- Saves order information to database

#### Get Payment Status
- **GET** `/api/payment/status/:paymentIntentId`
- Retrieves the status of a payment

#### Refund Payment
- **POST** `/api/payment/refund/:paymentIntentId`
- Processes a refund for a payment

#### Get Customer Orders
- **GET** `/api/payment/orders/:email`
- Retrieves all orders for a customer

#### Get Order Details
- **GET** `/api/payment/order/:orderId`
- Retrieves specific order details

#### Update Order Status
- **PATCH** `/api/payment/order/:orderId/status`
- Updates the status of an order

### 6. Frontend Integration

The frontend (`PurchasePage`) is already configured to:
- Load cart items from localStorage
- Display order summary
- Collect payment information
- Send payment data to the API
- Handle success/error responses

### 7. Testing

#### Test Card Numbers (Stripe Test Mode)

Use these test card numbers for testing:

- **Visa**: 4242424242424242
- **Visa (debit)**: 4000056655665556
- **Mastercard**: 5555555555554444
- **American Express**: 378282246310005

#### Test CVV and Expiry
- **CVV**: Any 3 digits (e.g., 123)
- **Expiry**: Any future date (e.g., 12/25)

### 8. Security Considerations

1. **Never expose Stripe secret keys in frontend code**
2. **Always validate payment data on the server**
3. **Use HTTPS in production**
4. **Implement proper error handling**
5. **Log payment events for audit trails**

### 9. Production Deployment

For production deployment:

1. Use production Stripe keys
2. Set up webhook endpoints for payment events
3. Implement proper error monitoring
4. Set up database backups
5. Configure SSL certificates
6. Set up monitoring and logging

### 10. Webhook Setup (Optional)

To handle real-time payment events, set up Stripe webhooks:

1. Create webhook endpoint in your API
2. Configure webhook URL in Stripe Dashboard
3. Handle events like `payment_intent.succeeded`, `payment_intent.payment_failed`

### 11. Error Handling

The system handles various error scenarios:
- Invalid payment information
- Expired cards
- Insufficient funds
- Network errors
- Database errors

### 12. Monitoring

Monitor the following:
- Payment success/failure rates
- API response times
- Database performance
- Error logs
- Stripe dashboard metrics

## Troubleshooting

### Common Issues

1. **Payment fails with "Invalid card number"**
   - Ensure you're using test card numbers in test mode
   - Check that the card number format is correct

2. **"Stripe secret key not found" error**
   - Verify your `.env` file has the correct `STRIPE_SECRET_KEY`
   - Ensure the key starts with `sk_test_` for test mode

3. **Database connection errors**
   - Check your MongoDB connection string
   - Ensure MongoDB is running

4. **CORS errors**
   - Verify the `CORS_ORIGIN` in your `.env` file matches your frontend URL

### Support

For issues with:
- **Stripe**: Check [Stripe Documentation](https://stripe.com/docs)
- **MongoDB**: Check [MongoDB Documentation](https://docs.mongodb.com)
- **Application**: Check the application logs and error messages

## Next Steps

After setup, consider implementing:
1. Email notifications for successful payments
2. Inventory management integration
3. Order tracking system
4. Customer support integration
5. Analytics and reporting
6. Multi-currency support
7. Subscription billing
8. Automated refund processing 