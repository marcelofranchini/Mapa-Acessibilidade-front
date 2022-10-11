
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mapa-acessibilidade-***********.herokuapp.com',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  export default api;
