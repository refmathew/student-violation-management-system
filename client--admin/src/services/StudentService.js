import axios from 'axios';

const url = process.env.DATA_SERVER;

class StudentService {
  static async findStudent(student) {
    try {
      const response = await axios.get(`${url}/student/find?query=${student}`);
      const data = response.data;
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
};

export default StudentService;
