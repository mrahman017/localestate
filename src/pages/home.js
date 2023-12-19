import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../styles/home.css';
import PropertyGrid from '../components/propertyGrid';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const [searchParams, setSearchParams] = useState({
        state: '',
        city: '',
        category: '',
        minPrice: '',
        maxPrice: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const savePropertyData = async (propertyData) => {

        console.log(JSON.stringify({ data: propertyData }))
        try {
            const response = await fetch('http://localhost:5000/saveproperty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: propertyData })
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message); // Log success message
                console.log("saved property data")
            } else {
                throw new Error('Failed to save properties'); // Handle error if response is not okay
            }
        } catch (error) {
            console.error(error); // Log any error that occurs
        }
    };

    const [propertyData, setPropertyData] = useState(JSON.parse(window.localStorage.getItem('storedData')));

    // Load propertyData from localStorage on component mount
    useEffect(() => {
        const storedPropertyData = window.localStorage.getItem('storedData');
        if (storedPropertyData) {

            setPropertyData(JSON.parse(storedPropertyData));
        }


    }, []);

     // Save propertyData to localStorage whenever it changes
     useEffect(() => {
        
        window.localStorage.setItem('storedData', JSON.stringify(propertyData));
        
    }, [propertyData]);


    const fetchData = async () => {

        const encodedCity = searchParams.city.replace(/ /g, "%20");
        //build the url based on the search parameter passed
        const searchParamURL = 'state_code=' + searchParams.state + '&city=' + encodedCity + '&sort=newest&offset=0&limit=42&price_min=' + searchParams.minPrice + '&price_max=' + searchParams.maxPrice + '&property_type=' + searchParams.category;

        console.log(searchParamURL)
        //make the api to US realtor and get properies based on the search parameters
        const url = 'https://us-real-estate.p.rapidapi.com/v3/for-sale?' + searchParamURL;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f91e2df8damsheeb0d06ea319365p17f880jsnde52bef01ae6',
                'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log("real estate api returned results")
            //console.log(result);


            //make api request to post the returned results to the database so that we can access later
            //if got the data post to database

            //get the resutls array
            const resultJson = JSON.parse(result);
            const propertyData = resultJson.data.home_search.results;
            console.log("passing results into the savePropertyData")

            //set the propetydata to show the grid
            if(propertyData.length > 0 && propertyData !== null){
                setPropertyData(propertyData)

                //console.log(propertyData)
                //make call
                savePropertyData(propertyData);
            }

            console.log("search result data null ")

        } catch (error) {
            console.error(error);
        }
    };


    const handleSearch = (event) => {
        event.preventDefault();
        // Implement search logic here
        console.log(searchParams);

        fetchData();
    };

    const navigate = useNavigate();
    const handlePropertyClick = (property) => {
        console.log('Clicked property:', property);
        //navigate to listing page
        navigate(`/listing`, { state: { propertyData: property } });
    };

    return (
        <section className="search section" aria-label="search">
            <Container>

                <div className="search-bg">
                    <div className="search-content">
                        <h1 className="h1 search-title" style={{ color: 'white' }}>
                            DISCOVER YOUR DREAM HOME IN <span className="nyc"> NYC </span> WITH US!
                        </h1>
                    </div>
                </div>

                <div className="search-form-wrapper">

                    <Form className="search-form" onSubmit={handleSearch} >
                        <Form.Group className="mb-3" controlId="state">
                            <Form.Label>State:</Form.Label>
                            <Form.Control
                                type="search"
                                name="state"
                                placeholder="State"
                                required
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>City:</Form.Label>
                            <Form.Control
                                type="search"
                                name="city"
                                placeholder="City"
                                required
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="category">Categories:</Form.Label>
                            <Form.Select name="category" onChange={handleInputChange}>
                                <option value="multi_family">Multi Family</option>
                                <option value="single_family">Single Family</option>
                                <option value="mobile">Mobile</option>
                                <option value="land">Land</option>
                                <option value="farm">Farm</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="minPrice">
                            <Form.Label>Min Price:</Form.Label>

                            <Form.Control
                                type="search"
                                name="minPrice"
                                placeholder="ex: 280000"
                                required
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="maxPrice">
                            <Form.Label>Max Price:</Form.Label>
                            <Form.Control
                                type="search"
                                name="maxPrice"
                                placeholder="ex: 590000"
                                required
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button type="submit" className="btn btn-primary">Search</Button>

                    </Form>
                </div>

            </Container>

            
            {propertyData.length >0 && (
                <Container className="mt-4">
                    <h1 className='headings'>Your Search</h1>
                    {/* get the properties and see if any is clicked */}
                    <PropertyGrid properties={propertyData} onPropertyClick={handlePropertyClick}/>
                </Container>
            )}



        </section>
    );

};


export default HomePage;
