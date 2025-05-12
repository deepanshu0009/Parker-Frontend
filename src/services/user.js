import { privatereq, publicreq } from "./axios-config";

const signupservice=(data)=>{
    return publicreq.post("/user/signup-user-post",data);
}

const getuserservice=()=> privatereq.get("/user/currentuser");

export {signupservice,getuserservice}