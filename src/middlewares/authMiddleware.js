const jwt = require('jsonwebtoken');

class AuthMiddleaware {
 verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token not provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalid.' });
        }
        req.user = decoded;
        next();
    });
}
}
module.exports = AuthMiddleaware;
