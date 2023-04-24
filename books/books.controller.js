const BooksModel = require('./books.models');
//Create book, bookId == responce
exports.insert = async (req, res) => {
    let result = await BooksModel.createBook(req.body)
    res.status(201).send({id: result._id});
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
    let result =  await BooksModel.list(limit, page)     
    res.status(200).send(result);
};

exports.getById = async (req, res) => {
   let result = await BooksModel.findById(req.params.id)
    res.status(200).send(result);
};
