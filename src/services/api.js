import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fathomless-ridge-68968.herokuapp.com/',
});
  
  export default api;