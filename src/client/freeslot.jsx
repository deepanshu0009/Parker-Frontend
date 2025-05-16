import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomNavbar from './CustomNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initiatePayment } from "./payment";
// Ensure Razorpay is globally available

/* global Razorpay */

function Free() {
    const ae = localStorage.getItem("a_email");
    const navigate = useNavigate();

    const [obj, updateobj] = useState({
        aemail: ae,
        licenseplate: "",
        slotno: ""
    });

    const [p, updatep] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        console.log("object:" + JSON.stringify(obj));
        fetchrate();
    }, []);

    const fetchrate = async () => {
        try {
            const url = `http://localhost:2002/provider/rate-post?email=${obj.aemail}`; // Pass email as a query parameter
            const response = await axios.get(url, {
                validateStatus: (status) => {
                    // Accept all status codes for manual handling
                    return true;
                },
            });

            if (response.status === 200 && response.data.status) {
                // Update the rate in the state
                updatep(response.data.rate); // Use `rate` from the backend response
                // alert("Rate fetched successfully: " + JSON.stringify(response.data.rate));
            } else if (response.status === 404) {
                alert(response.data.message || "Parking rate not found for the given email.");
            } else {
                alert(response.data.message || "Failed to fetch parking rate.");
            }
        } catch (err) {
            console.error("Error fetching parking rate:", err.response?.data || err.message);
            alert("An error occurred while fetching the parking rate. Please try again.");
        }
    };

    const update = (event) => {
        const { name, value } = event.target;
        updateobj({ ...obj, [name]: value });
    };

    

    const savepost = async (paymentResponse) => {
        try {
            const url = "http://localhost:2002/provider/freeparking-post";
            const formData = new FormData();

            for (const key in obj) {
                formData.append(key, obj[key]);
            }

            const response = await axios.post(url, formData, {
                validateStatus: (status) => {
                    // Accept all status codes for manual handling
                    return true;
                },
            });

            if (response.status === 200 && response.data.status) {
                // Calculate the bill
                const bill = p * response.data.timeDifferenceInhours;
                alert(`BILL = ${bill}`);
                initiatePayment(bill);
                navigate("/pdash");
            } else if (response.status === 404) {
                alert(response.data.message || "Slot not found.");
            } else {
                alert(response.data.message || "Failed to free the slot.");
            }
        } catch (err) {
            console.error("Error freeing slot:", err.response?.data || err.message);
            alert("An error occurred while freeing the slot. Please try again.");
        }
    };

    return (
        <div>
            <div>
                <br />
                <CustomNavbar />
                <br />
                <br />
            </div>
            <div>
                <Container>
                    <Form noValidate validated={validated}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <div>Slotno:</div>
                                <Form.Control
                                    type="text"
                                    placeholder="slotno"
                                    required
                                    name="slotno"
                                    value={obj.slotno}
                                    onChange={update}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid number.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <div>License plate no:</div>
                                <Form.Control
                                    type="text"
                                    placeholder="plateno"
                                    required
                                    name="licenseplate"
                                    value={obj.licenseplate}
                                    onChange={update}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid number.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Button type="button" onClick={savepost}>
                            Pay & Generate Bill
                        </Button>
                    </Form>
                </Container>
            </div>

            <p>{JSON.stringify(obj)}</p>
        </div>
    );
}

export default Free;
