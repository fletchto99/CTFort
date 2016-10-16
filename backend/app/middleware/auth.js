module.exports = (req, res, next) => {
    if (!req.session || !req.session.user) {
        res.jsonError({
            message: "You are not authorized to access this resource"
        }, 403);
    } else {
        next();
    }
};