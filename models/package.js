const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
    },
    agencyName: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    contactPhoneNumber: {
        type: String,
        required: true,
    },
    creationDate: {
        type: String,
        // default: Date.now,
    },
    overallRating: {
        type: String,
        default: 0,
    },
    reviews: [
        {
            type: String,
        },
    ],
    images: [
        {
            type: String,
        },
    ],
    sourceLocation: {
        type: String,
        required: true,
    },
    destinationLocation: {
        type: String,
        required: true,
    },
    routeOnMap: {
        type: String,
    },
    duration: {
        type: String,
    },
});

const Package = mongoose.model('Package', packageSchema);
module.exports = Package;


