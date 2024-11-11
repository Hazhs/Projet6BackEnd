const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  grade: { type: Number, require: true },
});

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  genre: { type: String, required: true },
  ratings: [ratingSchema],
  averageRating: { type: Number, default: 0 },
});

bookSchema.pre('save', function (next) {
  if (this.ratings.length > 0) {
    const total = this.ratings.reduce((acc, rating) => acc + rating.grade, 0);
    const average = total / this.ratings.length;
    this.averageRating = average.toFixed(1);
  } else {
    this.averageRating = 0;
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);
