const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const rentSchema = new Schema ({
    bookId: Schema.Types.ObjectId,
    userId: Number,
    isRent: Boolean,
    rentalDate: Date,
    returnDate: Date
});

const Rent = mongoose.model('Rentals', rentSchema);

exports.findById = async (id) => {
    return await Rent.findById(id);
};

exports.create = async (rentData) => {

}

exports.update = async (document, rentData) => {
    
}