const router = require('express').Router();
const ctrl = require('../controllers/comment.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/:articleId', ctrl.getComments);
router.post('/:articleId', protect, ctrl.postComment);
router.put('/:id', protect, ctrl.editComment);
router.delete('/:id', protect, ctrl.deleteComment);

module.exports = router;
