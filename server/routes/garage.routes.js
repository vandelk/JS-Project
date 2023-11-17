const GarageController = require('../controllers/garage.controller');

module.exports = app => {
    app.get('/api/garage/', GarageController.findAllGarages);
    app.get('/api/garages/:userId', GarageController.findUsersGarages);
    app.get('/api/garage/:id', GarageController.findOneSingleGarage);
    app.patch('/api/garage/:id', GarageController.updateExistingGarage);
    app.post('/api/garage/:userId', GarageController.createNewGarage);
    app.delete('/api/garage/:id', GarageController.deleteAnExistingGarage);

}
