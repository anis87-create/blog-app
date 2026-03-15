const Article = require('../models/Article');
const { success, error } = require('../utils/response');

exports.getArticles = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const filter = { status: 'published' };

    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const [articles, total] = await Promise.all([
      Article.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate('author', 'name avatar'),
      Article.countDocuments(filter),
    ]);

    return success(res, {
      articles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getTopRated = async (req, res) => {
  try {
    const articles = await Article.find({ status: 'published', averageRating: { $gt: 0 } })
      .sort({ averageRating: -1, ratingsCount: -1 })
      .limit(6)
      .populate('author', 'name avatar');
    return success(res, { articles });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const articles = await Article.find({ status: 'published', isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'name avatar');
    return success(res, { articles });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { viewsCount: 1 } },
      { new: true }
    ).populate('author', 'name avatar');

    if (!article) return error(res, 'Article not found', 404);
    return success(res, { article });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create({ ...req.body, author: req.user._id });
    await article.populate('author', 'name avatar');
    return success(res, { article }, 'Article created', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return error(res, 'Article not found', 404);

    const isAuthor = article.author.toString() === req.user._id.toString();
    if (!isAuthor && req.user.role !== 'admin') return error(res, 'Forbidden', 403);

    Object.assign(article, req.body);
    await article.save();
    await article.populate('author', 'name avatar');
    return success(res, { article }, 'Article updated');
  } catch (err) {
    return error(res, err.message);
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return error(res, 'Article not found', 404);

    const isAuthor = article.author.toString() === req.user._id.toString();
    if (!isAuthor && req.user.role !== 'admin') return error(res, 'Forbidden', 403);

    await article.deleteOne();
    return success(res, {}, 'Article deleted');
  } catch (err) {
    return error(res, err.message);
  }
};

exports.toggleFeatured = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return error(res, 'Article not found', 404);
    article.isFeatured = !article.isFeatured;
    await article.save();
    return success(res, { isFeatured: article.isFeatured });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!article) return error(res, 'Article not found', 404);
    return success(res, { article });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id }).sort('-createdAt');
    return success(res, { articles });
  } catch (err) {
    return error(res, err.message);
  }
};
