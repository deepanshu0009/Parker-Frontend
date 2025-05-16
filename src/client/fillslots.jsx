import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Book() {
  const ae = localStorage.getItem("a_email");
  const navigate = useNavigate();

  const [obj, updateobj] = useState({
    aemail: ae,
    email: "",
    name: "",
    number: "",
    licenseplate: "",
    model: "",
    slotno: "",
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    console.log("object:" + JSON.stringify(obj));
    fetchdetails();
  }, []);

  const update = (event) => {
    const { name, value } = event.target;
    updateobj({ ...obj, [name]: value });
  };

  async function fetchdetails() {
    try {
      const url = `http://localhost:2002/provider/fetch-freespace-get?name=${ae}`;
      const result = await axios.get(url, {
        validateStatus: (status) => true, // Handle all status codes manually
      });

      if (result.status === 200 && result.data.status) {
        updateobj({ ...obj, slotno: result.data.slot.slotno });
      } else if (result.status === 404) {
        alert(result.data.message || "No free slots available");
        navigate("/pdash");
      } else {
        alert(result.data.message || "Failed to fetch free slots");
      }
    } catch (err) {
      console.error("Error fetching free slots:", err.response?.data || err.message);
      alert("An error occurred while fetching free slots. Please try again.");
    }
  }

  async function bookslot() {
    try {
      const url = "http://localhost:2002/provider/fillslot-post";
      const payload = { ...obj }; // Payload without payment response
      alert(JSON.stringify(payload));
      const response = await axios.post(url, payload, {
        validateStatus: (status) => true, // Handle all status codes manually
      });

      if (response.status === 200 && response.data.status) {
        alert(response.data.message || "Slot booked successfully");
        navigate("/pdash");
      } else if (response.status === 404) {
        alert(response.data.message || "Slot not available or already booked");
      } else {
        alert(response.data.message || "Failed to book slot");
      }
    } catch (err) {
      console.error("Error booking slot:", err.response?.data || err.message);
      alert("An error occurred while booking the slot. Please try again.");
    }
  }

  return (
    <div>
      <div>
        <br />
        <h1>BOOK SLOT</h1>
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
                placeholder="name"
                name="name"
                value={obj.name}
                onChange={update}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="email"
                name="email"
                value={obj.email}
                onChange={update}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Contact Number:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Number"
                name="number"
                value={obj.number}
                onChange={update}
              />
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>License Plate No</Form.Label>
              <Form.Control
                type="text"
                placeholder="License Plate"
                name="licenseplate"
                value={obj.licenseplate}
                onChange={update}
              />
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Model"
                name="model"
                value={obj.model}
                onChange={update}
              />
            </Form.Group>
          </Row>

          <Button type="button" onClick={bookslot}>
            Book Slot
          </Button>
        </Form>
      </Container>
      <p>{JSON.stringify(obj)}</p>
    </div>
  );
}

export default Book;
