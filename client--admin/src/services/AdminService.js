import axios from "axios";

const url = process.env.DATA_SERVER;

class AdminService {
  static async registerViolation(violation, violationNumber, violationIsMajor) {
    try {
      return axios.post(`${url}/admin/register-violation`, {
        violation,
        violationNumber,
        violationIsMajor,
      });
    } catch (e) {
      return e;
    }
  }

  static async registerGuard(firstname, lastname) {
    try {
      const response = await axios.post(`${url}/admin/register-guard`, {
        firstname,
        lastname,
      });
      const data = response.data;
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
}

export default AdminService;
