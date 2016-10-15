const express = require('express');
const user = require('../../models/user');
const router = express.Router();

router.post('/', (req, res) => {
    if (req.session.user != null) {
        res.json(req.session.user);
    } else {
        user.authenticate(req.body)
            .then((result) => req.session.user = result && res.json(req.session.user))
            .catch(error => res.jsonError(error, 400));
    }

});

module.exports = router;