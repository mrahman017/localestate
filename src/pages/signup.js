import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/signup.css";
import BackgroundImage from "../images/1.png";
import { auth } from "../firbase";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const Signup = () => {

  //const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        console.log("error with signup method. user null")
      }
    });

    return () => {
      listen();
    };
  }, [navigate]);


  const [data, setData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [fillErrors, setFillErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  });

  const handleChange = (name) => (event) => {
    const { value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const signup = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    const errors = {
      firstName: data.firstName === "",
      lastName: data.lastName === "",
      email: data.email === "",
      password: data.password === ""
    };

    setFillErrors(errors);

    // If any field is empty, prevent form submission
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        console.log("signed up!")

        updateProfile(auth.currentUser, {
          displayName: data.firstName + " " + data.lastName
        }).then(() => {
          console.log("updated display name")

        }).catch((error) => {
          // An error occurred
          // ...
          console.log(error)
        });
      })
      .catch((error) => {
        console.log(error)
      });

  };


  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="sign-up__wrapper" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <Form className="shadow p-5 bg-white rounded" onSubmit={signup}>
        <div className="h3 text-center p-4 pt-0">Sign Up</div>

        <Form.Group className="mb-3" controlId="FirstName">
          <Form.Control
            type="text"
            name="firstName"
            value={data.firstName}
            placeholder="First Name"
            onChange={handleChange("firstName")}
            isInvalid={fillErrors.firstName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="LastName">
          <Form.Control
            type="text"
            name="lastName"
            value={data.lastName}
            placeholder="Last Name"
            onChange={handleChange("lastName")}
            isInvalid={fillErrors.lastName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Control
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={handleChange("email")}
            isInvalid={fillErrors.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Control
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={handleChange("password")}
            isInvalid={fillErrors.password}
          />
        </Form.Group>

        <div className="signupbtn">
          <Button className="w-100 mt-3" variant="primary" type="submit">
            Sign Up
          </Button>
        </div>

        <Button className="w-100 mt-3" variant="secondary" type="button" onClick={signInWithGoogle}>
          Sign Up with Google
        </Button>

        <div className="mt-2 text-center">
          <a className="text-muted" href="/login">
            Already have an Account? Login
          </a>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
