const TeamController = require('../controllers/team.controller');

module.exports = function(app){
    app.get('/api/players', TeamController.index);
    app.post('/api/players', TeamController.create);
    app.delete('/api/players/:id', TeamController.delete);
    app.put('/api/players/:id/status', TeamController.updateStatus);
}