import React, {useState ,useEffect } from "react";
import axios from "axios";
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
            <h1>PDASH</h1></center>
            <p>
                <center>
                welcome:{e};
                <p>
                    <div>
                        <Link to="/pprof">
                        <h3> Profile</h3>
                        </Link>

                        <Link to="/parking">
                        <h3> Add Parking/Edit parking</h3>
                        </Link>

                        <Link to="/bookslot">
                        <h3> Fill slots</h3>
                        </Link>

                        <Link to="/freeslot">
                        <h3> Free slots</h3>
                        </Link>

                        <Link to="/sclient">
                        <h3> view parking</h3>
                        </Link>

                        <Link to="/" onClick={logout}>
                        <h3>Log Out</h3>
                        </Link>
                    </div>
                   
                </p>
                </center>
            </p>
    </div>
    </>
)}

export default Cd;
