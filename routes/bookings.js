const router = require('express').Router();
const {
  createBooking, getMyBookings, cancelBooking, getAllBookings,
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.delete('/:id', protect, cancelBooking);
router.get('/', protect, adminOnly, getAllBookings);

module.exports = router;
