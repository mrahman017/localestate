import React, { useState, useEffect } from "react";
import { auth } from "../firbase";
import { signOut } from "firebase/auth";
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function AuthButton() {

  const [authUser, setAuthUser] = useState(null);
  const navigate =useNavigate();
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
  }, [navigate]);


  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  
  if (authUser === null) {
    return (
        <>
          <Nav.Link className="font-weight-bold px-4" href="/login">Login</Nav.Link>
        </>
        
    );
  }

  return (
    <>
        <Nav.Link className="font-weight-bold px-4" onClick={userSignOut}>Logout</Nav.Link>
    </>
  );

  
};

export default AuthButton;