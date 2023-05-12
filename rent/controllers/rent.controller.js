const BooksModel = require('../../books/models/books.models');
const RentModel = require('../models/rent.models');

exports.reserve = async (req, res) => {
    try {
        let userId = req.jwt.userId;
        let bookId = req.params.bookId;

        let bookExists = await BooksModel.bookInfo(bookId);

        if (!bookExists) {
            res.status(400).send({ error: "Book doesn't exist" });
            return;
        }

        let reserveExists = await RentModel.checkReserveExists(bookId);
        
        if (reserveExists) {
            res.status(400).send({ error: 'Book is already reserved' });
            return;
        } 

        let rentExists = await RentModel.checkRentExists(bookId);

        if (rentExists) {
            res.status(400).send({ error: 'Book is already rented' });
            return;
        }
        
        let result = await RentModel.reserve(userId, bookId);
        
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }
    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.rent = async (req, res) => {
    try {
        let userId = req.jwt.userId;
        let bookId = req.params.bookId;

        let bookExists = await BooksModel.bookInfo(bookId);

        if (!bookExists) {
            res.status(400).send({ error: 'Book does not exist' });
            return;
        }

        let reserveExists = await RentModel.checkReserveExists(bookId);
        
        if (!reserveExists) {
            res.status(400).send({ error: 'Book is not reserved!' });
            return;
        }

        let result = await RentModel.rent(userId, bookId);
        
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }
    } catch(err) {
        res.status(500).send({ error: err });
    }
}

exports.cancelRequested = async (req, res) => {
    // let userId = req.jwt.userId;
    // let bookId = req.params.bookId;
    // let book = await BooksModel.bookInfo(bookId)

    // if (book) {
    //     let isReserved = await RentModel.checkReserveExists(bookId);
    //     if (isReserved) {
    //         let result = await RentModel.cancelRequest(userId, bookId);
    //         res.status(200).send(result);
    //     } else {
    //         res.status(404).send();
    //     }
    // } else {
    //     res.status(404).send();
    // }
    try {
        let userId = req.jwt.userId;
        let bookId = req.params.bookId;

        let bookExists = await BooksModel.bookInfo(bookId);

        if (!bookExists) {
            res.status(400).send({ error: "Book doesn't exist" });
            return;
        }

        let reserveExists = await RentModel.checkReserveExists(bookId);
            
        if (!reserveExists) {
            res.status(400).send({ error: 'Book is not reserved' });
            return;
        } 

        let result = await RentModel.cancelRequest(userId, bookId);

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }

    } catch(err) {
            res.status(500).send({ error: err });
    }
};

exports.cancelRented = async (req, res) => {
    try {
        let userId = req.jwt.userId;
        let bookId = req.params.bookId;

        let bookExists = await BooksModel.bookInfo(bookId);

        if (!bookExists) {
            res.status(400).send({ error: 'Book does not exist' });
            return;
        }

        let rentExists = await RentModel.checkRentExists(bookId);

        if (!rentExists) {
            res.status(400).send({ error: 'Book is not rented' });
            return;
        }

        let result = await RentModel.cancelRent(userId, bookId);
        
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }
    } catch(err) {
        res.status(500).send({ error: err });
    }
};