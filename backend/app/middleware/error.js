const config = require('../../config/app.json');

module.exports = (req, res, next) => {
    res.jsonError = (error, status) => {
        status = status || 400;
        if (!config.developer_mode) {
            delete error.dev_error;
        }
        res.status(status).json(error);
    };
    next();
};