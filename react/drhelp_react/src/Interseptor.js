import axios from "axios"

const interceptor = axios.interceptors.request.use( (config) => {
const token = JSON.parse(localStorage.getItem('token'))

if ( token != null ) {
    
    //axios.interceptors.request.eject(interceptor);
    fetch('http://localhost:8080/api/refreshToken', { 
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jwtToken: JSON.parse(localStorage.getItem('token'))
        })
    }).then(response => {
        if(response.status === 404 || response.status === 401) {
            localStorage.removeItem('token')
            window.location.href = 'http://localhost:3000/login'//temp solution
        }

        return response.json()
    })
    .then(response => {
        localStorage.removeItem('token')
        localStorage.setItem('token', JSON.stringify(response.jwtToken))
    })

    
    const token = JSON.parse(localStorage.getItem('token'))
    config.headers.Authorization = `Bearer ${token}`;
    
    //axios.interceptors.request = interceptor;
return config;

}
}, function(err) {
    alert("ERROR")
    if ( err.status === 401 ) {
        localStorage.removeItem('token')
        window.location.href = 'http://localhost:3000/login'//temp solution
    }
  return Promise.reject(err);

});

export default interceptor;
