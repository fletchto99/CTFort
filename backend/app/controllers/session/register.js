const express = require('express');
const user = require('../../models/user');
const router = express.Router();

router.put('', (req, res) => {
    if (req.session.user) {
        res.jsonError("You must be logged out before creating a new user!");
    } else {
        user.register(req.body)
            .then(result =>req.session.user = result && res.jsonResponse(result))
            .catch(error => res.jsonError(error, 400))
    }
});

module.exports = router;