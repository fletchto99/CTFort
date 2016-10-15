var express = require('express');
var team = require('../../models/team');
var router = express.Router();


router.get('', (request, response) =>
    team.listAll(request.session.user_id)
        .then(results => response.jsonResponse({
            teams: results
        })).catch(error => response.jsonError(error, 500)));

router.put('', (request, response) =>
    team.create(request.body, request.session.user_id)
        .then(results => response.jsonResponse({
            team: results
        })).catch(error => response.jsonError(error, 500)));

router.get('/:teamid', (request, response) =>
    team.fetchInfo(request.params.teamid, request.body, request.session.user_id)
        .then(results => response.jsonResponse({
            team: results
        })).catch(error => response.jsonError(error, 500)));

router.put('/:teamid', (request, response) =>
    team.addMember(request.params.teamid, request.body, request.session.user_id)
        .then(results => response.jsonResponse({
            message: "Member added to team successfully!"
        })).catch(error => response.jsonError(error, 500)));

router.post('/:teamid', (request, response) =>
    team.update(request.params.teamid, request.body, request.session.user_id)
        .then(results => response.jsonResponse({
            message: "Team updated successfully!"
        })).catch(error => response.jsonError(error, 500)));

module.exports = router;