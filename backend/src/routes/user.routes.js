const router = require('express').Router();
const ctrl = require('../controllers/user.controller');
const { protect, requireRole } = require('../middlewares/auth.middleware');

router.get('/me', protect, ctrl.getMe);
router.put('/me', protect, ctrl.updateMe);
router.put('/me/password', protect, ctrl.changePassword);
router.get('/:id', ctrl.getPublicProfile);

// Admin
router.get('/', protect, requireRole('admin'), ctrl.listUsers);
router.put('/:id/role', protect, requireRole('admin'), ctrl.updateRole);
router.delete('/:id', protect, requireRole('admin'), ctrl.deleteUser);

module.exports = router;
