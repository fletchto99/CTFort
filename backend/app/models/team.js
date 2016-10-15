const database = require('../database');
const validator = require('../shared/validator');

module.exports = {
    listAll(user_id) {
        return new Promise((resolve, reject) => {
            database.query({
                text: "SELECT t.Team_ID, t.Team_Name, tr.Role_Name " +
                      "FROM Team t " +
                      "  INNER JOIN Teams_Users tu ON tu.Team_ID = t.Team_ID " +
                      "  INNER JOIN Team_Roles tr ON tr.Team_Role_ID = tu.Team_Role_ID " +
                      "WHERE tu.User_ID $1",
                values: [user_id]
            }).then(results =>
                resolve(results)
            ).catch(error => reject({
                error: 'An unexpected error has occurred! Please try again later.',
                dev_error: error
            }));
        });
    },

    create(params, user_id) {
        return new Promise((resolve, reject) => {

            let errors = validator.validate(params, {
                team_name: validator.isString
            });

            if (errors) {
                reject({
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            database.query({
                query: "SELECT COUNT(*) AS count FROM teams WHERE Team_Name=$1",
                values: [params.team_name]
            }).then(results => {
                if (results[0].count > 0) {
                    reject({
                        message: "Team name already taken!"
                    });
                } else {
                    database.query({
                        text: "INSERT INTO Teams(Team_Name) VALUES ($1) returning Team_ID ",
                        values: [user_id]
                    }).then(results => database.query({
                        text: "INSERT INTO Teams_Users(Team_ID, User_ID, Role_ID, Status) VALUES ($1, $2, 1, 1) returning Teams_Users_ID ",
                        values: [results[0], user_id]
                    })).then(results =>
                        resolve(results)
                    ).catch(error => reject({
                        error: 'An unexpected error has occurred! Please try again later.',
                        dev_error: error
                    }));
                }
            }).catch(error => reject({
                error: 'An unexpected error has occurred! Please try again later.',
                dev_error: error
            }));
        });
    },
};