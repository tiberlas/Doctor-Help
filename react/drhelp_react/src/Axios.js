import axios1 from "axios"

const axios = axios1.create() 

const interceptor = axios1.interceptors.request.use(function(config) {
  let token = JSON.parse(localStorage.getItem('token'))
  alert(token)
  if ( token != null ) {
   // alert("1token is " + token).then(  axios.interceptors.request.eject(interceptor)).then(  alert("2token is " + token))
    
    axios.post('http://localhost:8080/api/refreshToken', {

                    'jwtToken': JSON.parse(localStorage.getItem('token'))

                  }).then(response => {
                      
                      console.log(response.data.jwtToken)
                      localStorage.removeItem('token')
                      localStorage.setItem('token', JSON.stringify(response.data.jwtToken))
                      alert("set a new token.")
                      axios.interceptors.request.eject(interceptor)
                      
                  })
                  const token = JSON.parse(localStorage.getItem('token'))
                  config.headers.Authorization = `Bearer ${token}`;
                  //config.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
  return config;
  }
}, function(err) {
  return Promise.reject(err);
});

axios1.interceptors.response.use(null, function(err) {
    if ( err.status === 401 ) {
        localStorage.removeItem('token')
        window.location.href = 'http://localhost:3000/login'//temp solution
    }
    return Promise.reject(err);
  });

  export default axios