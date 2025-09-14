
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Jobs from './pages/Jobs.jsx';
import UploadResume from './pages/UploadResume.jsx';
import MyApplications from './pages/MyApplications.jsx';
import {  useAuth } from './context/AuthContext.jsx';
import {
  FaBriefcase,
  FaFileUpload,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { token, logout } = useAuth();
    // Common inline style for nav links
  const navLinkStyle = {
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "1.2rem",
    transition: "all 0.3s ease-in-out",
  };

    const hoverEffect = (e, isHover) => {
    if (isHover) {
      e.target.style.color = "#0dcaf0";
      e.target.style.transform = "translateY(-2px)";
    } else {
      e.target.style.color = "white";
      e.target.style.transform = "translateY(0)";
    }
  };
  return (
    <>
 <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="mb-4 shadow-lg"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            letterSpacing: "2px",
            color: "white",
          }}
        >
          <span style={{ color: "#0dcaf0" }}>JOB</span>&nbsp;FINDER
        </Navbar.Brand>

        {/* Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapse */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Centered Nav Links */}
          <Nav className="mx-auto" style={{ gap: "2rem" }}>
            <Nav.Link
              as={Link}
              to="/"
              style={navLinkStyle}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
            >
              <FaBriefcase /> Jobs
            </Nav.Link>

            {token && (
              <Nav.Link
                as={Link}
                to="/applications"
                style={navLinkStyle}
                onMouseEnter={(e) => hoverEffect(e, true)}
                onMouseLeave={(e) => hoverEffect(e, false)}
              >
                <FaClipboardList /> My Applications
              </Nav.Link>
            )}

            {token && (
              <Nav.Link
                as={Link}
                to="/upload"
                style={navLinkStyle}
                onMouseEnter={(e) => hoverEffect(e, true)}
                onMouseLeave={(e) => hoverEffect(e, false)}
              >
                <FaFileUpload /> Upload Resume
              </Nav.Link>
            )}
          </Nav>

          {/* Right Side Auth */}
          <Nav style={{ gap: "1.5rem" }}>
            {!token ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={navLinkStyle}
                  onMouseEnter={(e) => hoverEffect(e, true)}
                  onMouseLeave={(e) => hoverEffect(e, false)}
                >
                  <FaSignInAlt /> Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  style={navLinkStyle}
                  onMouseEnter={(e) => hoverEffect(e, true)}
                  onMouseLeave={(e) => hoverEffect(e, false)}
                >
                  <FaUserPlus /> Register
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                onClick={logout}
                style={navLinkStyle}
                onMouseEnter={(e) => hoverEffect(e, true)}
                onMouseLeave={(e) => hoverEffect(e, false)}
              >
                <FaSignOutAlt /> Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

             <Container className="mb-5">
        <Routes>
            <Route path="/" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
           <Route path="/upload" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
             <Route path="/applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
        </Routes>
      </Container>
    </>
  );
}
