const express = require('express');
const user = require('../../models/user');
const router = express.Router();

router.put('/', (req, res) => {
    if (req.session.user) {
        res.status(400).json({
            error: 'You must be logged out before creating a new user!'
        });
    } else {
        user.register(req.body)
            .then(result => req.session.user = result && res.json(req.session.user))
            .catch(error => res.jsonError(error, 400))
    }
});

module.exports = router;