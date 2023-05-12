import axios from 'axios';

const url = process.env.DATA_SERVER;

class AppService {
  static async getGuardList() {
    try {
      return await axios.get(`${url}/get-guard-list`);
    } catch (e) {
      return e;
    }
  }

  static async getViolationList() {
    try {
      return await axios.get(`${url}/get-violation-list`);
    } catch (e) {
      return e;
    }
  }
}

export default AppService;
