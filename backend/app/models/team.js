const database = require('../database');
const validator = require('../shared/validator');

let getPermissions = (user_id, team_id) => database.query({
    text: "SELECT tr.Role_ID, tr.status " +
          "FROM Team t " +
          "  INNER JOIN Teams_Users tu ON tu.Team_ID = t.Team_ID " +
          "WHERE tu.User_ID = $1 AND t.Team_ID = $2",
    values: [user_id, team_id]
}).then(result => new Promise((resolve, reject) => {
    result.length > 0 ? resolve(result[0]) : reject({
        error: "Not enough permissions!"
    })
}));

module.exports = {
    listAll(user_id) {
        return new Promise((resolve, reject) => {
            database.query({
                text: "SELECT t.Team_ID, t.Team_Name, tr.Role_Name " +
                      "FROM Team t " +
                      "  INNER JOIN Teams_Users tu ON tu.Team_ID = t.Team_ID " +
                      "  INNER JOIN Team_Roles tr ON tr.Team_Role_ID = tu.Team_Role_ID " +
                      "WHERE tu.User_ID = $1",
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
                text: "SELECT COUNT(*) AS count FROM teams WHERE Team_Name=$1",
                values: [params.team_name]
            }).then(results => {
                if (results[0].count > 0) {
                    reject({
                        message: "Team name already taken!"
                    });
                } else {

                    let genCode = (code) => database.query({
                        text: "SELECT COUNT(*) AS count FROM teams WHERE Invite_Code=$1",
                        values: [params.team_name]
                    }).then(results => {
                        if (results[0].count > 0) {
                            return genCode(Math.random().toString(36).substring(15));
                        } else {
                            database.query({
                                text: "INSERT INTO Teams(Team_Name, Invite_Code) VALUES ($1, $2) returning Team_ID ",
                                values: [user_id, code]
                            }).then(results => database.query({
                                text: "INSERT INTO Teams_Users(Team_ID, User_ID, Role_ID, Status, Invite_Code) VALUES ($1, $2, 1, 1, $3) returning Teams_Users_ID ",
                                values: [results[0], user_id]
                            })).then(results =>
                                resolve(results)
                            ).catch(error => reject({
                                error: 'An unexpected error has occurred! Please try again later.',
                                dev_error: error
                            }));
                        }
                    })(Math.random().toString(36).substring(15));
                }
            }).catch(error => reject({
                error: 'An unexpected error has occurred! Please try again later.',
                dev_error: error
            }));
        });
    },

    fetchInfo(team_id, user_id) {
        return new Promise((resolve, reject) => {

            let errors = validator.validate({
                team_id,
                user_id
            }, {
                team_id: validator.isInteger,
                user_id: validator.isInteger
            });

            if (errors) {
                reject({
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }
            getPermissions(team_id, user_id)
                .then(permissions => {
                    if (permissions.status == 0) {
                        reject({
                            error: "You are not authorized to access this team"
                        });
                    } else {

                        database.query({
                            text: "SELECT * FROM Teams WHERE Team_ID = $1",
                            values: [team_id]
                        }).then(result => {
                            if (permissions.Role_ID != 1) {
                                delete result.Invite_Code;
                            }
                            resolve(result);
                        }).catch(error => reject(error));
                    }

                }).catch(error => reject(error));
        });
    },

    joinTeam(params, user_id) {
        return new Promise((resolve, reject) => {
            let errors = validator.validate(params, {
                invite_code: validator.isString,
            });

            if (errors) {
                reject({
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            database.query({
                text: "SELECT Team_ID FROM Teams WHERE Invite_Code = $1",
                values: [params.invite_code]
            }).then(results => {
                if (results.length > 0) {
                    database.query({
                        text: "INSERT INTO Teams_Users(Team_ID, User_ID, Role_ID, Status) VALUES ($1, $2, 2, 1) returning Teams_Users_ID ",
                        values: [results[0].Team_ID, user_id]
                    }).then(results => resolve({
                        message: "Successfully added team member"
                    })).catch(error => reject(error));
                } else {
                    reject({
                        error: "Invite code invalid"
                    });
                }
            }).catch(error => reject(error));
        });
    }
};