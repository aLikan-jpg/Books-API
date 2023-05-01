const BooksModel = require('../models/books.models');

exports.insert = async (req, res) => {
    try {
        let result = await BooksModel.create(req.body)

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }

    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.edit = async (req, res) => {
    try {
        let result = await BooksModel.edit(req);
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.delete = async (req, res) => {
    try {
        let result = await BooksModel.delete(req.params.bookId);
        
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }

    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.list =  async (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;

    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    try {
        let result =  await BooksModel.list(limit, page)     
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.bookInfo = async (req, res) => {
    try {
        let result = await BooksModel.bookInfo(req.params.bookId)
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send({ error: err });
    }
};
