const Booking = require('../models/Booking');
const Class = require('../models/Class');

// @desc    Book a class
// @route   POST /api/bookings
// @access  Member
exports.createBooking = async (req, res) => {
  try {
    const { classId } = req.body;

    const cls = await Class.findById(classId);
    if (!cls) return res.status(404).json({ message: 'Class not found' });

    // Check if already booked
    const existing = await Booking.findOne({
      user: req.user._id,
      class: classId,
      status: 'booked',
    });
    if (existing) {
      return res.status(400).json({ message: 'You have already booked this class' });
    }

    // Check capacity
    if (cls.enrolled >= cls.capacity) {
      return res.status(400).json({ message: 'Class is full' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      class: classId,
    });

    // Increment enrolled count
    cls.enrolled += 1;
    await cls.save();

    const populated = await booking.populate('class', 'name tag schedule emoji');

    res.status(201).json({ data: populated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get my bookings
// @route   GET /api/bookings/my
// @access  Member
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
      status: 'booked',
    })
      .populate('class', 'name tag schedule emoji category')
      .sort({ createdAt: -1 });

    res.json({ data: bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Member
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Decrement enrolled count
    await Class.findByIdAndUpdate(booking.class, { $inc: { enrolled: -1 } });

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('class', 'name tag schedule')
      .sort({ createdAt: -1 });

    res.json({ data: bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
