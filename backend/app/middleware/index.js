const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const router = express.Router();
const databaseConfig = require('../../config/database.json');
const sessionObj = require('../../config/session.json');
const helmet = require('helmet');
const cors = require('cors');

sessionObj.store = new pgSession({
    pg: pg,
    conString: `postgresql://${databaseConfig.user}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`,
    tableName: 'session'
});

router.use(cors());
router.options('*', cors());
router.use(require('./cors'));
router.use(require('./response'));
router.use(require('./error'));
router.use(bodyParser.json());
router.use(helmet());
router.use(session(sessionObj));
router.use('/auth', require('./auth'));

module.exports = router;