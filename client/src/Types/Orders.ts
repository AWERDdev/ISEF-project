export type OrderItem = {
    name: string;
    price: number;
    quantity: number;
}

export type Order = {
    _id: string;
    customerName: string;
    customerEmail: string;
    items: OrderItem[];
    totalAmount: number;
    currency: string;
    paymentStatus: 'pending' | 'succeeded' | 'failed' | 'refunded';
    orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: {
      street: string;
      city: string;
      zipCode: string;
      country: string;
    };
    createdAt: string;
    updatedAt: string;
  }