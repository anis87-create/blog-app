const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    type: {
      type: String,
      enum: ['like', 'dislike', 'laugh', 'love', 'angry', 'wow'],
      required: true,
    },
  },
  { timestamps: true }
);

reactionSchema.index({ user: 1, comment: 1 }, { unique: true });

module.exports = mongoose.model('Reaction', reactionSchema);
