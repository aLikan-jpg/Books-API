const BooksController = require('./books.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

const config = require('../common/config/env.config')

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;



exports.routesConfig = function (app) {
    //добавление книги в БД
    app.post('/books', [
        BooksController.insert
    ]);
    //получение полного списка книг
    app.get('/books', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        BooksController.list
    ]);
    app.get('/books/:bookId', [
        // ValidationMiddleware.validJWTNeeded,
        BooksController.getById
    ]);
    app.patch('/books/:bookId', [
 
    ]);
    app.delete('/books/:bookId', [

    ]);
    //Запрос должен содержать данные пользователя, который хочет взять книгу в аренду. Возвращает: подтверждение аренды книги.
    app.post('/books/{id}/rent', [

    ]);
};