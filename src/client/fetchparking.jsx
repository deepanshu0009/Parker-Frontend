import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FindParking() {
  const ae = localStorage.getItem("a_email");
  const navigate = useNavigate();

  // State variables
  const [validated, setValidated] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [parkingList, setParkingList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedParking, setSelectedParking] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    aemail: "",
    email: ae,
    name: "",
    number: "",
    licenseplate: "",
    model: "",
    slotno: "",
  });

  // Fetch the list of cities
  const fetchCities = async () => {
    try {
      const url = "http://localhost:2002/client/fetchcity-client-get";
      const response = await axios.get(url, {
        validateStatus: (status) => true, // Handle all status codes manually
      });

      if (response.status === 200 && response.data.status) {
        setCityList(response.data.cities);
        console.log("Cities fetched successfully:", response.data.cities);
      } else if (response.status === 404) {
        alert(response.data.message || "No cities found.");
      } else {
        alert(response.data.message || "Failed to fetch cities.");
      }
    } catch (err) {
      console.error("Error fetching cities:", err.response?.data || err.message);
      alert("An error occurred while fetching cities. Please try again.");
    }
  };

  // Fetch parking details for the selected city
  const fetchParkingDetails = async (city) => {
    try {
      const url = `http://localhost:2002/client/fetchparkingfromcity-client-get?city=${city}`;
      const response = await axios.get(url, {
        validateStatus: (status) => true, // Handle all status codes manually
      });

      if (response.status === 200) {
        setParkingList(response.data.parkingDetails);
        console.log("Parking details fetched successfully:", response.data.parkingDetails);
      } else if (response.status === 404) {
        alert(response.data.message || "No parking found for the selected city.");
      } else {
        alert(response.data.message || "Failed to fetch parking details.");
      }
    } catch (err) {
      console.error("Error fetching parking details:", err.response?.data || err.message);
      alert("An error occurred while fetching parking details. Please try again.");
    }
  };
  
  // Book a parking slot
  const bookSlot = async () => {
    try {
      const url = "http://localhost:2002/client/fillslot-post";
      const response = await axios.post(url, bookingDetails, {
        validateStatus: (status) => true, // Handle all status codes manually
      });

      if (response.status === 200 && response.data.status) {
        alert("Slot booked successfully.");
        navigate("/cdash");
      } else {
        alert(response.data.message || "Failed to book the slot.");
      }
    } catch (err) {
      console.error("Error booking slot:", err.response?.data || err.message);
      alert("An error occurred while booking the slot. Please try again.");
    }
  };

  // Handle city selection
  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setParkingList([]); // Reset parking list
    fetchParkingDetails(city); // Fetch parking details for the selected city
  };

  // Handle parking selection
  const handleParkingChange = (event) => {
    const parkingName = event.target.value;
    setSelectedParking(parkingName);
    checkSlotAvailability(parkingName); // Check slot availability
  };

  // Handle booking form input changes
  const handleBookingInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Fetch cities on component mount
  useEffect(() => {
    fetchCities();
  }, []);

  // Function to check slot availability when a parking name is selected
  const checkSlotAvailability = async (parkingName) => {
    try {
      const slotUrl = `http://localhost:2002/client/fetch-freespace-get?name=${parkingName}`;
      const slotResponse = await axios.get(slotUrl, {
        validateStatus: (status) => true, // Handle all status codes manually
      });

      if (slotResponse.status === 200 && slotResponse.data.status) {
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          aemail: parkingName,
          slotno: slotResponse.data.slot.slotno
        }));
        alert("Slot is available."+JSON.stringify(slotResponse.data));
      } else if (slotResponse.status === 404) {
        alert(slotResponse.data.message || "No slot available.");
      } else {
        alert(slotResponse.data.message || "Failed to check slot availability.");
      }
    } catch (err) {
      console.error("Error checking slot availability:", err.response?.data || err.message);
      alert("An error occurred while checking slot availability. Please try again.");
    }
  };

  // Function to fetch client details when the "Fetch" button is clicked
  const fetchClientDetails = async () => {
    try {
      const clientUrl = `http://localhost:2002/client/fetch-client-get?email=${ae}`;
      const clientResponse = await axios.get(clientUrl, {
        validateStatus: (status) => true, // Handle all status codes manually
      });

      if (clientResponse.status === 200 && clientResponse.data.user) {
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          email: ae, // Set the email from localStorage
          name: clientResponse.data.user.firstname,
          number: clientResponse.data.user.number,
          slotno: prevDetails.slotno, // Retain the slot number if already set
        }));
        setShowBookingForm(true); // Show the booking form
      } else if (clientResponse.status === 404) {
        alert(clientResponse.data.message || "Client details not found.");
      } else {
        alert(clientResponse.data.message || "Failed to fetch client details.");
      }
    } catch (err) {
      console.error("Error fetching client details:", err.response?.data || err.message);
      alert("An error occurred while fetching client details. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <br />
        <h1>Find Parking</h1>
        <br />
        <br />
      </div>
      <Container>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Select
                aria-label="Select City"
                required
                name="city"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Select</option>
                {cityList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a valid city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Parking Name</Form.Label>
              <Form.Select
                aria-label="Select Parking"
                required
                name="parkingname"
                value={selectedParking}
                onChange={handleParkingChange}
              >
                <option value="">Select</option>
                {parkingList.map((parking) => (
                  <option key={parking.email} value={parking.email}>
                    {parking.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a valid parking name.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button
            type="button"
            onClick={fetchClientDetails} // Fetch client details on button click
          >
            Fetch
          </Button>
        </Form>
      </Container>

      {showBookingForm && (
        <Container>
          <Form noValidate validated={validated}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  required
                  name="email"
                  value={bookingDetails.email}
                  readOnly // Make the field read-only
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={bookingDetails.name}
                  readOnly // Make the field read-only
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact Number"
                  required
                  name="number"
                  value={bookingDetails.number}
                  readOnly // Make the field read-only
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Slot Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Slot Number"
                  required
                  name="slotno"
                  value={bookingDetails.slotno}
                  readOnly // Make the field read-only
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>License Plate No</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="License Plate"
                  required
                  name="licenseplate"
                  value={bookingDetails.licenseplate}
                  onChange={handleBookingInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Model"
                  required
                  name="model"
                  value={bookingDetails.model}
                  onChange={handleBookingInputChange}
                />
              </Form.Group>
            </Row>

            <Button type="button" onClick={bookSlot}>
              Book
            </Button>
          </Form>
        </Container>
      )}
    </div>
  );
}

export default FindParking;
