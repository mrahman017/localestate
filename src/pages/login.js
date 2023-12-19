import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/login.css";
import BackgroundImage from "../images/1.png";
import { auth } from "../firbase"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {

        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            } else {
                console.log("error with signin. user null")
            }
        });

        return () => {
            listen();
        };
    }, [navigate]);

    const [data, setData] = useState({ email: "", password: "" });
    const [fillErrors, setFillErrors] = useState({
        email: false,
        password: false
    });

    const handleChange = (name) => (event) => {
        const { value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const login = async (event) => {
        event.preventDefault();

        // Check if any field is empty
        const errors = {
            email: data.email === "",
            password: data.password === ""
        };

        setFillErrors(errors);

        // If any field is empty, prevent form submission
        if (Object.values(errors).some((error) => error)) {
            return;
        }

        // else singin with email and password

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                //const user = userCredential.user;
                console.log(userCredential)
                console.log("loged in!")
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithRedirect(auth, provider);
        getRedirectResult(auth)
            .then((result) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });

    };


    return (
        <div className="sign-in__wrapper" style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <Form className="shadow p-5 bg-white rounded" onSubmit={login}>

                <div className="h3 text-center p-4 pt-0">Sign In</div>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Email"
                        onChange={handleChange("email")}
                        isInvalid={fillErrors.email}
                    />
                </Form.Group>


                <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Password"
                        onChange={handleChange("password")}
                        isInvalid={fillErrors.password}
                    />
                </Form.Group>

                <div className="loginbtn">
                    <Button className="w-100 mt-3" variant="primary" type="submit"> Log In </Button>
                </div>

                <Button className="w-100 mt-3" variant="secondary" type="button" onClick={signInWithGoogle}> Log In with Google </Button>

                <div className="mt-2 text-center">
                    <a className="text-muted" href="/signup"> New User? Create an Account </a>
                </div>

            </Form>

        </div>
    );
};

export default Login;
