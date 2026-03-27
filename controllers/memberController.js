const User = require('../models/User');
const Booking = require('../models/Booking');
const Class = require('../models/Class');
const Pass = require('../models/Pass');

// @desc    Get site-wide stats
// @route   GET /api/members/stats
// @access  Public
exports.getStats = async (req, res) => {
  try {
    const [members, classes, bookings, passes] = await Promise.all([
      User.countDocuments(),
      Class.countDocuments({ isActive: true }),
      Booking.countDocuments({ status: 'booked' }),
      Pass.countDocuments({ isActive: true }),
    ]);

    res.json({
      data: {
        totalMembers: members,
        totalClasses: classes,
        activeBookings: bookings,
        availablePasses: passes,
        trainers: 12,
        locations: 3,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get member profile with bookings
// @route   GET /api/members/profile
// @access  Member
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('activePass.pass');
    const bookingCount = await Booking.countDocuments({
      user: req.user._id,
      status: 'booked',
    });

    res.json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        activePass: user.activePass,
        totalBookings: bookingCount,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
