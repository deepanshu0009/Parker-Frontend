import React, { useState, useEffect } from "react";
import { Container, Form, Button, Image, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Camera, Upload, ParkingSquare } from 'lucide-react';
import "./css/parking.css";

function Park() {
  const ae = localStorage.getItem("a_email");
  var navigate = useNavigate();

  const [obj, updateobj] = useState({
    email: ae,
    name: "",
    size: "",
    rate: "",
    number: "",
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
      const url = "http://localhost:2002/provider/save-parking-and-create-slots";
      const formData = new FormData();

      for (const key in obj) {
        formData.append(key, obj[key]);
      }

      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: (status) => true, // Accept all status codes for manual handling
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
        const p = parking.ppic ? `http://localhost:2002/uploads/${parking.ppic}` : "";
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
        validateStatus: (status) => true, // Accept all status codes for manual handling
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
    <Container className="py-4" style={{ maxWidth: '1200px' }}>
      <div className="text-center mb-5">
        <h2 className="display-4 mb-4" style={{
          background: 'linear-gradient(135deg, #6366F1, #818CF8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          marginTop: '-20px'
        }}>
          Add/Edit Parking
        </h2>
      </div>

      <Card className="border-0 form_container">
        <Card.Body className="p-4">
          <Form noValidate validated={validated}>
            <Row>
              {/* Form Fields Section - Now on left */}
              <Col lg={8} className="pe-lg-4">
                {/* Basic Information */}
                <Card className="mb-4 border-0 background_tint">
                  <Card.Body className="p-4">
                    <h5 className="mb-4">Basic Information</h5>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="name">
                          <Form.Label>Parking Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter parking name"
                            name="name"
                            value={obj.name}
                            onChange={update}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="size">
                          <Form.Label>Parking Size</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Number of slots"
                            name="size"
                            value={obj.size}
                            onChange={update}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="rate">
                          <Form.Label>Hourly Rate</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter rate"
                            name="rate"
                            value={obj.rate}
                            onChange={update}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Contact Information */}
                <Card className="mb-4 border-0 background_tint">
                  <Card.Body className="p-4">
                    <h5 className="mb-4">Contact Information</h5>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="number">
                          <Form.Label>Contact Number</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Enter contact number"
                            name="number"
                            value={obj.number}
                            onChange={update}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="location">
                          <Form.Label>Street Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter street address"
                            name="location"
                            value={obj.location}
                            onChange={update}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Location Information */}
                <Card className="mb-4 border-0 background_tint">
                  <Card.Body className="p-4">
                    <h5 className="mb-4">Location Details</h5>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="country">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter country"
                            name="country"
                            value={obj.country}
                            onChange={update}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="state">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter state"
                            name="state"
                            value={obj.state}
                            onChange={update}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="city">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter city"
                            name="city"
                            value={obj.city}
                            onChange={update}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="zip">
                          <Form.Label>ZIP Code</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter ZIP code"
                            name="zip"
                            value={obj.zip}
                            onChange={update}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Action Buttons */}
                <div className="text-end">
                  {t ? (
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      className="px-5"
                      onClick={handleSubmit}
                    >
                      Save Parking
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="success"
                      size="lg"
                      className="px-5"
                      onClick={updatedetails}
                    >
                      Update Parking
                    </Button>
                  )}
                </div>
              </Col>

              {/* Parking Image Section - Now on right for desktop, top for mobile */}
              <Col lg={4} className="mb-4 mb-lg-0 order-lg-last">
                <Card className="border-0 background_tint h-100">
                  <Card.Body className="p-4">
                    <h5 className="mb-4">Parking Image</h5>
                    <div className="position-relative">
                      {obj.pprev ? (
                        <Image
                          src={obj.pprev}
                          alt="Parking Area"
                          className="w-100 rounded"
                          style={{ height: '300px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="d-flex justify-content-center align-items-center bg-white rounded w-100"
                          style={{ height: '300px', border: '2px dashed #E5E7EB' }}>
                          <ParkingSquare size={80} className="text-gray-400" />
                        </div>
                      )}
                      <div className="position-absolute bottom-0 end-0 mb-3 me-3">
                        <label className="btn btn-primary rounded-circle p-2 shadow-sm" style={{ cursor: 'pointer' }}>
                          <Camera size={20} className="text-white" />
                          <input
                            type="file"
                            onChange={pic}
                            className="d-none"
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Park;
