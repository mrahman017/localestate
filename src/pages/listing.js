import React from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../styles/listing.css';
import temp from '../images/temp.jpg';
import { auth } from "../firbase";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState} from "react";

function Listing() {

    const user = auth.currentUser;
    const firbaseuid = user.uid;

    const [addedToFavorites, setAddedToFavorites] = useState(false);


    const location = useLocation();
    const property = location.state && location.state.propertyData;

    if (!property) {
        // Handle case when property data is not available
        return <div>No property data found</div>;
    }

    // Extract description object from the property
    const { description } = property;

    const formattedAddress = (
        <div>
            {property.location.address.line || ''}
            <br />
            {property.location.address.city || ''}, {property.location.address.state || ''}, {property.location.address.postal_code || ''}
        </div>
    );

    function convertToTitleCase(snakeCaseString) {
        return snakeCaseString
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const transformedDescription = {};
    Object.entries(description).forEach(([key, value]) => {
        if (value !== null) {
            const formattedKey = convertToTitleCase(key);
            transformedDescription[formattedKey] = value;
        }
    });

    const latlon = property.location.address.coordinate.lat + "," + property.location.address.coordinate.lon
    // console.log(latlon)
    const streetViewURL = 'https://www.google.com/maps/embed/v1/streetview?key=AIzaSyADzubPPn3igzQgwRqy2aIZZSmfBMNcuXs&location=' + latlon

    const handleAddToFavorites = async (property) => {
        if(!addedToFavorites){
            try {

                console.log(property)
                const response = await fetch('http://localhost:5000/addfavorite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firebaseuid: firbaseuid,
                        property: property, 
                    }),
                });
    
                if (response.ok) {
                    setAddedToFavorites(true);
                    console.log('Property added to favorites successfully');
                } else {
                    console.error('Failed to add property to favorites');
                }
            } catch (error) {
                console.error('Error adding property to favorites:', error);
            }
        }
        else{
            console.log("already added to favorite")
        }
        
    };

    const onClickHandle = () =>{
        handleAddToFavorites(property)
    }

    return (
        <>


            <Container>
                <h2 className='py-5'>Property Details</h2>
                <Row>
                    <Col className='col-7'>
                        <Carousel className='carousel' >
                            {(property.photos && property.photos.length > 0) ? (
                                property.photos.map((photo, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={photo.href}
                                            alt={`Property ${index + 1}`}
                                        />
                                    </Carousel.Item>
                                ))
                            ) : (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={temp}
                                        alt="Temporary"
                                    />
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </Col>
                    <Col classname="col-5">
                        <div>
                            <h3>Address</h3>
                            <h4>
                                {formattedAddress}
                            </h4>
                        </div>


                        <div className='pt-5'>
                            <h3>Price</h3>
                            <h4>
                                ${property.list_price}
                            </h4>
                        </div>

                        <div className='pt-5'>
                            <h3>Lisitng Agent</h3>
                            {property.source.agents.map((agent, index) => (
                                <div key={index}>
                                    <h4>{agent.office_name}</h4>
                                </div>
                            ))}
                        </div>


                        <div className='pt-5'>
                            <h3>Listed on</h3>
                            <h4>{property.list_date} </h4>
                        </div>

                    </Col>
                </Row>
                <Row className='pt-5 pb-5'>
                    <Col>
                        <div className="">
                            <h3>Description</h3>
                            {Object.entries(transformedDescription).map(([key, value]) => (
                                <p key={key}><strong>{key}:</strong> {value}</p>
                            ))}
                        </div>

                        <div >
                                <button className="btn btn-primary" onClick={onClickHandle}>
                                    Add to Favorites
                                </button>
                        </div>
                    </Col>

                    <Col>
                        <iframe
                            title="Google Map Street View"
                            src={streetViewURL}
                            width="900"
                            height="500"
                            frameborder="0"
                            style={{ border: 0 }}
                            referrerpolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        ></iframe>
                    </Col>

                </Row>

            </Container >

        </>

    );
}

export default Listing;
