const Comment = require('../models/Comment');
const Article = require('../models/Article');
const { success, error } = require('../utils/response');

exports.getComments = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Top-level comments only; replies fetched separately
    const [comments, total] = await Promise.all([
      Comment.find({ article: articleId, parentComment: null, isDeleted: false })
        .sort('createdAt')
        .skip(skip)
        .limit(Number(limit))
        .populate('author', 'name avatar'),
      Comment.countDocuments({ article: articleId, parentComment: null, isDeleted: false }),
    ]);

    // Attach replies
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({
          parentComment: comment._id,
          isDeleted: false,
        })
          .sort('createdAt')
          .populate('author', 'name avatar');
        return { ...comment.toObject(), replies };
      })
    );

    return success(res, {
      comments: commentsWithReplies,
      pagination: { page: Number(page), limit: Number(limit), total },
    });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.postComment = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { content, parentComment } = req.body;

    const article = await Article.findById(articleId);
    if (!article) return error(res, 'Article not found', 404);

    const comment = await Comment.create({
      article: articleId,
      author: req.user._id,
      content,
      parentComment: parentComment || null,
    });

    await Article.findByIdAndUpdate(articleId, { $inc: { commentsCount: 1 } });
    await comment.populate('author', 'name avatar');

    return success(res, { comment }, 'Comment posted', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

exports.editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return error(res, 'Comment not found', 404);
    if (comment.author.toString() !== req.user._id.toString()) return error(res, 'Forbidden', 403);

    comment.content = req.body.content;
    comment.isEdited = true;
    await comment.save();
    await comment.populate('author', 'name avatar');
    return success(res, { comment });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return error(res, 'Comment not found', 404);

    const isOwner = comment.author.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') return error(res, 'Forbidden', 403);

    comment.isDeleted = true;
    comment.content = 'Ce commentaire a été supprimé.';
    await comment.save();

    await Article.findByIdAndUpdate(comment.article, { $inc: { commentsCount: -1 } });
    return success(res, {}, 'Comment deleted');
  } catch (err) {
    return error(res, err.message);
  }
};
