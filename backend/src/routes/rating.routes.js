const router = require('express').Router();
const ctrl = require('../controllers/rating.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/:articleId', protect, ctrl.submitRating);
router.get('/:articleId/me', protect, ctrl.getMyRating);
router.delete('/:articleId', protect, ctrl.deleteRating);

module.exports = router;
