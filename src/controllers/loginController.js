const LoginService = require("../services/loginService");

class LoginController {
    constructor(
        loginService = new LoginService()
    ){
        this.loginService = loginService;
    }

    signIn = async (request, response) => {
        try {
            const userData = request.body;

            const user = await this.loginService.signIn(userData);
            return response.status(200).json(user);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = LoginController;