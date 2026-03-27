const router = require('express').Router();
const {
  getPasses, getPass, createPass, updatePass, deletePass, activatePass,
} = require('../controllers/passController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getPasses);
router.get('/:id', getPass);
router.post('/', protect, adminOnly, createPass);
router.put('/:id', protect, adminOnly, updatePass);
router.delete('/:id', protect, adminOnly, deletePass);
router.post('/:id/activate', protect, activatePass);

module.exports = router;
