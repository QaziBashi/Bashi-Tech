const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

// Create Order from Cart
exports.createOrder = async (req, res) => {
  try {
    const { items, userId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Generate unique order ID
    const orderId = `order_${uuidv4()}`;

    // Create order in database
    const order = new Order({
      orderId,
      items: items.map(item => ({
        name: item.fullData.name || item.name,
        price: item.fullData.price || item.price,
        quantity: item.quantity
      })),
      totalAmount,
      userId: require('mongoose').Types.ObjectId(userId), // Convert string to ObjectId
      status: 'pending'
    });

    await order.save();

    res.status(201).json({
      success: true,
      orderId,
      items: order.items,
      totalAmount,
      status: 'pending'
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Get User Order History
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get Single Order Details
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID required' });
    }

    const order = await Order.findOne({ orderId })
      .lean();

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID required' });
    }

    if (!['pending', 'paid', 'cancelled', 'failed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { 
        status,
        updatedAt: new Date(),
        ...(status === 'paid' && { paidAt: new Date() })
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      order
    });

  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Cancel Order
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID required' });
    }

    const order = await Order.findOneAndUpdate(
      { orderId, status: { $in: ['pending', 'failed'] } },
      { 
        status: 'cancelled',
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found or cannot be cancelled' });
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
};