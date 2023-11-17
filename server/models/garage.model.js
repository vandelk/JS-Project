const mongoose = require('mongoose');

const GarageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Garage name is required"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Garage = mongoose.model('Garage', GarageSchema);

module.exports = Garage;
