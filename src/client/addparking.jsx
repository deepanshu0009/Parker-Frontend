import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";

function Park() {
  const ae = localStorage.getItem("a_email");
  var navigate = useNavigate();

  const [obj, updateobj] = useState({
    email: ae,
    name: "",
    size: "",
    rate: "",
    number:"",
    country: "",
    state: "",
    city: "",
    location: "",
    zip: "",
    ppic: null,
    pprev: "",
  });

  const [validated, setValidated] = useState(false);
  const [t, st] = useState(false);

  useEffect(() => {
    console.log("object:" + JSON.stringify(obj));

    fetchdetails();
  }, []);

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

  const update = (event) => {
    var { name, value } = event.target;

    updateobj({ ...obj, [name]: value });
  };

  const pic = (event) => {
    // alert(JSON.stringify(event.target));

    const file = event.target.files[0];
    updateobj({ ...obj, ["ppic"]: file, ["pprev"]: URL.createObjectURL(file) });
  };

  async function savepost() {
    try {
        const url = "http://localhost:2002/provider/saveparking-post";
        const formData = new FormData();

        for (const key in obj) {
            formData.append(key, obj[key]);
        }

        const response = await axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201) {
            // Check for status 201
            alert(response.data.message || "Parking details and slots created successfully");
            navigate("/pdash");
        } else {
            alert(response.data.error || "Failed to save parking details");
        }
    } catch (err) {
        console.error("Error saving parking details:", err.response?.data || err.message);
        alert("An error occurred while saving parking details. Please try again.");
    }
}

async function fetchdetails() {
    try {
        console.log("Fetching parking details for email:", obj.email);
        const url = `http://localhost:2002/provider/fetch-parking-get?email=${obj.email}`;
        const result = await axios.get(url, {
            validateStatus: (status) => {
                // Accept all status codes for manual handling
                return true;
            },
        });

        if (result.status === 200 && result.data.status) {
            // Check for status 200
            const parking = result.data.parking;
            const p = `http://localhost:2002/uploads/${parking.ppic}`;
            parking.pprev = p;
            updateobj(parking);
        } else if (result.status === 404) {
            st(true); // Show save button if parking details not found
        } else {
            alert(result.data.message || "Failed to fetch parking details");
        }
    } catch (err) {
        console.error("Error fetching parking details:", err.response?.data || err.message);
        alert("An error occurred while fetching parking details. Please try again.");
    }
}

async function updatedetails() {
    try {
        const url = "http://localhost:2002/provider/updateparking-post";
        const formData = new FormData();

        for (const key in obj) {
            formData.append(key, obj[key]);
        }

        const response = await axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200 && response.data.status) {
            // Check for status 200
            alert(response.data.message || "Parking details updated successfully");
            navigate("/pdash");
        } else if (response.status === 404) {
            alert(response.data.message || "Parking details not found");
        } else {
            alert(response.data.message || "Failed to update parking details");
        }
    } catch (err) {
        console.error("Error updating parking details:", err.response?.data || err.message);
        alert("An error occurred while updating parking details. Please try again.");
    }
}

  return (
    <div>
      <div>
        <br />
        <h1>ADD PARKING</h1>
        <br />
        <br />
      </div>
      <Container>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="inputGroupPrepend"
                required
                placeholder="name"
                name="name"
                value={obj.name}
                onChange={update}
                // disabled
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Parking Size</Form.Label>
              <Form.Control
                required
                type="Integer"
                placeholder="parking size"
                name="size"
                value={obj.size}
                onChange={update}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a firstname.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Parking Rate</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="rate"
                name="rate"
                value={obj.rate}
                onChange={update}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a lastname.
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
                name="number"
                value={obj.number}
                onChange={update}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                required
                name="country"
                value={obj.country}
                onChange={update}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                required
                name="location"
                value={obj.location}
                onChange={update}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                required
                name="city"
                value={obj.city}
                onChange={update}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={obj.state}
                onChange={update}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={obj.zip}
                onChange={update}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <Form.Label>Parking Pic</Form.Label>
              <Form.Control
                type="file"
                placeholder="Profile Pic"
                name="ppic"
                onChange={pic}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid profile pic.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Image src={obj.pprev} alt="ppic" id="pprev" thumbnail />
            </Col>
          </Row>
          {t && (
            <Button type="button" onClick={handleSubmit}>
              save
            </Button>
          )}
          {!t && (
            <Button type="button" onClick={updatedetails}>
              Update
            </Button>
          )}
        </Form>
      </Container>
      <p>{JSON.stringify(obj)}</p>
    </div>
  );
}

export default Park;
