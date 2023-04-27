const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const rentSchema = new Schema ({
    bookId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    isRent: Boolean,
    rentalDate: Date,
    returnDate: Date
});

const Rent = mongoose.model('Rents', rentSchema);

exports.findById = async (id) => {
    return await Rent.findById(id);
};

exports.findRent = async (bookId) => {
    return await Rent.findOne({bookId: bookId});
};

// exports.one = (id) => {
//     return Rent.findOne(id)
//         .then((result) => {
//             result = result.toJSON();
//             // delete result._id;
//             // delete result.__v;
//             return result;
//         })};

// exports.findOne = (id) => {
//     return Rent.findById(id)
//         .then((result) => {
//             result = result.toJSON();
//             // delete result._id;
//             // delete result.__v;
//             return result;
//         })};

exports.create = (rentData) => {
    const rent = new Rent(rentData);
    return rent.save();
};

exports.update = async (document, rentData) => {
    
};