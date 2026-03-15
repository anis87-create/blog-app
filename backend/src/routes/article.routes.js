const router = require('express').Router();
const ctrl = require('../controllers/article.controller');
const { protect, requireRole, optionalAuth } = require('../middlewares/auth.middleware');

router.get('/', ctrl.getArticles);
router.get('/top-rated', ctrl.getTopRated);
router.get('/featured', ctrl.getFeatured);
router.get('/my', protect, ctrl.getMyArticles);
router.get('/:slug', optionalAuth, ctrl.getBySlug);

router.post('/', protect, requireRole('author', 'admin'), ctrl.createArticle);
router.put('/:id', protect, requireRole('author', 'admin'), ctrl.updateArticle);
router.delete('/:id', protect, requireRole('author', 'admin'), ctrl.deleteArticle);
router.patch('/:id/status', protect, requireRole('admin'), ctrl.updateStatus);
router.patch('/:id/featured', protect, requireRole('admin'), ctrl.toggleFeatured);

module.exports = router;
