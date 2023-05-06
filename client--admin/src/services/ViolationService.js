import axios from 'axios';

const url = process.env.DATA_SERVER;

class ViolationService {
  static async getRecent() {
    const response = await axios.get(`${url}/admin/violations/recent`);
    const data = response.data.data;
    return data;
  }

  static async getViolationStats() {
    const response = await axios.get(`${url}/admin/violations/stats/violations`);
    const data = response.data.data;
    return data;
  }

  static async getCourseYearStats() {
    const response = await axios.get(`${url}/admin/violations/stats/course-and-year`);
    const data = response.data.data;
    return data;
  }
};

export default ViolationService;
