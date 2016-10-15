const express = require('express');
const profile = require('../../models/profile');
const router = express.Router();


router.get('/profile', (request, response) =>
    profile.retrieve(request.session.user_id)
        .then(results => response.jsonResponse({
            profile: results
        })).catch(error => response.jsonError(error, 500)));

router.post('/profile', (request, response) =>
    profile.update(request.session.user_id, request.body)
        .then(results => response.jsonResponse({
            message: "Profile successfully updated!"
        })).catch(error => response.jsonError(error, 500)));

module.exports = router;