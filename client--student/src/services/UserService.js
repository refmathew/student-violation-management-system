import axios from 'axios';

const url =  `${process.env.DATA_SERVER}/`

class UserService {
  static async recordViolation(product) {
    try {
      return axios.get(`${url}/${product}`)
    } catch (err) {
      return err
    }
  }
}

export default UserService
