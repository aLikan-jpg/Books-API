const RentController = require('./controllers/rent.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

const config = require('../common/config/env.config')
const ADMIN = config.permissionLevels.ADMIN;

exports.routesConfig = function (app) {
    
    // Бронирование книги
    app.post('/reserve/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        RentController.reserve
    ]);

    // Аренда книги
    app.post('/rent/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        RentController.rent
    ]);

};