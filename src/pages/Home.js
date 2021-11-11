import React, { useEffect } from "react";
import MovieService from "../services/MovieService";
import FilmItem from "../components/FilmItem";
import { Link } from "react-router-dom";

const Home = () => {

    const movieService = new MovieService();
    useEffect(() => {
        loadData();
    }, [])

    const [movies, setMovies] = React.useState([]);
    const loadData = () => {
        movieService.getMovies("Batman", null, null, null)
            .then((resolve) => {
                setMovies(resolve.Search);
            })
            .catch((error) => {

            })
    }

    return (
        <div style={styles.container}>
            <div className="row">
                {
                    movies.map((movie, index) => {
                        return (
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                <Link to={`/movie/${movie.imdbID}`}>
                                    <FilmItem
                                        title={movie.Title}
                                        imageUrl={movie.Poster}
                                        year={movie.Year}
                                        type={movie.Type} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const styles = {
    container: {
    }
}

export default Home;