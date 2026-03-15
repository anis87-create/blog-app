const Reaction = require('../models/Reaction');
const Comment = require('../models/Comment');
const { success, error } = require('../utils/response');

exports.upsertReaction = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { type } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return error(res, 'Comment not found', 404);

    const existing = await Reaction.findOne({ user: req.user._id, comment: commentId });

    if (existing) {
      const oldType = existing.type;
      existing.type = type;
      await existing.save();

      // Update denormalized counters
      if (oldType === 'like' && type !== 'like') await Comment.findByIdAndUpdate(commentId, { $inc: { likesCount: -1 } });
      if (oldType === 'dislike' && type !== 'dislike') await Comment.findByIdAndUpdate(commentId, { $inc: { dislikesCount: -1 } });
      if (type === 'like' && oldType !== 'like') await Comment.findByIdAndUpdate(commentId, { $inc: { likesCount: 1 } });
      if (type === 'dislike' && oldType !== 'dislike') await Comment.findByIdAndUpdate(commentId, { $inc: { dislikesCount: 1 } });

      return success(res, { reaction: existing });
    }

    const reaction = await Reaction.create({ user: req.user._id, comment: commentId, type });

    if (type === 'like') await Comment.findByIdAndUpdate(commentId, { $inc: { likesCount: 1 } });
    if (type === 'dislike') await Comment.findByIdAndUpdate(commentId, { $inc: { dislikesCount: 1 } });

    return success(res, { reaction }, 'Reaction added', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

exports.removeReaction = async (req, res) => {
  try {
    const { commentId } = req.params;
    const reaction = await Reaction.findOneAndDelete({ user: req.user._id, comment: commentId });

    if (!reaction) return error(res, 'No reaction found', 404);

    if (reaction.type === 'like') await Comment.findByIdAndUpdate(commentId, { $inc: { likesCount: -1 } });
    if (reaction.type === 'dislike') await Comment.findByIdAndUpdate(commentId, { $inc: { dislikesCount: -1 } });

    return success(res, {}, 'Reaction removed');
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getMyReactions = async (req, res) => {
  try {
    const { commentIds } = req.query; // comma-separated
    const ids = commentIds ? commentIds.split(',') : [];
    const reactions = await Reaction.find({ user: req.user._id, comment: { $in: ids } });
    const map = {};
    reactions.forEach((r) => { map[r.comment.toString()] = r.type; });
    return success(res, { reactions: map });
  } catch (err) {
    return error(res, err.message);
  }
};
