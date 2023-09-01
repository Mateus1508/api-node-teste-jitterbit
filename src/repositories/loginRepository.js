const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

class LoginRepository {
    signIn = async (user) => {
        try {
            const token = jwt.sign(user, TOKEN_SECRET_KEY, { expiresIn: '1h' });
            return token;
        }
        catch (err) {
            throw err;
        }
    }

}

module.exports = LoginRepository;