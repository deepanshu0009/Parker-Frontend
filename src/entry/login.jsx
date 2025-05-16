import { useState, useEffect } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock } from "lucide-react"
import axios from "axios"
import Header from "./signnav.jsx"
import signin from "../images/signin-image.jpg";
import "./css/login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:2002/user/login-with-post", {
        email: formData.email,
        pwd: formData.password,
      })

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("a_email", response.data.user.email)

        if (response.data.user.type === "Client") {
          navigate("/cdash")
        } else {
          navigate("/pdash")
        }
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message)
      alert("Login failed. Please check your credentials and try again.")
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const getUser = async () => {
        try {
          const response = await axios.get("http://localhost:2002/user/currentuser", {
            headers: {
              Authorization: token,
            },
          })

          if (response.status === 200) {
            if (response.data.user.type === "Client") {
              navigate("/cdash")
            } else {
              navigate("/pdash")
            }
          }
        } catch (error) {
          console.error("Error fetching user:", error)
          if (error.response?.status === 401) {
            localStorage.removeItem("token")
            localStorage.removeItem("a_email")
          }
        }
      }
      getUser()
    }
  }, [navigate])

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <Container id="main-container" className="flex-grow-1 d-flex align-items-center py-5">
        <Row id="login-container" className="justify-content-between align-items-center shadow-sm">
          <Col md={6} className="d-none d-md-block">
            <img
              src={signin}
              alt="Workspace Illustration"
              className="img-fluid"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          </Col>

          <Col md={5}>
            <div className="bg-white rounded-3 p-4 p-md-5">
              <h1 className="display-6 fw-bold mb-4">Login</h1>
              <Form onSubmit={handleSubmit}>
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
                    value={formData.email}
                    onChange={handleChange}
                    className="ps-5"
                    style={{ height: "3rem" }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4 position-relative">
                  <div
                    className="position-absolute"
                    style={{ top: "50%", left: "1rem", transform: "translateY(-50%)" }}
                  >
                    <Lock size={20} className="text-muted" />
                  </div>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="ps-5"
                    style={{ height: "3rem" }}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberMe" label="Remember me" className="text-muted" />
                  <Link to="/forgot-password" className="text-decoration-none text-primary">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-100 py-2"
                  style={{
                    backgroundColor: "#3B82F6",
                    border: "none",
                    height: "3rem",
                  }}
                >
                  Login
                </Button>

                <div className="text-center mt-4">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/signup" className="text-decoration-none text-primary">
                    Sign up
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login