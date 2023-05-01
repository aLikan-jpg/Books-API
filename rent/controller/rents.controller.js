const RentModel = require('../models/rents.model');
const BookModel = require('../../booksTest/models/books.model');
const { NIL } = require('uuid');
var ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');

exports.rent = async (req, res) => {
    try {
        let book = await BookModel.findById(req.params.id);
        if (!book) {
            res.status(404).send({error: 'Book not found'}); 
        }

        let result = await RentModel.findRent(book._id);

        if (!result) {
            //вытащить id польз. из req.headers (удалить br...)
            let authorization = req.headers.authorization.split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                let userId = jwt.decode(authorization[1]).userId;
                let newRent = {
                    bookId: book._id,
                    userId: ObjectId(userId),
                    isRent: true,
                    rentalDate: new Date(),
                    returnDate: null
                }
                await RentModel.create(newRent);
                res.status(200).send(result);
            }
            
        } else {
            if (result.isRent) {
                res.status(404).send({error: 'Book is already rented'}); 
            } else {
                let authorization = req.headers.authorization.split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    let userId = jwt.decode(authorization[1]).userId;
                    //обновить запись
                    let newRent = {
                        bookId: book._id,
                        userId: ObjectId(userId),
                        isRent: true,
                        rentalDate: new Date(),
                        returnDate: null
                    }
                    await RentModel.update(result, newRent);
                    return res.status(200).send(result);

                    // result.bookId = book._id;
                    // result.userId = ObjectId(userId);
                    // result.isRent = true;
                    // result.rentalDate = new Date();
                    // result.returnDate = null;
                    // result.save();
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