const Car = require("../models/cars.model");

module.exports.findAllCarsByGarage = (req, res) => {
    Car.find({garage_id: req.params.garageId})
        .then((allCars) => {
            res.json(allCars)
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findOneSingleCar = (req, res) => {
    Car.findOne({ _id: req.params.id })
        .then(oneSingleCar => {
            res.json({ car: oneSingleCar })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.createNewCar = (req, res) => {
    Car.create(req.body)
        .then(newlyCreatedCar => {
            res.json({ car: newlyCreatedCar })
        })
        .catch((err) => res.status(400).json(err));
}

module.exports.updateExistingCar = (req, res) => {
    Car.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedCar => {
            res.json({ car: updatedCar })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.deleteAnExistingCar = (req, res) => {
    Car.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json(err)
        });
}