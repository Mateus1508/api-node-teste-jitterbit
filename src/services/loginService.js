const LoginRepository = require("../repositories/loginRepository");

class LoginService {
    constructor(
        loginRepository = new LoginRepository()
    ) {
        this.loginRepository = loginRepository; 
    }

    signIn = (userData) => {
        return this.loginRepository.signIn(userData);
    }
}

module.exports = LoginService;