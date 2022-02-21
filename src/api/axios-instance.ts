import axios from 'axios';

/*
export const developmentMode = true

export const instance = axios.create({
    baseURL: developmentMode ? process.env.REACT_APP_DEVELOPMENT_MODE_BASE_URL : process.env.REACT_APP_BASE_URL,
    withCredentials: true,
})
*/


export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});