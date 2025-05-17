import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import signup from "../images/signup-image.jpg";
import { Mail, Lock, ChevronDown } from "lucide-react";
import Header from "./signnav.jsx";
import "./css/signup.css";

function Sign() {
  const [obj, updateobj] = useState({ email: "", pwd: "", con_pwd: "", type: "type" });
  const navigate = useNavigate();

  const update = (event) => {
    const { name, value } = event.target;
    updateobj({ ...obj, [name]: value });
  };

  const signupuser = async (e) => {
    e.preventDefault();
    if (!obj.email || !obj.pwd || !obj.con_pwd || obj.type === "type") {
      alert("Please fill all fields and select a type.");
      return;
    }
    if (obj.pwd !== obj.con_pwd) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const url = "http://localhost:2002/user/signup-user-post";
      const resp = await axios.post(url, obj);
      if (resp.status === 201) {
        alert("Signed up successfully");
        navigate("/"); // Corrected typo
      } else {
        alert(resp.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <Container id="main-container" className="flex-grow-1 d-flex align-items-center py-5">
        <Row id="signup-container" className="justify-content-between align-items-center shadow-sm">
          <Col md={5}>
            <div className="bg-white rounded-3 p-4 p-md-5">
              <h1 className="display-6 fw-bold mb-4">Sign up</h1>
              <Form onSubmit={signupuser}>
                <Form.Group className="mb-3 position-relative">
                  <div
                    className="position-absolute"
                    style={{ top: "50%", left: "1rem", transform: "translateY(-50%)" }}
                  >
                    <Mail size={20} className="text-muted" />
                  </div>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={obj.email}
                    onChange={update}
                    className="ps-5"
                    style={{ height: "3rem" }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <div
                    className="position-absolute"
                    style={{ top: "50%", left: "1rem", transform: "translateY(-50%)" }}
                  >
                    <Lock size={20} className="text-muted" />
                  </div>
                  <Form.Control
                    type="password"
                    name="pwd"
                    placeholder="Password"
                    value={obj.pwd}
                    onChange={update}
                    className="ps-5"
                    style={{ height: "3rem" }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <div
                    className="position-absolute"
                    style={{ top: "50%", left: "1rem", transform: "translateY(-50%)" }}
                  >
                    <Lock size={20} className="text-muted" />
                  </div>
                  <Form.Control
                    type="password"
                    name="con_pwd"
                    placeholder="Repeat your password"
                    value={obj.con_pwd}
                    onChange={update}
                    className="ps-5"
                    style={{ height: "3rem" }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <div className="position-relative">
                    <Form.Select
                      name="type"
                      value={obj.type}
                      onChange={update}
                      className="ps-3"
                      style={{ height: "3rem" }}
                      required
                    >
                      <option value="type">Signup as</option>
                      <option value="car-owner">Car Owner</option>
                      <option value="parking-provider">Parking Provider</option>
                    </Form.Select>
                    <div
                      className="position-absolute"
                      style={{ top: "50%", right: "1rem", transform: "translateY(-50%)" }}
                    >
                      <ChevronDown size={20} className="text-muted" />
                    </div>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 py-2"
                  style={{
                    backgroundColor: "#3B82F6",
                    border: "none",
                    height: "3rem",
                  }}
                >
                  Register
                </Button>

                <div className="text-center mt-4">
                  <Link to="/login" className="text-decoration-none text-muted">
                    I am already member
                  </Link>
                </div>
              </Form>
            </div>
          </Col>

          <Col md={6} className="d-none d-md-block">
            <img
              src={signup}
              alt="Workspace Illustration"
              className="img-fluid"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Sign;