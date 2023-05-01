const BooksModel = require('../../books/models/books.models');
var ObjectId = require('mongodb').ObjectId;
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const rentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: { type: 1, unique: true }
    },
    requestedBooks: {
        type: [Schema.Types.ObjectId]
    },
    rentedBooks :{
        type: [{
            bookId: Schema.Types.ObjectId,
            startDate: Date,
            expirationDate: Date
        }]
    }
});

const Rent = mongoose.model('Rents', rentSchema);

exports.checkReserveExists = async (bookId) => {
    let result = await Rent.findOne({ requestedBooks: bookId });
    return (result);
};

exports.checkRentExists = async (bookId) => {
    let result = await Rent.findOne({
        'rentedBooks.bookId': bookId,
        'rentedBooks.expirationDate': { $gt: new Date() }
    });

    return (result);
}

exports.reserve = async (userId, bookId) => {
    let result = await Rent.findOne({ userId: userId });

    if (result) {
        return Rent.findOneAndUpdate(
            { userId: userId },
            { $push: { requestedBooks: bookId } },
            { new: true }
        );
    } else {
        return new Rent({
            userId: userId,
            rentedBooks: [], 
            requestedBooks: [bookId]
        }).save();
    };
};

exports.rent = async (userId, bookId) => {
    let startDate = new Date();
    let expirationDate = new Date(startDate.valueOf());
    expirationDate.setDate(expirationDate.getDate() + 14);

    return Rent.findOneAndUpdate(
        { userId: userId, requestedBooks: bookId },
        {
            $pull: { requestedBooks: bookId },
            $push: { rentedBooks: { bookId: bookId, startDate: startDate, expirationDate: expirationDate } }
        },
        { new: true }
    );
}