import React from "react";
import { Card, Row, Col, Button } from 'react-bootstrap';
import { ParkingMeterIcon as Parking, Clock, BarChart2, DollarSign, Users, AlertTriangle } from 'lucide-react';

function Welcome() {
  return (
    <div className="welcome-container">
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body style={{ background: 'linear-gradient(135deg, #6366F1, #818CF8)' }}>
          <Row className="align-items-center">
            <Col md={8}>
              <Card.Title as="h2" className="text-white mb-3" style={{ fontSize: '2.5rem' }}>
                Welcome to Your Parking Dashboard
              </Card.Title>
              <Card.Text className="text-white" style={{ fontSize: '1.2rem' }}>
                Manage your parking lots, view status, and control your business all in one place.
              </Card.Text>
              <Button variant="light" className="mt-3">
                Get Started
              </Button>
            </Col>
            <Col md={4} className="text-center">
              <Parking size={120} color="white" />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col lg={8}>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title style={{ fontSize: '1.5rem' }}>Manage Parking Lots</Card.Title>
                    <Parking size={24} className="text-primary" />
                  </div>
                  <Card.Text>Add, edit, and organize your parking facilities with ease.</Card.Text>
                  <Button variant="outline-primary" className="mt-auto">Manage Lots</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title style={{ fontSize: '1.5rem' }}>Real-time Slot Management</Card.Title>
                    <Clock size={24} className="text-success" />
                  </div>
                  <Card.Text>Fill and free parking slots in real-time to maximize efficiency.</Card.Text>
                  <Button variant="outline-success" className="mt-auto">View Slots</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title style={{ fontSize: '1.5rem' }}>Comprehensive Overview</Card.Title>
                    <BarChart2 size={24} className="text-info" />
                  </div>
                  <Card.Text>Get a bird's eye view of all your parking operations at a glance.</Card.Text>
                  <Button variant="outline-info" className="mt-auto">View Dashboard</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title style={{ fontSize: '1.5rem' }}>Financial Insights</Card.Title>
                    <DollarSign size={24} className="text-warning" />
                  </div>
                  <Card.Text>Track revenue, analyze trends, and optimize your pricing strategy.</Card.Text>
                  <Button variant="outline-warning" className="mt-auto">View Finances</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <Card.Title as="h4" className="mb-3">Quick Stats</Card.Title>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Total Parking Lots:</span>
                <span className="font-weight-bold">12</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Available Slots:</span>
                <span className="font-weight-bold">87</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Occupied Slots:</span>
                <span className="font-weight-bold">143</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>Today's Revenue:</span>
                <span className="font-weight-bold">$1,234.56</span>
              </div>
            </Card.Body>
          </Card>
          <Card className="mb-4 border-0 shadow-sm bg-light">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <Users size={24} className="text-primary me-2" />
                <Card.Title as="h4" className="mb-0">Recent Activity</Card.Title>
              </div>
              <ul className="list-unstyled">
                <li className="mb-2">John Doe parked in Lot A</li>
                <li className="mb-2">Jane Smith left Lot B</li>
                <li className="mb-2">Maintenance scheduled for Lot C</li>
                <li>New pricing plan activated</li>
              </ul>
            </Card.Body>
          </Card>
          <Card className="border-0 shadow-sm bg-warning text-white">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <AlertTriangle size={24} className="me-2" />
                <Card.Title as="h4" className="mb-0">Alerts</Card.Title>
              </div>
              <Card.Text>Lot D is nearing capacity. Consider redirecting traffic to Lot E.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Welcome;