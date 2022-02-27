const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: {
          type: String,
          required: [true, 'Please provide a name for order item'],
        },
        price: {
          type: String,
          required: [true, 'Please provide a price for order item'],
        },
        image: [String],
        quantity: {
          type: Number,
          required: [true, 'Please provide a quantity for order item'],
        },
      },
    ],
    tax: {
      type: Number,
      required: [true, 'Please provide tax cost'],
      default: 0.0,
    },
    shippingFee: {
      type: Number,
      required: [true, 'Please provide a shipping fee'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please provide total price'],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: [true, 'Please confirm payment status'],
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: [true, 'Please confirm delivery status'],
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    shippingAddress: {
      address: {
        type: String,
        required: [true, 'Please provide a valid address'],
      },
      city: {
        type: String,
        required: [true, 'Please provide a city name'],
      },
      postalCode: {
        type: String,
        required: [true, 'Please provide a valid postal code'],
      },
      country: {
        type: String,
        required: [true, 'Please provide a country name'],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, 'Please provide payment method'],
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      updateTime: { type: String },
      email: { type: String },
    },
    dateAdded: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
