const Favorite = require('../models/Favorite');
const Article = require('../models/Article');
const { success, error } = require('../utils/response');

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .sort('-createdAt')
      .populate({
        path: 'article',
        match: { status: 'published' },
        populate: { path: 'author', select: 'name avatar' },
      });

    const articles = favorites
      .filter((f) => f.article)
      .map((f) => f.article);

    return success(res, { articles });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId);
    if (!article) return error(res, 'Article not found', 404);

    await Favorite.findOneAndUpdate(
      { user: req.user._id, article: articleId },
      {},
      { upsert: true }
    );
    return success(res, {}, 'Added to favorites', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({ user: req.user._id, article: req.params.articleId });
    return success(res, {}, 'Removed from favorites');
  } catch (err) {
    return error(res, err.message);
  }
};

exports.checkFavorite = async (req, res) => {
  try {
    const exists = await Favorite.exists({ user: req.user._id, article: req.params.articleId });
    return success(res, { isFavorited: !!exists });
  } catch (err) {
    return error(res, err.message);
  }
};
