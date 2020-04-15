const { JwtHelper } = require("../helpers");
let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signUp(user) {
    const { username } = user;
    const userExist = await _userService.getUserByUserName(username);
    if (userExist) {
      const error = new Error();
      error.status = 400;
      error.message = "user already exist";
      throw error;
    }

    return await _userService.create(user);
  }

  async signIn(user) {
    const { username, password } = user;
    const userExist = await _userService.getUserByUserName(username);
    if (!userExist) {
      const error = new Error();
      error.status = 400;
      error.message = "user doesnt exist";
      throw error;
    }

    const validPassword = await userExist.comparePasswords(password);
    if (!validPassword) {
      const error = new Error();
      error.status = 400;
      error.message = "wrong password";
      throw error;
    }

    const userToEnconde = {
      username: userExist.username,
      id: userExist._id,
    };

    const token = JwtHelper.generateToken(userToEnconde);

    return { token, user: userExist };
  }
}

module.exports = AuthService;
