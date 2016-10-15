const express = require('express');
const router = express.Router();

router.post('/', (request, res) => {
    request.session.destroy((error) => {
        if (!error) {
            res.jsonResponse({
                status: 'Success!'
            })
        } else {
            res.jsonError({
                dev_error: error,
                status: 'Error logging out!'
            }, 500);
        }

    });
});

module.exports = router;