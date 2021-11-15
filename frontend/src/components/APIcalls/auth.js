import {API_URL} from './backend.js';

export const signin = async (username,password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": username,
        "password": password
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    return await fetch(`${API_URL}/api/login`, requestOptions)
    .then(response => {console.log(response); return response.json()})
    .catch(error => {
        console.log('error', error);
        return error;
    });
}

export const Signup = async (username,password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "username": username,
    "password": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    return await fetch(`${API_URL}/api/signup`, requestOptions)
    .then(response => {console.log(response); return response.json()})
    .then((response) => {
        if(response.status === 200) {
            localStorage.setItem('login',true);
            return response;
        }
        localStorage.setItem('login',false);
        return response;
    })
    .catch((error) => {
        console.log(error)
        localStorage.setItem('login',false);
        return error;
    })
}