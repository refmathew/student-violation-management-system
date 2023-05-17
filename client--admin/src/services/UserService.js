import axios from "axios";

const url = process.env.DATA_SERVER;

class UserService {
  static async SignIn(username, password) {
    try {
      const response = await axios.post(`${url}/user/authenticate`, {
        username,
        password,
      });
      const data = response.data;
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
}

export default UserService;
