import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';

const router = express.Router();

// Middleware to verify Admin credentials in headers
const verifyAdmin = (req, res, next) => {
  const adminEmail = req.headers['x-admin-email'];
  const adminPassword = req.headers['x-admin-password'];

  if (adminEmail === 'freeeebird03@gmail.com' && adminPassword === 'Leeza@2210202') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Only the administrator can access this resource.', success: false });
  }
};

// @route   GET /api/admin/users
// @desc    Get all registered CRM users (excluding admin)
// @access  Private (Admin only)
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({ email: { $ne: 'freeeebird03@gmail.com' } }).sort({ createdAt: -1 });
    res.json({
      success: true,
      totalUsers: users.length,
      users: users.map(u => ({
        id: u._id,
        shopName: u.shopName,
        ownerName: u.ownerName,
        email: u.email,
        mobile: u.mobile,
        password: u.password, // Visible to admin as requested for user support
        role: u.role,
        plan: u.plan || 'Starter',
        createdAt: u.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update a user's plan or details
// @access  Private (Admin only)
router.put('/users/:id', verifyAdmin, async (req, res) => {
  try {
    const { shopName, ownerName, email, mobile, password, plan, role } = req.body;
    
    // Find user
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    // Do not allow changing admin's details via this endpoint
    if (user.email === 'freeeebird03@gmail.com') {
      return res.status(400).json({ message: 'Cannot modify primary administrator credentials via this route.', success: false });
    }

    // Update fields if provided
    if (shopName) user.shopName = shopName;
    if (ownerName) user.ownerName = ownerName;
    if (email) user.email = email;
    if (mobile !== undefined) user.mobile = mobile;
    if (password) user.password = password;
    if (plan) user.plan = plan;
    if (role) user.role = role;

    await user.save();

    res.json({
      message: 'User updated successfully!',
      success: true,
      user: {
        id: user._id,
        shopName: user.shopName,
        ownerName: user.ownerName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        plan: user.plan,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private (Admin only)
router.delete('/users/:id', verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    if (user.email === 'freeeebird03@gmail.com') {
      return res.status(400).json({ message: 'Cannot delete primary administrator account.', success: false });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully from MongoDB', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders and day-to-day revenue/count breakdown
// @access  Private (Admin only)
router.get('/orders', verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    
    // Group orders day-to-day
    const statsMap = {};
    let totalRevenue = 0;
    
    orders.forEach(order => {
      // Use stored date, or fallback to locale formatted date of creation
      const dateStr = order.date || new Date(order.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      
      // Clean amount from non-numeric characters (like currency symbols or commas) and parse
      const amtNum = parseFloat(String(order.amt).replace(/[^0-9.]/g, '')) || 0;
      totalRevenue += amtNum;
      
      if (!statsMap[dateStr]) {
        statsMap[dateStr] = {
          date: dateStr,
          orderCount: 0,
          revenue: 0
        };
      }
      statsMap[dateStr].orderCount += 1;
      statsMap[dateStr].revenue += amtNum;
    });
    
    // Convert grouped day-to-day map to sorted list
    const dailyStats = Object.values(statsMap).sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      totalOrders: orders.length,
      totalRevenue,
      dailyStats,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
