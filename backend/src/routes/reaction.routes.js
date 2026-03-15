const router = require('express').Router();
const ctrl = require('../controllers/reaction.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/my', protect, ctrl.getMyReactions);
router.post('/:commentId', protect, ctrl.upsertReaction);
router.delete('/:commentId', protect, ctrl.removeReaction);

module.exports = router;
