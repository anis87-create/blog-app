const Rating = require('../models/Rating');
const Article = require('../models/Article');
const { success, error } = require('../utils/response');

const recalcRating = async (articleId) => {
  const ratings = await Rating.find({ article: articleId });
  const count = ratings.length;
  const avg = count > 0 ? ratings.reduce((sum, r) => sum + r.value, 0) / count : 0;
  await Article.findByIdAndUpdate(articleId, {
    averageRating: Math.round(avg * 10) / 10,
    ratingsCount: count,
  });
};

exports.submitRating = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { value } = req.body;

    if (!value || value < 1 || value > 5) return error(res, 'Rating must be between 1 and 5', 400);

    const article = await Article.findById(articleId);
    if (!article) return error(res, 'Article not found', 404);

    const rating = await Rating.findOneAndUpdate(
      { user: req.user._id, article: articleId },
      { value },
      { upsert: true, new: true }
    );

    await recalcRating(articleId);
    return success(res, { rating });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getMyRating = async (req, res) => {
  try {
    const rating = await Rating.findOne({ user: req.user._id, article: req.params.articleId });
    return success(res, { rating: rating?.value || null });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.deleteRating = async (req, res) => {
  try {
    await Rating.findOneAndDelete({ user: req.user._id, article: req.params.articleId });
    await recalcRating(req.params.articleId);
    return success(res, {}, 'Rating removed');
  } catch (err) {
    return error(res, err.message);
  }
};
