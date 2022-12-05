const {Schema, model} = require('mongoose');

const eventSchema = Schema({

    date: {
        type: Date,
        required: true
    },
    teamOne : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    teamTwo : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    scoreOne : {
        type: Number,
        required: true
    },
    scoreTwo : {
        type: Number,
        required: true
    },
    sport : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Sport'
    },
    status : {
        required: true,
        type: Boolean,
        default: true
    }
})

eventSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Event', eventSchema);