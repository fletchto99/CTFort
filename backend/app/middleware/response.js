const config = require('../../config/app.json');

module.exports = (req, res, next) => {
    res.jsonResponse = (data, status, error) => {
        status = status || 200;
        if (!config.developer_mode) {
            delete error.dev_error;
        }
        res.status(status).json({
            data: data || null,
            error: error || null
        });
    };
    next();
};