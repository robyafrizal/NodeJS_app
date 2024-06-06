//Class untuk dapat melakukan manipulasi data users
class UserRepository {
  constructor(users = []) {
    // TODO:
    this.users = users;
  }

  getAll() {
    // TODO:
    return this.users;
  }

  add(user) {
    // TODO:
    this.users.push(user);
    return this.users;
  }

  getByID(id) {
    // TODO:
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        return this.users[i];
      }
    }
  }

  getByEmail(email) {
    // TODO:
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email == email) {
        return this.users[i];
      }
    }
  }

  deleteByID(id) {
    // TODO:
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        // const deletedUser = delete users[i];
        const deletedUser = this.users.splice(i, 1);
        return deletedUser;
      }
    }
  }
}

module.exports = UserRepository;
