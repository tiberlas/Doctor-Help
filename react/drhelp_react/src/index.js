import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// const interceptor = axios.interceptors.response.use(
//         response => response,
//         error => {
//             // Reject promise if usual error
//             if (error.status === 401) {
//                 return Promise.reject(error);
//             }

//             /* 
//              * When response code is 401, try to refresh the token.
//              * Eject the interceptor so it doesn't loop in case
//              * token refresh causes the 401 response
//              */
//             axios.interceptors.response.eject(interceptor)
//             var token = JSON.parse(localStorage.getItem('token'))

//             return axios.post('http://localhost:8080/api/refreshToken', {
//                 'jwtToken': token
//             }).then(response => {
//                 localStorage.setItem('token', JSON.stringify(response.jwtToken))
//                 error.response.config.headers['Authorization'] = 'Bearer ' + response.jwtToken
//                 return axios(error.response.config)
//             }).catch(error => {
//                 localStorage.removeItem('token')
//                 this.router.push('/login')
//                 return Promise.reject(error)
//             })
//         }
// )

ReactDOM.render(<App />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();