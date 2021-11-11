
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoPath from '../assets/horizontal-logo.svg';
import SearchItem from "../components/SearchItem";
import MovieService from "../services/MovieService";
import { SET_SEARCH_HEADER, SET_SEARCH_RESULT } from "../stores/actions";

const Header = (props) => {

  const dispatch = useDispatch()

  const movieService = new MovieService();
  var searchInput = useSelector(state => state.reducer.searchInputHeader)
  var searchMoviesResult = useSelector(state => state.reducer.searchMoviesResult)

  useEffect(() => {
    console.log(searchInput)
    if (searchInput === "") {
      changeSearchResult([])
    } else {
      loadData();
    }
  }, [searchInput])

  const loadData = () => {
    console.log(searchInput)
    movieService.getMovies(searchInput, null, null, null)
      .then((resolve) => {
        changeSearchResult(resolve.Search)
      })
      .catch((error) => {

      })
  }

  const inputOnchangeHandler = (event) => {
    switch (event.target.id) {
      case "searchInput":
        changeSearchInput(event.target.value)
        break
      default:
        break
    }
  }

  const changeSearchInput = (value) => {
    console.log(value)
    dispatch({
      type: SET_SEARCH_HEADER,
      payload: value
    })
  }

  const changeSearchResult = (value) => {
    console.log(value)
    dispatch({
      type: SET_SEARCH_RESULT,
      payload: value
    })
  }

  return (
    <div style={style.container}>
      <div className="w-100">
        <div className="row">
          <div className="col-sm-3 col-md-2 col-lg-1 text-center my-2">
            <Link to="/">
              <img src={logoPath} style={style.logo} alt={"logo"} />
            </Link>
          </div>
          <div className="col-sm-9 col-md-10 col-lg-11 text-center my-2">
            <div className="position-relative" style={{ maxWidth: 512, margin: 'auto' }}>
              <div class="input-group w-100">
                <input type="text" class="form-control" placeholder="Search" aria-label="Search" id="searchInput"
                  onChange={newFields => {
                    inputOnchangeHandler(newFields)
                  }} />
                <button class="btn btn-primary" type="button" id="button-addon2">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>

              {
                searchMoviesResult != null && searchMoviesResult.length > 0 &&

                <div className="position-absolute w-100" style={{ overflow: 'auto', height: 456, padding: '8px 0px', background: '#232323' }}>
                  {
                    searchMoviesResult != null && searchMoviesResult.map((movie, index) => {
                      return (
                        <Link to={`/movie/${movie.imdbID}`} forceRefresh={true} key={index} style={{ textDecoration: 'none' }}>
                          <SearchItem title={movie.Title} type={movie.Type} year={movie.Year} imageUrl={movie.Poster} />
                        </Link>
                      )
                    })
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const style = {
  container: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    background: '#000000',
    padding: '8px 16px',
    boxShadow: '0px 8px 80px rgba(0, 0, 0, 0.06)',
    zIndex: '4'
  },
  logo: {
    width: '128px',
  },
}

export default Header