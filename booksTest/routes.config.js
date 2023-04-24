const BooksController = require('./controllers/books.controller');
const BooksMiddleware = require('./middlewares/verify.book.middleware')
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/books', [
        BooksMiddleware.hasAuthValidFields,
        BooksController.insert
    ]);
    app.post('/books/:bookId/rent', [
        
    ]);
};