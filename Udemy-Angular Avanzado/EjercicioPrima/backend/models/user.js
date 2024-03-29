const {Schema, model} = require('mongoose');

const userSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    status : {
        required: true,
        type: Boolean,
        default: true
    }
})

userSchema.method('toJSON', function() {
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('User', userSchema);