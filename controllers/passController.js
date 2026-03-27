const Pass = require('../models/Pass');
const User = require('../models/User');

// @desc    Get all passes
// @route   GET /api/passes
// @access  Public
exports.getPasses = async (req, res) => {
  try {
    const passes = await Pass.find({ isActive: true }).sort({ price: -1 });
    res.json({ data: passes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single pass
// @route   GET /api/passes/:id
// @access  Public
exports.getPass = async (req, res) => {
  try {
    const pass = await Pass.findById(req.params.id);
    if (!pass) return res.status(404).json({ message: 'Pass not found' });
    res.json({ data: pass });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a pass (admin)
// @route   POST /api/passes
// @access  Admin
exports.createPass = async (req, res) => {
  try {
    const pass = await Pass.create(req.body);
    res.status(201).json({ data: pass });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a pass (admin)
// @route   PUT /api/passes/:id
// @access  Admin
exports.updatePass = async (req, res) => {
  try {
    const pass = await Pass.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pass) return res.status(404).json({ message: 'Pass not found' });
    res.json({ data: pass });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a pass (admin)
// @route   DELETE /api/passes/:id
// @access  Admin
exports.deletePass = async (req, res) => {
  try {
    const pass = await Pass.findByIdAndDelete(req.params.id);
    if (!pass) return res.status(404).json({ message: 'Pass not found' });
    res.json({ message: 'Pass deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Activate a pass for current user
// @route   POST /api/passes/:id/activate
// @access  Member
exports.activatePass = async (req, res) => {
  try {
    const pass = await Pass.findById(req.params.id);
    if (!pass) return res.status(404).json({ message: 'Pass not found' });

    const now = new Date();
    const expiresAt = new Date(now.getTime() + pass.durationDays * 24 * 60 * 60 * 1000);

    await User.findByIdAndUpdate(req.user._id, {
      activePass: {
        pass: pass._id,
        name: pass.name,
        activatedAt: now,
        expiresAt: expiresAt,
      },
    });

    res.json({
      message: `${pass.name} activated successfully!`,
      activePass: {
        name: pass.name,
        activatedAt: now,
        expiresAt: expiresAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
