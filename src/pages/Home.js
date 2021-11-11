import React, { useEffect } from "react";
import MovieService from "../services/MovieService";

const Home = () => {

    const movieService = new MovieService();
    useEffect(() => {
        
    }, [])

    const loadData = () => {

        // movieService.getTeamDetail()
        //     .then((resolve) => {
        //         console.log(resolve.Search);
        //     })
        //     .catch((error) => {

        //     })
    }

    return (
        <div style={styles.container}>
            
        </div>
    )
}

const styles = {
    container: {
    }
}

export default Home;