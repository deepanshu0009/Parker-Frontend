import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Alert, Spinner, Card } from "react-bootstrap";

function FetchAllClientBookedSlots() {
  const email = localStorage.getItem("a_email") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (email) {
      fetchSlots(email);
    }
    // eslint-disable-next-line
  }, [email]);

  const fetchSlots = async (clientEmail) => {
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const response = await axios.get(
        `http://localhost:2002/client/fetch-client-booked-slots?email=${encodeURIComponent(clientEmail)}`,
        { validateStatus: () => true }
      );
      if (response.status === 200 && response.data.status) {
        // alert(JSON.stringify(response.data));
        setResults(response.data.data || []);
      } else {
        setError(response.data.message || "Failed to fetch booked slots.");
      }
    } catch (err) {
      setError("An error occurred while fetching booked slots.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">Your Booked Parking Slots</h3>
      <div className="mb-3">
        <strong>Email:</strong> {email}
      </div>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {results.length > 0 ? (
        results.map((ownerBlock, idx) => (
          <Card className="mb-4" key={ownerBlock.owner || idx}>
            <Card.Header>
              <strong>Parking Owner:</strong> {ownerBlock.owner}
              {ownerBlock.slots[0] && (
                <>
                  {" | "}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      ownerBlock.slots[0].location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 8 }}
                  >
                    Parking Map
                  </a>
                </>
              )}
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Slot Number</th>
                    <th>CAR Number</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ownerBlock.slots.map((slot, sidx) => (
                    <tr key={slot._id || sidx}>
                      <td>{sidx + 1}</td>
                      <td>{slot.slotno}</td>
                      <td>{slot.licenseplate || "-"}</td>
                      <td>{slot.date || "-"}</td>
                      <td>{"Booked"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ))
      ) : (
        !loading && !error && (
          <div className="text-muted">No slots found for this client.</div>
        )
      )}
    </Container>
  );
}

export default FetchAllClientBookedSlots;