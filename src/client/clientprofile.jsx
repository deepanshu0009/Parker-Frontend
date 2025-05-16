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

    async function savepost(){
        var url="http://localhost:2002/client/saveprofile-client-post";
    var formData=new FormData();
    for(var x in obj)
      {
        formData.append(x,obj[x]);
      }
    var response = await axios.post(url,formData,{headers:{'Content-Type':'multipart/form-data'}} );
    alert(JSON.stringify(response.data));
    if(response.data.status)
    {
      navigate("/cdash");
    }
        
    }

    async function fetchdetails(){
      console.log("email:"+obj.email);
      var url="http://localhost:2002/client/fetch-client-get?email="+obj.email;
      var result= await axios.get(url);

      if(result.data.status)
      {
        var p= "http://localhost:2002/uploads/"+result.data.user.ppic;
        var i= "http://localhost:2002/uploads/"+result.data.user.idpic;
        result.data.user.pprev = p;
        result.data.user.idprev = i;
        alert(result.data.user);
        updateobj(result.data.user);
        //updateobj({email:result.data.user.email,firstname:result.data.user.firstname,lastname:result.data.user.lastname,city:result.data.user.city,state:result.data.user.state,zip:result.data.user.zip,ppic:result.data.user.ppic,idpic:result.data.user.idpic,pprev:p,idprev:i});
      }
      else
      {
        st(true);
      }  
    }

    async function updatedetails(){
      var url="http://localhost:2002/client/updateprofile-client-post";
    var formData=new FormData();
    for(var x in obj)
      {
        formData.append(x,obj[x]);
      }
    var response = await axios.post(url,formData,{headers:{'Content-Type':'multipart/form-data'}} );
    if(response.data.status)
    {
      navigate("/cdash");
    } 
    else
    {
      alert(response.data.message);
    }
  }

  return (
    <div>
        <div>
            <br />
            <h1>Client profile</h1>
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
              // disabled
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
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
              placeholder='firstname'
              // disabled
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
        </Form.Group>
      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              aria-describedby="inputGroupPrepend"
              required
              name='lastname'
              placeholder='lastname'
              value={obj.lastname}
              onChange={update}
              // disabled
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
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