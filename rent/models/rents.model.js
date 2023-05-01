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

exports.updateRent = async (Rent) => {
    Rent.bookId = book._id;
    Rent.userId = ObjectId(userId);
    Rent.isRent = true;
    Rent.rentalDate = new Date();
    Rent.returnDate = null;
    await Rent.save();
};

exports.create = (rentData) => {
    const rent = new Rent(rentData);
    delete rent.__v;
    return rent.save();
};

exports.update =  (document, rentData) => {
    const filter = { bookId: document.bookId };
    const newRent = new Rent(rentData);

    const updatedRent = Rent.findOneAndUpdate(filter, newRent, { 
        new: true
    });
    return updatedRent.save();
};

exports.findUserRents = (userId) => {
    
};

