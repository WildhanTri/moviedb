
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce/lib";
import logoPath from '../assets/horizontal-logo.svg';
import SearchItem from "../components/SearchItem";
import MovieService from "../services/MovieService";
import { SET_SEARCH_HEADER, SET_SEARCH_RESULT } from "../stores/actions";

const Header = (props) => {

  const dispatch = useDispatch()
  const history = useHistory();

  const movieService = new MovieService();

  var searchInput = useSelector(state => state.reducer.searchInputHeader)
  var searchMoviesResult = useSelector(state => state.reducer.searchMoviesResult)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (searchInput === "") {
      changeSearchResult([])
    } else {
      loadData();
    }
  }, [searchInput])

  const loadData = () => {
    setIsSearching(true)
    movieService.getMovies(searchInput, null, null, null)
      .then((resolve) => {
        changeSearchResult(resolve.Search)
        setIsSearching(false)
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
    dispatch({
      type: SET_SEARCH_HEADER,
      payload: value
    })
  }

  const changeSearchResult = (value) => {
    dispatch({
      type: SET_SEARCH_RESULT,
      payload: value
    })
  }

  const onClickSearch = () => {
    changeSearchResult([])
    history.push(`/movie?q=${searchInput}`)
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
              <form onSubmit={(e) => { e.preventDefault(); onClickSearch() }}>
                <div class="input-group w-100">
                  <input type="text" class="form-control" placeholder="Search" aria-label="Search" id="searchInput" autoComplete="off"
                    onChange={newFields => {
                      inputOnchangeHandler(newFields)
                    }} />
                  <button type="submit" class="btn btn-primary" id="button-addon2">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </form>
              {
                searchMoviesResult != null && searchMoviesResult.length > 0 &&

                <div className="position-absolute w-100">
                  <div style={{ overflow: 'auto', maxHeight: 456, padding: '8px 0px', background: '#232323' }}>
                    {
                      isSearching &&
                      <div className="w-100 h-100 d-flex align-items-start justify-content-center pt-5 pb-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    }
                    {
                      searchMoviesResult != null && searchMoviesResult.map((movie, index) => {
                        return (
                          <Link to={`/movie/${movie.imdbID}`} key={index} style={{ textDecoration: 'none' }}>
                            <SearchItem title={movie.Title} type={movie.Type} year={movie.Year} imageUrl={movie.Poster} />
                          </Link>
                        )
                      })
                    }
                  </div>
                  <div className="w-100 text-end">
                    <button className="btn" style={{ color: 'white' }} onClick={() => {
                      changeSearchResult([])
                    }}>
                      <FontAwesomeIcon icon={faTimes} />
                      <span className="ms-2">Close</span>
                    </button>
                  </div>
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