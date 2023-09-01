class LoginMiddleware {
    validateUser = async (request, response, next) => {
        const userData = request.body;
        if (!userData.name) {
            return response.status(400).json({ error: 'Name is required.' });
        }
        next();
    }
}

module.exports = LoginMiddleware;