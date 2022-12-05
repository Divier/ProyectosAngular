const {Schema, model} = require('mongoose');

const sportSchema = Schema({

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

sportSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Sport', sportSchema);