const express = require('express');
const router = express.Router();

/**
 * Session controllers
 */
router.use('/login', require('./session/login'));
router.use('/logout', require('./session/logout'));
router.use('/register', require('./session/register'));

/**
 * Open API endpoints
 */

/**
 * Authenticated api endpoints
 */

module.exports = router;