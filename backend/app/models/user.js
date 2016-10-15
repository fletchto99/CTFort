const database = require('../database');
const validator = require('../shared/validator');
const security = require('../shared/security');
const Promise = require('promise');

module.exports = {
    register(params) {
        return new Promise((resolve, reject) => {
            let errors = validator.validate(params, {
                username: validator.isString,
                password: validator.isString,
                email: validator.isEmail
            });

            if (errors) {
                reject({
                    error: true,
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            database.query({
                text: "SELECT COUNT(*) as count FROM Users WHERE username = $1",
                values: [params.username]
            }).then(() => database.query({
                text: 'INSERT INTO Users(Username, Password, Email) VALUES ($1, $2, $3)',
                values: [params.username, security.hashPassword(params.password), params.email]
            })).then((results) => resolve({
                username: params.username,
                email: params.email
            })).catch((error) => reject({
                error: 'An unexpected error has occurred! Please try again later.',
                dev_error: error
            }));
        });
    },

    authenticate(params) {
        return new Promise((resolve, reject) => {
            let errors = validator.validate(params, {
                username: validator.isString,
                password: validator.isString
            });

            if (errors) {
                reject({
                    error: true,
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            database.query({
                text: "SELECT * FROM Users WHERE Username = $1",
                values: [params.username]
            }).then(results => {

                if (results.length < 1) {
                    reject({
                        error: 'Invalid username or password!'
                    });
                    return;
                }

                if (security.verifyPassword(params.password, results[0].password)) {
                    delete results[0].password;
                    resolve(results[0]);
                } else {
                    reject({
                        error: 'Invalid username or password!'
                    });
                }
            }).catch(error => reject({
                error: 'Error logging in, please try again later!',
                dev_error: error
            }));
        });
    }

};