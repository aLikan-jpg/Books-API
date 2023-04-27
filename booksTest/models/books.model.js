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
exports.findById = (id) => {
        return Book.findById(id)
            .then((result) => {
                result = result.toJSON();
                // delete result._id;
                delete result.__v;
                return result;
            })};

// exports.findById = async (id) => {
//     const r = await Rent.findById(id);
//     delete r.__v;
//     return r;
// };