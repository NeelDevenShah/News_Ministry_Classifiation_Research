import React, { useEffect, useState } from 'react';
import { News } from './News';
import Homenavbar from './Homenavbar';

const Homepage = ({ location }) => {


    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if location exists before accessing its state
        if (location && location.state) {
            const state = location.state;

            // Check if articles are available in the state
            if (state.articles) {
                setArticles(state.articles);
                setIsLoading(false); // Set isLoading to false since we have articles
                return; // Exit early, no need to fetch data
            }
        }

        // If articles are not available in the state, fetch them
        let fetchData = async () => {
            const url = 'http://localhost:5000';
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const json = await response.json();
                setArticles(json);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setIsLoading(false);
            }

        };
        fetchData(); // Fetch data when articles are not available in state

    }, [location]);

    return (
        <>
            <Homenavbar />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <News state={articles} />
            )}
        </>
    );
};

export default Homepage;