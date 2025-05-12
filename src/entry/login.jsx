import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { getuserservice } from "../services/user";
import Signnav from "./signnav";
import email from "../images/email.png";
import signin from "../images/signin-image.jpg";
import pass from "../images/key.png";
 
function Loginhere() {
  const [obj, updateobj] = useState({ lemail: "", lpwd: "" });
  var navigate = useNavigate();

  const update = (event) => {
    var { name, value } = event.target;
    updateobj({ ...obj, [name]: value });
  };

  const loginwithquery = async () => {
    console.log("Login Request Payload:", obj);
    try {
        const url = "http://localhost:2002/user/login-with-post";
        const resp = await axios.post(url, {
            email: obj.lemail,
            pwd: obj.lpwd,
        });

        if (resp.status === 200) {
            // Check for status 200
            console.log("Login successful");
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("a_email", resp.data.user.email);

            if (resp.data.user.type === "Client") {
                navigate("/cdash");
            } else {
                navigate("/pdash");
            }
        } else {
            console.log("Login failed:", resp.data.message || "Unknown error");
            alert(resp.data.message || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during login:", error.response?.data || error.message);
        alert("An error occurred during login. Please try again.");
    }
};

  var token = localStorage.getItem("token");

  const getUser = async () => {
    try {
        console.log("Token:", token);
        const url = "http://localhost:2002/user/currentuser";
        const resp = await axios.get(url, {
            headers: {
                Authorization: token, // Add token in the Authorization header
            },
        });

        if (resp.status === 200) {
            // Check for status 200
            console.log("User fetched successfully");
            if (resp.data.user.type === "Client") {
                navigate("/cdash");
            } else {
                console.log("Service-Provider");
                navigate("/pdash");
            }
        } else {
            console.log("Failed to fetch user:", resp.data.message || "Unknown error");
            alert(resp.data.message || "Failed to fetch user. Please try again.");
        }
    } catch (err) {
        console.error("Error during fetching user:", err.response?.data || err.message);

        // Handle specific error cases
        if (err.response?.status === 401) {
            alert(err.response.data.error || "Unauthorized. Please log in again.");
            navigate("/login"); // Redirect to login page
        } else if (err.response?.status === 404) {
            alert(err.response.data.error || "User not found.");
        } else {
            alert("An error occurred while fetching user. Please try again.");
        }
    }
};

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  return (
    <div>
      <div>
        <Signnav></Signnav>

        <div> <div>
      
    <section >
       <div >
           <div >
               <div >
                   <figure><img src={signin} alt="sing up image"/></figure>
                   <Link to="/signup">
                   Create an account
                   </Link>
               </div>

               <div >
                   <h2 >Login</h2>
                   <form method="POST"  id="login-form">
                       <div >
                           <label for="your_name"> <img src={email} height="10px" width="10px" alt=""/> </label>
                           <input type="text" value={obj.lemail} name="lemail" id="your_name" placeholder="Email" onChange={update}/>
                       </div>
                       <div >
                           <label for="your_pass"> <img src={pass} height="10px" width="10px" alt=""/></label>
                           <input type="password" value={obj.lpwd} name="lpwd" onChange={update} id="your_pass" placeholder="Password"/>
                       </div>
                       
                       <div>
                           <input type="button" onClick={loginwithquery} id="signin" value="Log in"/>
                       </div>
                   </form>
                   
               </div>

              
           </div>
       </div>
   </section>

    </div>
</div>
      </div>
    </div>
  );
}

export default Loginhere;
