const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    // bookImage: String,
    bookName: {
        type: String,
        required: true
    },
    authorName: String,
    language: String,
    stars: Number,
    rating: Number,
    pages: Number,
    year: Number,
    description: String,
    // Date: Date
});

const Book = mongoose.model('Books', bookSchema);

exports.createBook = (bookData) => {
    const book = new Book(bookData);
    return book.save();
};