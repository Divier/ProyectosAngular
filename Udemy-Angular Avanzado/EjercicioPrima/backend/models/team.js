const {Schema, model} = require('mongoose');

const teamSchema = Schema({

    name: {
        type: String,
        required: true
    },
    status : {
        required: true,
        type: Boolean,
        default: true
    }
})

teamSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Team', teamSchema);