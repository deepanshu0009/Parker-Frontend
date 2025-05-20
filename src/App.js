//import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./entry/main";
import Signup from "./entry/signup";
import Login from "./entry/login";
import Pdash from "./owner/pdash";
import Cdash from "./client/cdash";
import Welcome from "./owner/welcome";
import Free from "./owner/freeslot";
import Pprof from "./owner/providerprofile";
import Park from "./owner/addparking";
import Book from "./owner/fillslots";
import ViewParking from "./owner/viewpark";
import Cprof from "./client/clientprofile";
import Fpark from "./client/fetchparking";
import FetchAllClientBookedSlots from "./client/fetchallslots";

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Navbar/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/pdash" element={<Pdash/>}>
          <Route path="/pdash/" element={<Welcome/>}></Route>
          <Route path="/pdash/pprof" element={<Pprof/>}></Route>
          <Route path="/pdash/parking" element={<Park/>}></Route>
          <Route path="/pdash/bookslot" element={<Book/>}></Route>
          <Route path="/pdash/freeslot" element={<Free/>}></Route>
          <Route path="/pdash/viewpark" element={<ViewParking/>}></Route>
        </Route>
        <Route path="/cdash" element={<Cdash/>}></Route>
        <Route path="/cprof" element={<Cprof/>}></Route>
        <Route path="/cfpark" element={<Fpark/>}></Route>
        <Route path="/fetchslots" element={<FetchAllClientBookedSlots/>}></Route>
    </Routes>
    </Router>
    
  );
}

export default App;




