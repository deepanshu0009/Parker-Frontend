import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import {
    Home,
    Users,
    Folder,
    Calendar,
    FileText,
    PieChart,
    Menu,
    X,
    LogOut
} from 'react-feather';
import './css/sidebar.css';


function Pdash() {

    const [email, setEmail] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const ae = localStorage.getItem("a_email");
        setEmail(ae || '');
    }, []);

    const logout = () => {
        localStorage.removeItem("a_email");
        localStorage.removeItem("token");
    };

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // cleanup after component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const navItems = [
        { name: 'Dashboard', icon: Home, path: '' },
        { name: 'Profile', icon: Users, path: '/pdash/pprof' },
        { name: 'Add/Edit Parking', icon: Folder, path: '/pdash/parking' },
        { name: 'Fill Slots', icon: Calendar, path: '/pdash/bookslot' },
        { name: 'Free Slots', icon: FileText, path: '/pdash/freeslot' },
        { name: 'View Parking', icon: PieChart, path: '/pdash/viewpark' },
    ];

    const SidebarContent = () => (
        <>
            <div className="d-flex align-items-center p-4">
                <svg viewBox="0 0 24 24" className="text-white" width="30" height="30">
                    <path
                        fill="currentColor"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                    />
                </svg>
            </div>

            <div className="px-3">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`nav-item d-flex align-items-center text-white text-decoration-none p-3 rounded mb-1 ${location.pathname === item.path ? 'active' : ''
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="ms-3">{item.name}</span>
                    </Link>
                ))}
            </div>

            <div className="mt-auto">
                <div className="p-4">
                    <div className="d-flex align-items-center">
                        <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="User"
                            className="rounded-circle"
                            width="40"
                            height="40"
                        />
                        <div className="ms-3">
                            <div className="text-white font-weight-medium">Tom Cook</div>
                            <div className="text-white-50 text-sm">{email}</div>
                        </div>
                    </div>
                </div>
                <Link
                    to="/"
                    onClick={logout}
                    className="nav-item d-flex align-items-center text-white text-decoration-none p-3"
                >
                    <LogOut size={20} />
                    <span className="ms-3">Logout</span>
                </Link>
            </div>
        </>
    );

    return (
        <div className="min-vh-100 d-flex">
            {/* Desktop Sidebar */}
            <div
                className="d-none d-lg-flex flex-column"
                style={{
                    width: '280px',
                    backgroundColor: '#6366F1',
                    position: 'fixed',
                    height: '100vh',
                }}
            >
                <SidebarContent />
            </div>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`position-fixed top-0 start-0 h-100 w-100 sidebar-overlay ${isMobileMenuOpen ? 'active' : ''
                    }`}
                style={{ zIndex: 1040 }}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Sidebar */}
            <div
                className={`d-lg-none position-fixed top-0 start-0 h-100 mobile-sidebar ${isMobileMenuOpen ? 'active' : ''
                    }`}
                style={{
                    width: '280px',
                    backgroundColor: '#6366F1',
                    zIndex: 1050,
                }}
            >
                <button
                    className="btn position-absolute top-0 end-0 mt-2 me-2 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <X size={24} />
                </button>
                <SidebarContent />
            </div>

            {/* Main Content */}
            <div className="flex-grow-1" id='outlet-div' style={{
                marginLeft: width >= 992 ? '280px' : '0',
                marginTop: width >= 992 ? '0' : '60px'
            }}>
                {/* Mobile Header */}
                <div
                    className="d-lg-none position-fixed top-0 start-0 w-100 px-3 py-2"
                    style={{ backgroundColor: '#6366F1', zIndex: 1030 }}
                >
                    <div className="d-flex align-items-center">
                        <button
                            className="btn text-white p-1"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <span className="text-white ms-3 h5 mb-0">Dashboard</span>
                        <img
                            src="/placeholder.svg?height=32&width=32"
                            alt="User"
                            className="rounded-circle ms-auto"
                            width="32"
                            height="32"
                        />
                    </div>
                </div>

                <div className="p-4 pt-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Pdash;
