
const BooksController = require('../booksTest/controllers/books.controller');
const BooksMiddleware = require('../booksTest/middlewares/verify.book.middleware');
const RentsController = require('../rent/controller/rents.controller')


const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/books/rent/:id', [
        // BooksMiddleware.hasAuthValidFields,
        ValidationMiddleware.validJWTNeeded,
        RentsController.rent
    ]);
};