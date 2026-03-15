const router = require('express').Router();
const ctrl = require('../controllers/favorite.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', protect, ctrl.getFavorites);
router.post('/:articleId', protect, ctrl.addFavorite);
router.delete('/:articleId', protect, ctrl.removeFavorite);
router.get('/:articleId/check', protect, ctrl.checkFavorite);

module.exports = router;
