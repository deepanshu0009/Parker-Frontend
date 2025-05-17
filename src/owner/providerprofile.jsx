import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Camera, Upload, User } from 'lucide-react';
import "./css/profile.css"

function Pprof() {

  const ae = localStorage.getItem("a_email");
  var navigate = useNavigate();

  const [obj, updateobj] = useState({ email: ae, firstname: "", lastname: "", number: "", ppic: null, idpic: null, pprev: "", idprev: "" });
  const [validated, setValidated] = useState(false);
  const [t, st] = useState(false);

  useEffect(() => {
    console.log("object:" + JSON.stringify(obj));
    fetchdetails();
  }, [])

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
  }

  const pic = (event) => {
    const file = event.target.files[0];
    updateobj({ ...obj, ["ppic"]: file, ["pprev"]: URL.createObjectURL(file) });
  }

  const idpic = (event) => {
    const file = event.target.files[0];
    updateobj({ ...obj, ["idpic"]: file, ["idprev"]: URL.createObjectURL(file) });
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
        validateStatus: (status) => {
          // Accept all status codes for manual handling
          return true;
        },
      });

      if (response.status === 201) {
        alert(response.data.message || "Provider information saved successfully");
        navigate("/pdash/");
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
        validateStatus: (status) => true,
      });

      if (result.status === 200 && result.data.status) {
        const user = result.data.user;
        user.pprev = user.ppic ? `http://localhost:2002/uploads/${user.ppic}` : "";
        user.idprev = user.idpic ? `http://localhost:2002/uploads/${user.idpic}` : "";
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
        validateStatus: (status) => {
          // Accept all status codes for manual handling
          return true;
        },
      });

      if (response.status === 200 && response.data.status) {
        alert(response.data.message || "Provider information updated successfully");
        navigate("/pdash/");
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
    <Container className="py-3" style={{ maxWidth: '800px' }}>
      <div className="text-center mb-5">
        <h2 className="display-4 mb-4" style={{
          background: 'linear-gradient(135deg, #6366F1, #818CF8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          marginTop: '-20px'
        }}>
          Provider Profile
        </h2>
      </div>

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="shadow-sm p-4 rounded-3">
        {/* Profile Picture Section */}
        <div className="text-center mb-5">
          <div className="position-relative d-inline-block">
            {obj.pprev ? (
              <Image
                src={obj.pprev}
                alt="Profile Picture"
                roundedCircle
                className="mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            ) : (
              <div className="d-flex justify-content-center align-items-center bg-light rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}>
                <User size={80} className="text-gray-400" />
              </div>
            )}
            <div className="position-absolute bottom-0 end-0">
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
        </div>

        {/* Form Fields */}
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Group controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={obj.firstname}
                onChange={update}
                required
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={obj.lastname}
                onChange={update}
                required
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-12">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={obj.email}
                onChange={update}
                required
                disabled
                className="py-2 bg-light"
              />
            </Form.Group>
          </div>

          <div className="col-12">
            <Form.Group controlId="number">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                name="number"
                value={obj.number}
                onChange={update}
                required
                className="py-2"
              />
            </Form.Group>
          </div>

          {/* ID Proof Section */}
          <div className="col-12">
            <Form.Group controlId="idproof" className="border rounded p-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Label className="mb-0">ID Proof</Form.Label>
                <label className="btn btn-outline-primary btn-sm">
                  <Upload size={18} className="me-2" />
                  Choose File
                  <input
                    type="file"
                    onChange={idpic}
                    className="d-none"
                    accept="image/*"
                  />
                </label>
              </div>
              {obj.idprev && (
                <div className="mt-2">
                  <Image
                    src={obj.idprev}
                    alt="ID Proof"
                    className="img-thumbnail"
                    style={{ maxHeight: '100px' }}
                  />
                </div>
              )}
            </Form.Group>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-end mt-4">
          {t ? (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="px-4"
            >
              Save Profile
            </Button>
          ) : (
            <Button
              type="button"
              variant="success"
              size="lg"
              className="px-4"
              onClick={updatedetails}
            >
              Update Profile
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
}

export default Pprof;