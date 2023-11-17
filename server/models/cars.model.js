const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, "Car make is required"],
    },
    model: {
        type: String,
        required: [true, "Car model is required"],
    },
    year: {
        type: Number,
        required: [true, "The year the car was made is required"],
        min: [1886, "Cars weren't made during this time!"]
    },
    garage_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Garage"
    }
}, { timestamps: true });

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
