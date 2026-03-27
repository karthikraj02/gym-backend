const router = require('express').Router();
const { getStats, getProfile } = require('../controllers/memberController');
const { protect } = require('../middleware/auth');

router.get('/stats', getStats);
router.get('/profile', protect, getProfile);

module.exports = router;
