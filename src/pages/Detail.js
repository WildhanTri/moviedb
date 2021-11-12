import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieService from "../services/MovieService";

import imdbLogo from '../assets/imdb-logo.svg';
import metacriticLogo from '../assets/metacritic-logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_SEARCH_RESULT } from "../stores/actions";

const Detail = (props) => {

  const dispatch = useDispatch()
  const history = useHistory();

  let { imdbID } = useParams();
  const [movie, setMovie] = useState({});
  const [isMovieLoading, setIsMovieLoading] = useState(true);
  var searchInput = useSelector(state => state.reducer.searchInputHeader)

  const [movieError, setMovieError] = useState("");

  const movieService = new MovieService();
  useEffect(() => {
    dispatch({
      type: SET_SEARCH_RESULT,
      payload: []
    })

    setIsMovieLoading(true)
    movieService.getMoviesDetail(imdbID)
      .then((resolve) => {
        setMovie(resolve);
        setIsMovieLoading(false);
      })
      .catch((error) => {
        setMovieError(error);
        setIsMovieLoading(false);
      })
  }, [imdbID])

  const ratingColor = (value, max) => {
    var percentage = (value * 100) / max;
    if (percentage >= 80) {
      return '#5ff083';
    } else if (percentage < 80) {
      return '#b4f05f';
    } else if (percentage < 50) {
      return '#e0da59';
    } else if (percentage < 30) {
      return '#f24949';
    }
  }

  const onClickBack = () => {
    history.push(`/movie?q=${searchInput}`)
  }

  return (
    <div>
      <div style={styles.container}>
        {
          isMovieLoading &&
          <div className="w-100 h-100 d-flex align-items-center justify-content-center pt-5 pb-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        {
          !isMovieLoading && movieError === "" &&
          <div>
            <div className="row">
              <div className="col-sm-4 text-center">
                <img src={movie.Poster} alt={movie.Title} className="w-100" style={{ cursor: 'pointer', objectFit:'cover' }} data-bs-toggle="modal" data-bs-target="#posterModal"></img>
              </div>
              <div className="col-sm-8 text-start" style={styles.movieContent}>

                <button className="btn btn-primary mb-4" onClick={() => { onClickBack() }}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span className="ms-2">Back</span>
                </button>
                <div className="mb-4" style={styles.movieHeader}>
                  <div style={styles.movieTitleWrapper}>
                    <h2 style={styles.movieTitle}>{movie.Title}</h2>
                    <h6 style={styles.movieYear}>{movie.Type} • {movie.Released} • {movie.Runtime}</h6>
                  </div>
                  <div style={styles.movieClassificationWrapper}>
                    <div style={styles.movieClassificationContentWrapper}>
                      {movie.Rated}
                    </div>
                  </div>
                </div>
                <div className="mb-4" style={styles.movieDescriptionWrapper}>
                  <div className="mb-4 text-start">
                    {
                      movie.Genre != null && movie.Genre.split(',').map((g, index) => {
                        return (
                          <span key={index} className="badge bg-secondary me-2">{g}</span>
                        )
                      })
                    }
                  </div>
                  <p className="mb-4">
                    {movie.Plot}
                  </p>
                </div>

                <div className="mb-4" style={styles.movieDescriptionWrapper}>
                  <p className="mb-1">
                    Directed By : {
                      movie.Director != null && movie.Director.split(',').map((value, index) => {
                        return (
                          <span key={index}>{(index > 0 ? '•' : '')} <a href={"https://www.google.com/search?q=" + value} target="_blank">{value}</a></span>
                        )
                      })
                    }
                  </p>
                  <p className="mb-1">
                    Writed By : {
                      movie.Writer != null && movie.Writer.split(',').map((value, index) => {
                        return (
                          <span key={index}>{(index > 0 ? ' • ' : '')} <a href={"https://www.google.com/search?q=" + value} target="_blank">{value}</a></span>
                        )
                      })
                    }
                  </p>
                  <p className="mb-1">
                    Actors : {
                      movie.Actors != null && movie.Actors.split(',').map((value, index) => {
                        return (
                          <span key={index}>{(index > 0 ? ' • ' : '')} <a href={"https://www.google.com/search?q=" + value} target="_blank">{value}</a></span>
                        )
                      })
                    }
                  </p>
                </div>

                <div className="mb-4" style={styles.movieDescriptionWrapper}>
                  <h5 className="fw-bold mb-5">Ratings</h5>
                  <div className="row">
                    <div className="col-sm-6 text-center mb-5">
                      <div className="d-flex justify-content-center mb-3">
                        <div style={Object.assign({}, styles.movieRatingWrapper, { background: ratingColor(movie.Metascore, 100) })}>
                          {movie.Metascore}
                        </div>
                      </div>
                      <div>
                        <img src={imdbLogo} alt="imdb" style={{ width: 64 }} ></img>
                      </div>
                    </div>
                    <div className="col-sm-6 text-center mb-5">
                      <div className="d-flex justify-content-center mb-3">
                        <div style={Object.assign({}, styles.movieRatingWrapper, { background: ratingColor(movie.imdbRating, 10) })}>
                          {movie.imdbRating}
                        </div>
                      </div>
                      <div>
                        <img src={metacriticLogo} alt="imdb" style={{ width: 128 }}></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id="posterModal" tabindex="-1" aria-labelledby="posterModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <img src={movie.Poster} alt={movie.Title} className="w-100" style={{objectFit:'cover'}}></img>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {
          !isMovieLoading && movieError !== "" &&
          <div className="w-100 h-100 d-flex align-items-center justify-content-center pt-5 pb-5">
            {movieError}
          </div>
        }
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: "#1C1C1C",
    color: "white",
    minHeight: "50vh"
  },
  movieContent: {
    padding: '24px 36px'
  },
  movieHeader: {
    display: 'flex',
    borderBottom: "1px solid #cccccc"
  },
  movieTitleWrapper: {
    flex: 1
  },
  movieClassificationWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  movieClassificationContentWrapper: {
    border: "4px solid white",
    color: "white",
    padding: "4px 8px",
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 4,
    marginBottom: 16
  },
  movieTitle: {
    fontWeight: "bold"
  },
  movieYear: {
    color: 'grey'
  },

  movieRatingWrapper: {
    width: 64,
    height: 64,
    background: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    fontWeight: 'bold',
    fontSize: 24
  }
}

export default Detail;