import {API_URL} from './backend.js';

export const getUser = (user) =>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    return fetch(`${API_URL}/api/getUser/${user}`, requestOptions)
    .then(response => {console.log(response); return response.json()})
    .then(result => {return result})
    .catch(error => console.log('error', error));
}

export const updateUser = (user,id) =>{
    var formdata = new FormData();
    formdata.append("image", user.file);
    formdata.append("name", user.name);
    formdata.append("religion", user.religion);
    formdata.append("dob", user.dob);
    formdata.append("height", user.height);

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${API_URL}/api/updateUser/${id}`, requestOptions)
      .then(response => { console.log(response);return response.json()})
      .then(result => {console.log(result); console.log("Successfully updated")})
      .catch(error => console.log('error', error));
}
