const express = require('express');
const user = require('../../models/user');
const router = express.Router();

router.post('', (request, response) => {
    if (request.session.user != null) {
        response.jsonResponse(request.session.user);
    } else {
        user.authenticate(request.body)
            .then(result => request.session.user = result && response.jsonResponse(request.session.user))
            .catch(error => response.jsonError(error, 400));
    }

});

module.exports = router;