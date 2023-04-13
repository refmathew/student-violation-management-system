import axios from 'axios';

const url = process.env.DATA_SERVER

class UserService {
  static async recordViolation(lastName, studentId, violation, guard) {
    const reqBody = {
      studentId: studentId,
      lastName: lastName,
      violation: violation,
      guard: guard
    }

    try {
      return axios.post(`${url}/record-violation`, reqBody)
    } catch (err) {
      return err
    }
  }

  static async registerStudent(studentId, lastName, firstName, course, year) {
    const reqBody = {
      studentId: studentId,
      lastName: lastName,
      firstName: firstName,
      course: course,
      year: year
    };

    try {
      return axios.post(`${url}/register`, reqBody)
    } catch (err) {
      return err
    }
  }
}

export default UserService
