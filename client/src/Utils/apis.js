import axios from "axios";

let apis = {
  getUser: () => {
    return axios.get(`/auth/login`);
  },
  getProfile: user => {
    return axios.get("/profile/" + user);
  },
  updateUser: userinfo => {
    return axios.post(`/signup/{userinfo:user}`, userinfo);
  },
  getAccount: username => {
    return axios.get("/signup/username", username);
  }
};

export default apis;
