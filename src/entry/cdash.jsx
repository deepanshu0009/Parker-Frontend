import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

function Cd(){

    var [e,set]=useState("");

    useEffect(()=>{
        const ae=localStorage.getItem("a_email");
        set(ae);
    },[])

    const logout=()=>{
        localStorage.removeItem("a_email");
        localStorage.removeItem("token");
    }
 

return(
    <>
    <div>
        <center>
            <h1>CDASH</h1></center>
            <p>
                <center>
                welcome:{e};
                <p>
                    <div>
                        <Link to="/cprof">
                        <h3> Profile</h3>
                        </Link>

                        <Link to="/cfpark">
                        <h3> Find Parking</h3>
                        </Link>

                        <Link to="/csearch">
                        <h3> fetch pro</h3>
                        </Link>

                        <Link to="/">
                        <h3 onClick={logout}>Log Out</h3>
                        </Link>
                    </div>
                   
                </p>
                </center>
            </p>
    </div>
    </>
)}

export default Cd;
