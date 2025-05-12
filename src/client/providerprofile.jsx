import React ,{ useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';




function Save() {

  const ae=localStorage.getItem("a_email");
  var navigate=useNavigate();
  
      

  const [obj,updateobj]=useState({email:ae,firstname:"",lastname:"",number:"",ppic:null,idpic:null,pprev:"",idprev:""});
   const [validated, setValidated] = useState(false);
   const [t,st]=useState(false);
  
   useEffect(()=>{ 
     console.log("object:" + JSON.stringify(obj));
  
      fetchdetails();
  },[])
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
  
    if (form.checkValidity() === false) {
      console.log("false");
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    

     setValidated(true);
      savepost();
  };

  const update=(event)=>{
    var {name,value}=event.target;

    updateobj({...obj,[name]:value});
}

const pic=(event)=>{
  // alert(JSON.stringify(event.target));

  const file=event.target.files[0];
  updateobj({...obj,["ppic"]:file,["pprev"]:URL.createObjectURL(file)});
}

const idpic=(event)=>{

  const file=event.target.files[0];
  updateobj({...obj,["idpic"]:file,["idprev"]:URL.createObjectURL(file)});
}

async function savepost() {
    try {
        const url = "http://localhost:2002/provider/saveprofile-provider-post";
        const formData = new FormData();
        for (const key in obj) {
            formData.append(key, obj[key]);
        }

        const response = await axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.status === 201) {
            // Check for status 201
            alert(response.data.message || "Provider information saved successfully");
            navigate("/pdash");
        } else {
            alert(response.data.error || "Failed to save provider information");
        }
    } catch (err) {
        console.error("Error saving provider information:", err.response?.data || err.message);
        alert("An error occurred while saving provider information. Please try again.");
    }
}

async function fetchdetails() {
    try {
        console.log("Fetching details for email:", obj.email);
        const url = `http://localhost:2002/provider/fetch-provider-get?email=${obj.email}`;
        const result = await axios.get(url, {
            validateStatus: (status) => {
                // Accept all status codes for manual handling
                return true;
            },
        });

        if (result.status === 200 && result.data.status) {
            // Check for status 200
            const user = result.data.user;
            const p = `http://localhost:2002/uploads/${user.ppic}`;
            const i = `http://localhost:2002/uploads/${user.idpic}`;
            user.pprev = p;
            user.idprev = i;
            updateobj(user);
        } else if (result.status === 404) {
            st(true); // Show save button if provider not found
        } else {
            alert(result.data.message || "Failed to fetch provider details");
        }
    } catch (err) {
        console.error("Error fetching provider details:", err.response?.data || err.message);
        alert("An error occurred while fetching provider details. Please try again.");
    }
}

async function updatedetails() {
    try {
        const url = "http://localhost:2002/provider/updateprofile-provider-post";
        const formData = new FormData();
        for (const key in obj) {
            formData.append(key, obj[key]);
        }

        const response = await axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.status === 200 && response.data.status) {
            // Check for status 200
            alert(response.data.message || "Provider information updated successfully");
            navigate("/pdash");
        } else if (response.status === 404) {
            alert(response.data.message || "Provider not found");
        } else {
            alert(response.data.message || "Failed to update provider information");
        }
    } catch (err) {
        console.error("Error updating provider information:", err.response?.data || err.message);
        alert("An error occurred while updating provider information. Please try again.");
    }
}

  return (
    <div>
        <div>
            <br />
            <h1>Provider profile</h1>
            <br />
            <br />
        </div>
    <Container>
    <Form noValidate validated={validated}>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              aria-describedby="inputGroupPrepend"
              required
              name='email'
              value={obj.email}
              onChange={update}
              readOnly
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
        </Form.Group>
      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              aria-describedby="inputGroupPrepend"
              required
              name='firstname'
              value={obj.firstname}
              onChange={update}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid first name.
            </Form.Control.Feedback>
        </Form.Group>
      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              aria-describedby="inputGroupPrepend"
              required
              name='lastname'
              value={obj.lastname}
              onChange={update}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid last name.
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
      
      <Row className="mb-3">

        <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>Contact Number:</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Number" 
          required 
          name='number'
          value={obj.number}
          onChange={update}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid number.
          </Form.Control.Feedback>
        </Form.Group>

      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom06">
          <Form.Label>Profile Pic</Form.Label>
          <Form.Control
            type="file"
            placeholder="Profile Pic"
            name='ppic'
            onChange={pic}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid profile pic.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom07">
          <Form.Label>ID Pic</Form.Label>
          <Form.Control
            required
            type="file"
            placeholder="ID Pic"
            name='idpic'
            onChange={idpic} 
          />
         <Form.Control.Feedback type="invalid">
            Please provide a valid id proof.
          </Form.Control.Feedback>
        </Form.Group>  
      </Row>
      <Row>
       
        <Col xs={6} md={4}>
          <Image src={obj.pprev} alt='ppic'  id='pprev' thumbnail />
        </Col>
        <Col xs={6} md={4}>
          <Image src={obj.idprev} alt='idpic' id='idprev' thumbnail />
        </Col>
      </Row> 
      {t &&(<Button type="button" onClick={handleSubmit}>save</Button>)}
      {!t &&(<Button type="button" onClick={updatedetails}>Update</Button>)}
    </Form>
    </Container>
    </div>
  );
}

export default Save;