const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

class AuthMiddleaware {
    verifyToken = (request, response, next) => {
        const authToken = request.headers.authorization;
    
        if (authToken) {
            const [, token] = authToken.split(' ');
    
            try {
                jwt.verify(token, TOKEN_SECRET_KEY);
                return next();
            }
            catch (err) {
                return response.status(401).json({ messages: `Token doesn't exist or is expired` });
            }
        }
        return response.status(401).json({ messages: `User don't authorized!` });
    };
}
module.exports = AuthMiddleaware;
