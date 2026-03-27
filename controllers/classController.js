const Class = require('../models/Class');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Public
exports.getClasses = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) {
      filter.category = new RegExp(req.query.category, 'i');
    }
    const classes = await Class.find(filter).sort({ createdAt: -1 });
    res.json({ data: classes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single class
// @route   GET /api/classes/:id
// @access  Public
exports.getClass = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json({ data: cls });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a class (admin)
// @route   POST /api/classes
// @access  Admin
exports.createClass = async (req, res) => {
  try {
    const cls = await Class.create(req.body);
    res.status(201).json({ data: cls });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a class (admin)
// @route   PUT /api/classes/:id
// @access  Admin
exports.updateClass = async (req, res) => {
  try {
    const cls = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json({ data: cls });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a class (admin)
// @route   DELETE /api/classes/:id
// @access  Admin
exports.deleteClass = async (req, res) => {
  try {
    const cls = await Class.findByIdAndDelete(req.params.id);
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
