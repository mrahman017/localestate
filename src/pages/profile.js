import React, { useState, useEffect } from "react";
import { auth } from "../firbase"
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import PropertyGrid from '../components/propertyGrid';


function Profile() {
    
    const user = auth.currentUser;
    const firebaseuid = user.uid;

    const [favoriteProperties, setFavoriteProperties] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {

        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setFavoriteProperties(true)
            } else {
                navigate("/");
            }
        });

        return () => {
            listen();
        };
    }, [navigate]);



    const [favoriteData, setFavoriteData] = useState([]);

    const handlePropertyClick = (property) => {
        console.log('Clicked property:', property);
        //navigate to listing page
        navigate(`/listing`, { state: { propertyData: property } });
    };

    
    // const fetchFavorites = async () => {
    //     try {
    //         const response = await fetch('http://localhost:5000/getfavorites?firebaseuid='+firebaseuid);
    //         if (response.ok) {
    //             const result = await response.json();
    //             console.log(result);
    //             setFavoriteData(result.favorites);
    //         } else {
    //             throw new Error('Failed to fetch favorites');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // fetchFavorites();


    return (
        <div>

            {favoriteProperties && (
                <Container className="mt-4">
                    <h1 className='headings'>Your Favorites</h1>
                    {/* get the properties and see if any is clicked */}
                    <PropertyGrid properties={favoriteData} onPropertyClick={handlePropertyClick} />
                </Container>
            )}
        </div>
    )
}

export default Profile