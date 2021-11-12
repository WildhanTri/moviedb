import React, { useEffect } from "react";
import MovieService from "../services/MovieService";
import FilmItem from "../components/FilmItem";
import { Link } from "react-router-dom";
import { useQuery } from "../utils/util";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCH_PAGE } from "../stores/actions";

const Home = () => {

  let query = useQuery();
  const dispatch = useDispatch()

  const movieService = new MovieService();

  const [movies, setMovies] = React.useState([]);
  const [totalResult, setTotalResult] = React.useState(0)
  const [warning, setWarning] = React.useState("Enter the movie keyword first");
  const [isLoadingMovie, setIsLoadingMovie] = React.useState(false)

  const page = useSelector(state => state.reducer.searchPage)

  useEffect(() => {
    if (query.get("q") == null || query.get("q") === "") {
      setWarning("Enter the movie keyword first")
    } else {
      setWarning("")
      loadData(query.get("q"));
    }
  }, [query.get("q"), page])

  window.onscroll = () => {
    console.log(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight)
    console.log(window.innerHeight + document.documentElement.scrollTop)
    console.log(document.documentElement.offsetHeight)
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      if (!isLoadingMovie) {
        dispatch({
          type: SET_SEARCH_PAGE,
          payload: page + 1
        })
        loadData(query.get("q"))
      }
    }
  }


  const loadData = (query) => {
    setIsLoadingMovie(true)
    movieService.getMovies(query, null, null, page)
      .then((resolve) => {
        console.log(page)
        console.log(resolve.Search)
        setIsLoadingMovie(false)
        if (page > 1) {
          setMovies([...movies, ...resolve.Search]);
        } else {
          setMovies(resolve.Search);
        }
        setTotalResult(resolve.totalResults)

      })
      .catch((error) => {
        setWarning(error)
        setIsLoadingMovie(false)
      })
  }

  return (
    <div style={styles.container}>
      <p style={{ color: 'white', textAlign: 'center' }}>
        {warning}
      </p>

      {
        query.get("q") != null && query.get("q") != "" &&
        <p style={{ color: 'white', }}>
          Hasil pencarian "<b>{query.get("q")}</b>" • Total result {totalResult == null ? 0 : totalResult}
        </p>
      }
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