import React, { useEffect } from "react";
import MovieService from "../services/MovieService";
import FilmItem from "../components/FilmItem";
import { Link } from "react-router-dom";
import { useQuery } from "../utils/util";

const Home = () => {

  let query = useQuery();

  useEffect(() => {
    if (query.get("q") == null || query.get("q") === "") {
      setWarning("Enter the movie keyword first")
    } else {
      setWarning("")
      loadData(query.get("q"));
    }
  }, [query.get("q")])

  const movieService = new MovieService();

  const [movies, setMovies] = React.useState([]);
  const [warning, setWarning] = React.useState("Enter the movie keyword first");

  const loadData = (query) => {
    movieService.getMovies(query, null, null, null)
      .then((resolve) => {
        setMovies(resolve.Search);
      })
      .catch((error) => {
        setWarning(error)
      })
  }

  return (
    <div style={styles.container}>
      <p style={{ color: 'white', textAlign: 'center' }}>
        {warning}
      </p>
      <div className="row">
        {
          warning === "" && movies != null && movies.map((movie, index) => {
            return (
              <div className="col-6 col-md-4 col-lg-3">
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