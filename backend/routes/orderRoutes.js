const express = require('express');
const { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  updateOrderStatus, 
  cancelOrder 
} = require('../controllers/orderController.js');

const router = express.Router();

// Create Order from Cart
router.post('/create', createOrder);

// Get User Order History
router.get('/user/:userId', getUserOrders);

// Get Single Order Details
router.get('/:orderId', getOrderById);

// Update Order Status
router.put('/:orderId', updateOrderStatus);

// Cancel Order
router.delete('/:orderId/cancel', cancelOrder);

module.exports = router;