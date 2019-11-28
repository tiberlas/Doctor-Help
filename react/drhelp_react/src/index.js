import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"


const interceptor = axios.interceptors.request.use(function(config) {
  const token = JSON.parse(localStorage.getItem('token'))
  alert(token)
  if ( token != null ) {
   // alert("1token is " + token).then(  axios.interceptors.request.eject(interceptor)).then(  alert("2token is " + token))
  
    axios.interceptors.request.eject(interceptor)
    axios.post('http://localhost:8080/api/refreshToken', {

                    'jwtToken': JSON.parse(localStorage.getItem('token'))

                  }).then(response => {
                      console.log(response.data.jwtToken)
                      localStorage.removeItem('token')
                      localStorage.setItem('token', JSON.stringify(response.data.jwtToken))
                      alert("set a new token.")
                      
                  })
                  const token = JSON.parse(localStorage.getItem('token'))
                  config.headers.Authorization = `Bearer ${token}`;
  
  return config;
  }
}, function(err) {
  return Promise.reject(err);
});

axios.interceptors.response.use(null, function(err) {
    if ( err.status === 401 ) {


        localStorage.removeItem('token')
        window.location.href = 'http://localhost:3000/login'//temp solution
    }
    return Promise.reject(err);
  });

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
