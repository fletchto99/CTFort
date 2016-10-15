var express = require('express');
var team = require('../../models/team');
var router = express.Router();


router.get('', (request, response) =>
    team.listAll(request.body, request.session.user_id)
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

router.get('/:teamid/requests', (request, response) =>
    team.getRequests(request.params.teamid, request.body, request.session.user_id)
        .then(results => response.jsonResponse({
            requests: results
        })).catch(error => response.jsonError(error, 500)));

router.post('/:teamid/requests/:reqid', (request, response) =>
    team.respondToRequest(request.params.teamid, request.body, request.session.user_id)
        .then(results => response.jsonResponse({
            message: "Successfully responded to request!"
        })).catch(error => response.jsonError(error, 500)));

module.exports = router;