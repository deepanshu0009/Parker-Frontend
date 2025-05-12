import axios from 'axios';

 let baseURL="http://localhost:2002";

 const publicreq=axios.create({baseURL,});
 const privatereq=axios.create({baseURL,});

 privatereq.interceptors.request.use((config)=>{

    const token= localStorage.getItem("token");

    if(token)
    {
        config.headers.Authorization = `Bearer ${token}`;
        return config;   
    }               
    });
 export {publicreq,privatereq};