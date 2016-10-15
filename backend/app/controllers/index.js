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

router.use('/auth/profile', require('./authenticated/profile'));
router.use('/auth/teams', require('./authenticated/team'));

module.exports = router;