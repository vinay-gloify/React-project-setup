import axios from 'axios';

const baseURL = process.env.REACT_APP_AMS_API_URL;

// axios.defaults.baseURL = process.env.REACT_APP_AMS_API_URL;  --> we can use like this also for defaults then no need to define inside axios.create().


const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});


//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 3000;


//axios request used to modify data before sending
axiosClient.interceptors.request.use(
  function (request) {
    //we can add as per requirement like this
    alert('test');
    // request.headers['Content-Type'] = 'multipart/form-data';
    request.headers.channelName = 'React Project Setup'
    return request;
},function (error) {
  // Do something with request error
  return Promise.reject(error);
});



//axios response used to modify data after api call
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  }, 
  function (error) {
    let res = error.response;
    if (res.status === 401) {
      window.location.href = "https://example.com/login";
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);


export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL, payload, setProgress) {
  const config = {
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      setProgress(percentCompleted);
    }
  };
  return axiosClient.post(`/${URL}`, payload, config).then(response => response);
}

export function putRequest(URL, payload, setProgress) {
  const config = {
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      setProgress(percentCompleted);
    }
  };
  return axiosClient.put(`/${URL}`, payload, config).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response);
}



// -------------------------------------------------------------------------------------------------------------------


// import axios from "axios";

// const baseURL = process.env.REACT_APP_AMS_API_URL;

// export const apiServices = async (path, type, payload) => {
//   try {
//     const response = await axios({
//       method: type,
//       url: baseURL + path,
//       data: payload,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//         // Authorization: "Bearer " + localStorage.getItem("Token"),
//       },
//     });
//     return response;
//   } catch (error) {
//     console.error("API call error:", error);
//     return error;
//   }
// };
