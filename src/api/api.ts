// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://state-backend-cjau.onrender.com', // change this
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;


import axios from "axios";



const api = axios.create({
  baseURL: 'https://state-backend-cjau.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;