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




function FindParking() {

  const ae=localStorage.getItem("a_email");
  var navigate=useNavigate();
  const [t, st] = useState(false);

  

  const [data,updatedata]=useState([]);

  const [obj,updateobj]=useState({city:"",parkingname:""});

  const [obj2, updateobj2] = useState({
    aemail:"",
    email: ae,
    name: "",
    number:"",
    licenseplate:"",
    model:"",
    slotno:""
  });

  const [city,updatecity]=useState([]);

const [parkingname,updatecat]=useState([]);
 

   const [validated, setValidated] = useState(false);

  const update=(event)=>{
    var {name,value}=event.target;

    updateobj({...obj,[name]:value});
    fetch(event.target.value);

   
}

  const update2=(event)=>{
    var {name,value}=event.target;

    updateobj2(prevData => ({
      ...prevData,
      [name]: value  // Update the field specified by the name attribute of the input element
    }));
}

  const updatec=(event)=>{
    var {name,value}=event.target;

    updateobj({...obj,[name]:value});
    updatecat("");
    fetchparking(event.target.value);

}


    async function fetchcity(){
        var url="http://localhost:2002/client/fetchdetails-client-get";
   
    var response = await axios.get(url);
    // alert("city "+JSON.stringify(response.data));

    updatecity(response.data.city);
    updatecat(response.data.name); 
         
    }

    async function fetchparking(selcity){
        var url="http://localhost:2002/client/fetchparking-client-get?city="+ selcity;
   
    var response = await axios.get(url);
    
    // alert(JSON.stringify(response.data.result));
    // if(response.data.name!=null)
    updatecat(response.data.result); 
         
   
    }

    async function fetch(parkingname) {
    
      var url = "http://localhost:2002/provider/fetch-freespace-get?name=" + parkingname;
      var result = await axios.get(url);
  
      if (result.data.status) {
         alert("hlo1"+JSON.stringify(result.data));
         updateobj2(prevObj2 => ({
          ...prevObj2,
          aemail: parkingname,
          slotno: result.data.user.slotno
        }));

        var url2="http://localhost:2002/client/fetch-client-get?email="+ae;
        var result2= await axios.get(url2);

        alert("HLO@"+JSON.stringify(result2.data.user));
        updateobj2(prevObj2 => ({
          ...prevObj2,
          name: result2.data.user.firstname,
          number: result2.data.user.number
        }));
      }
      else
      {
        alert("NO SLOT AVAILABLE"); 
        navigate("/cdash");
      }
      
    }

    let options = null;

    if (parkingname) { 
      options = parkingname.map((el) => <option value={el.email}>{el.name}</option>); 
    }

    async function bookslot() {

      var url = "http://localhost:2002/provider/fillslot-post";
     alert(JSON.stringify(obj2));
      var response = await axios.post(url,obj2);
      if (response.data.status) {
        alert("BOOKED....");
        navigate("/cdash");
      } else {
        alert(response.data.message);
      }
    }

    useEffect(()=>
        {
            fetchcity();
        },[]
    )

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

        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
            <Form.Select aria-label="Default select example" required 
          name='city'
          value={obj.city}
          // onChange={update}
          onChange={updatec}>
              <option >Select</option>
              {
                city.map((str)=><option value={str}>{str}</option>)
              }
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>parkingname</Form.Label>  
            <Form.Select aria-label="Default select example" required 
          name='parkingname'
          value={obj.parkingname}
          onChange={update} >
              <option value="">Select</option>
              {
                  options
              }
              
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid category.
          </Form.Control.Feedback> 
        </Form.Group> 
      </Row>

      
      <button type="button" onClick={()=>{if(obj2.slotno){st(true)}}} >Fetch</button>
    </Form>
    </Container>
    <p> 
        {JSON.stringify(obj)}  
    </p>
    <p> 
        {JSON.stringify(parkingname)}  
    </p>
    
     <p> 
        {JSON.stringify(city)}  
    </p>
     <p> 
        {JSON.stringify(obj2)}  
    </p>

    {t && (
            <Container>
            <Form noValidate validated={validated}>
              <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                  <Form.Label>License plate no</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="plateno"
                    required
                    name="licenseplate"
                    value={obj2.licenseplate}
                    onChange={update2}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid number.
                  </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                  <Form.Label>model</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="model"
                    required
                    name="model"
                    value={obj2.model}
                    onChange={update2}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
    
             
              
                <Button type="button" onClick={bookslot}>
                  Book
                </Button>
              
            </Form>
          </Container>
          )}
    
    </div>
  );
}

export default FindParking;