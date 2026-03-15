const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    summary: { type: String, maxlength: 400 },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    category: {
      type: String,
      enum: ['tech-news', 'history', 'art', 'geography', 'training', 'culture'],
      required: true,
    },
    tags: [{ type: String, lowercase: true, trim: true }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    averageRating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate slug
articleSchema.pre('save', async function (next) {
  if (!this.isModified('title')) return next();
  let baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;
  while (await mongoose.model('Article').exists({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${count++}`;
  }
  this.slug = slug;
  next();
});

// Text index for search
articleSchema.index({ title: 'text', summary: 'text', tags: 'text' });
articleSchema.index({ category: 1, status: 1 });
articleSchema.index({ averageRating: -1 });

module.exports = mongoose.model('Article', articleSchema);
