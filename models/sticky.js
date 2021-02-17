const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates new instances of sticky Schema
const stickySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    colour: {
        type: String,
        required: true
    }, 
    mood: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    dayOfWeek: {
        type: Number,
        required: true
    },
    posx: {
        type: Number,
        required: true
    },
    posy: {
        type: Number,
        required: true
    },
    parent : {
        type: Number,
        required: false
    }
}, {timestamps: true });

const Sticky = mongoose.model('Sticky', stickySchema);

// Export Sticky model
module.exports = Sticky;