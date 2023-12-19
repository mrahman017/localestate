import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home.js";
import SignUp from "./pages/signup.js";
import Login from "./pages/login.js";
import Contact from "./pages/contact.js";
import Navbar from "./components/navbar.js";
import Listing from "./pages/listing.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "./firbase.js"; 
import { onAuthStateChanged } from "firebase/auth";

function App() {

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/" element={<ProtectedRoute/>} /> */}
        <Route
          path="/"
          element={
            authUser ? <Home /> : <Navigate to="/login" replace={true} />
          }
          />
        <Route path="/contact" element={<Contact />} />
        <Route path="/listing" element={<Listing />} />
      </Routes>
    </Router>
  );
}

export default App;