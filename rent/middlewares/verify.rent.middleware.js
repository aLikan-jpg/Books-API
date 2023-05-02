const CommonValidationMiddleware = require('../../common/middlewares/common.validation.middleware');

exports.isBookIdValid = (req, res, next) => {
    const bookId = req.params.bookId;

    if (CommonValidationMiddleware.isHexString(bookId)) {
        return next();
    } else {
        return res.status(400).send({ error: 'Invalid book id' });
    }
};