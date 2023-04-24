const RentModel = require('../models/rents.model');
const BookModel = require('../../booksMy/models/books.model');

exports.rent = async (req, res) => {
    try {
        let book = await BookModel.findById(req.params.id);
        if (!book) {
            res.status(404).send({error: 'Book not found'}); 
        }

        let result = await RentModel.findOne({ bookId: req.params.id });
        if (result) {
            RentModel.create(req.params.id)
                res.status(200).send(result);
            else {
                if (result.isRent) {
                    res.status(404).send({error: 'Book is already rented'}); 
                } else {
                    //обновить запись
                }
            }
        }

    } catch (err) {
        res.status(500).send({error: err});
    }
    // try {
    //     let result = await BookModel.rentBook(req.params.userId);
    //     res.status(201).send({id: result._id});
    // } catch (err) {
    //     res.status(500).send({error: err});
    // }
};