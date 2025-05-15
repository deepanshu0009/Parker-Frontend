import React, { useState } from "react"
import { Container, Table, Card, Form, InputGroup } from "react-bootstrap"
import { Search, ArrowUp, ArrowDown, Clock, Car, User, Hash, Circle } from "lucide-react"
import "./css/viewpark.css";

// Sample data (replace this with actual data fetching logic)
const sampleData = [
  { slotno: "A1", status: "Occupied", licenseplate: "ABC123", drivername: "John Doe", time: "2023-05-20 14:30" },
  { slotno: "A2", status: "Available", licenseplate: "", drivername: "", time: "" },
  { slotno: "B1", status: "Occupied", licenseplate: "XYZ789", drivername: "Jane Smith", time: "2023-05-20 15:45" },
  { slotno: "B2", status: "Available", licenseplate: "", drivername: "", time: "" },
  { slotno: "C1", status: "Occupied", licenseplate: "DEF456", drivername: "Bob Johnson", time: "2023-05-20 16:15" },
]

function ViewPark() {
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...sampleData].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredData = sortedData.filter((slot) =>
    Object.values(slot).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Container className="py-4" style={{ maxWidth: "1200px" }}>
      <div className="text-center mb-4">
        <h2
          className="display-4 mb-4"
          style={{
            background: "linear-gradient(135deg, #6366F1, #818CF8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          View Parking Slots
        </h2>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Form>
            <InputGroup>
              <InputGroup.Text id="search-addon" className="bg-light border-end-0">
                <Search size={18} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search parking slots..."
                aria-label="Search"
                aria-describedby="search-addon"
                className="border-start-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th onClick={() => handleSort("slotno")} style={{ cursor: "pointer" }}>
                    <div className="d-flex align-items-center">
                      <Hash size={18} className="me-2" />
                      Slot No
                      {sortField === "slotno" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp size={18} className="ms-2" />
                        ) : (
                          <ArrowDown size={18} className="ms-2" />
                        ))}
                    </div>
                  </th>
                  <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                    <div className="d-flex align-items-center">
                      <Circle size={18} className="me-2" />
                      Status
                      {sortField === "status" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp size={18} className="ms-2" />
                        ) : (
                          <ArrowDown size={18} className="ms-2" />
                        ))}
                    </div>
                  </th>
                  <th onClick={() => handleSort("licenseplate")} style={{ cursor: "pointer" }}>
                    <div className="d-flex align-items-center">
                      <Car size={18} className="me-2" />
                      License Plate
                      {sortField === "licenseplate" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp size={18} className="ms-2" />
                        ) : (
                          <ArrowDown size={18} className="ms-2" />
                        ))}
                    </div>
                  </th>
                  <th onClick={() => handleSort("drivername")} style={{ cursor: "pointer" }}>
                    <div className="d-flex align-items-center">
                      <User size={18} className="me-2" />
                      Driver Name
                      {sortField === "drivername" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp size={18} className="ms-2" />
                        ) : (
                          <ArrowDown size={18} className="ms-2" />
                        ))}
                    </div>
                  </th>
                  <th onClick={() => handleSort("time")} style={{ cursor: "pointer" }}>
                    <div className="d-flex align-items-center">
                      <Clock size={18} className="me-2" />
                      Time
                      {sortField === "time" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp size={18} className="ms-2" />
                        ) : (
                          <ArrowDown size={18} className="ms-2" />
                        ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((slot, index) => (
                  <tr key={index}>
                    <td>{slot.slotno}</td>
                    <td>
                      <span className={`badge ${slot.status === "Occupied" ? "bg-danger" : "bg-success"}`}>
                        {slot.status}
                      </span>
                    </td>
                    <td>{slot.licenseplate}</td>
                    <td>{slot.drivername}</td>
                    <td>{slot.time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ViewPark;