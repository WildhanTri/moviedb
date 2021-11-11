
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoPath from '../assets/horizontal-logo.svg';

const Header = (props) => {

  useEffect(() => {

  }, [])


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
            <div class="input-group" style={{ maxWidth: 512, margin: 'auto' }}>
              <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" onChange={newFields => {
                inputOnchangeHandler(newFields)
              }} />
              <button class="btn btn-primary" type="button" id="button-addon2">
                <FontAwesomeIcon icon={faSearch} />
              </button>
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
  }
}

export default Header