const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const booksSchema = new Schema( { 
    name : String,
    author : String,
    language : String,
    description : String,
    status : String,
    // date : Date,
    image : String
});

// booksSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

const Book = mongoose.model('Book', booksSchema);

exports.createBook = (bookData) => {
    const book = new Book(bookData);
    return book.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Book.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, books) {
                if (err) {
                    reject(err);
                } else {
                    resolve(books);
                }
            })
    });
};
exports.findById = (id) => {
    return Book.findOne(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};


