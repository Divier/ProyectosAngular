
const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        }
    
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('Failed to generate token');
            } else {
                resolve( token);
            }
        });
    })
}

module.exports = {
    generarJWT
}