import axios from 'axios'

export const loginApi = async ({ email, password }) => {
  const res = await axios.post('/api/users/login', {
    email,
    password,
  }, {headers: {
    'Content-Type': 'application/json'
  }})
  console.log(res)
  return res
}