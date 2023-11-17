const CarController = require('../controllers/cars.controller');

module.exports = app => {
    app.get('/api/cars/:garageId', CarController.findAllCarsByGarage);
    app.get('/api/car/:id', CarController.findOneSingleCar);
    app.patch('/api/car/:id', CarController.updateExistingCar);
    app.post('/api/car/:garageId', CarController.createNewCar);
    app.delete('/api/car/:id', CarController.deleteAnExistingCar);
}
