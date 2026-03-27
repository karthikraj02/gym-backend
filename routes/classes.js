const router = require('express').Router();
const {
  getClasses, getClass, createClass, updateClass, deleteClass,
} = require('../controllers/classController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getClasses);
router.get('/:id', getClass);
router.post('/', protect, adminOnly, createClass);
router.put('/:id', protect, adminOnly, updateClass);
router.delete('/:id', protect, adminOnly, deleteClass);

module.exports = router;
