const Garage = require("../models/garage.model");

module.exports.findAllGarages = (req, res) => {
    Garage.find()
        .then((allGarages) => {
            res.json(allGarages)
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findOneSingleGarage = (req, res) => {
    Garage.findOne({ _id: req.params.id })
        .then(oneSingleGarage => {
            res.json({ garage: oneSingleGarage })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.createNewGarage = (req, res) => {
    Garage.create(req.body)
        .then(newlyCreatedGarage => {
            res.json({ garage: newlyCreatedGarage })
        })
        .catch((err) => res.status(400).json(err));
}

module.exports.updateExistingGarage = (req, res) => {
    Garage.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedGarage => {
            res.json({ garage: updatedGarage })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.deleteAnExistingGarage = (req, res) => {
    Garage.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json(err)
        });
}
//###########################################################################

module.exports.findUsersGarages = (req, res) => {
    Garage.find({user_id: req.params.userId})
        .then((allGarages) => {
            res.json(allGarages)
        })
        .catch((err) => {
            res.json(err)
        });
}