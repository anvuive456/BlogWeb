// import axios from "axios";

// export const api = axios.create({
//   baseURL:( process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.BASE_URL) + '/api',
// })

export  const baseApiUrl = ( process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.BASE_URL) + '/api';
export const baseUrl = ( process.env.NODE_ENV == 'production' ? process.env.PROD_BASE_URL : process.env.BASE_URL) ;
