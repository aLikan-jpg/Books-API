const BookModel = require('../models/books.model');

exports.insert = async (req, res) => {
    try {
        let result = await BookModel.createBook(req.body);
        res.status(201).send({id: result._id});
    } catch (err) {
        res.status(500).send({error: err});
    }
};