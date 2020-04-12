const BaseRepository = require("./base.repository");
let _user = null;

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    _user = User;
  }

  async getUserByName(username) {
    return await _user.findone({ username });
  }
}

module.exports = UserRepository;
