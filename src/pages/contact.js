import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/contact.css';
import BackgroundImage from "../images/1.png";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: false,
        email: false,
        message: false,
    });


    const [showToast, setShowToast] = useState(false); // State to control toast visibility

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        const errors = {
            name: formData.name === '',
            email: formData.email === '',
            message: formData.message === '',
        };

        setFormErrors(errors);

        // If any field is empty, prevent form submission
        if (Object.values(errors).some((error) => error)) {
            return;
        }

        // else process the form
        console.log(formData);

        try {
            const response = await fetch('http://localhost:5000/submitcontact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                setShowToast(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                console.error('Failed to submit form data');
                // Handle the response based on its status code or content
                // For example, you can parse the response JSON and show an error message
                //const errorData = await response.json();
                // Handle the error data as needed
            }
        } catch (error) {
            console.error('An error occurred while submitting the form:', error);
            // Handle the error or display a generic error message to the user
        }

        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (

        <div className="contact__wrapper" style={{ backgroundImage: `url(${BackgroundImage})` }}>

            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
                <Toast
                    onClose={() => setShowToast(false)} show={showToast}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Submitted!!</strong>
                    </Toast.Header>
                    <Toast.Body>We will be in touch with you soon!</Toast.Body>
                </Toast>
            </ToastContainer>

            <Form onSubmit={handleSubmit} className="shadow p-5 bg-white rounded">
                <div className="h3 text-center p-4 pt-0">Contact Us</div>

                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={formErrors.name}
                        placeholder="Enter your name"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={formErrors.email}
                        placeholder="Enter your email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        isInvalid={formErrors.name}
                        placeholder="Enter your message"
                    />
                </Form.Group>

                <div className="submit-button">
                    <Button type="submit"> Send Message </Button>
                </div>
            </Form>
        </div>
    );
}

export default Contact;