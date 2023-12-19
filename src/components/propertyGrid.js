import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import temp from "../images/temp.jpg"

const PropertyGrid = ({ properties, onPropertyClick }) => {


    const handleClick = (property) => {
        // Handle the click event and pass the property to the parent component
        onPropertyClick(property);
    };
    
    return (
        <Container>
            <Row xs={1} sm={2} md={3} lg={4}>
                {properties.map((property, index) => (
                    <Col key={index}>
                            <Card onClick={() => handleClick(property)}  className="mb-4" key={property.property_id} style={{ width: '18rem', cursor: 'pointer' }}>
                                {property.primary_photo && property.primary_photo.href ? (
                                    <Card.Img
                                        src={property.primary_photo.href}
                                        alt="Property"
                                        style={{ objectFit: 'cover', width: '100%', height: '200px' }} />
                                ) : (
                                    <Card.Img src={temp} alt="Temporary" />
                                )}
                                <Card.Body className='backgroundcolor'>
                                    <Card.Title>{property.list_price ? `$${property.list_price}` : ''}</Card.Title>
                                    <Card.Text>
                                        {property.location.address.line &&
                                            `${property.location.address.line}, `}
                                        {property.location.address.city &&
                                            `${property.location.address.city}, `}
                                        {property.location.address.state &&
                                            `${property.location.address.state}, `}
                                        {property.location.address.postal_code &&
                                            property.location.address.postal_code}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PropertyGrid;
