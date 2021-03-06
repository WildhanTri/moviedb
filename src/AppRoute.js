import React, { useContext } from "react";
import Home from "./pages/Home";
import Header from "./shared/header";
import ScrollToTop from "./utils/scrollToTop";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Detail from "./pages/Detail";

const AppRoute = () => {

  return (
    <Router>
      <Header />
      <div style={{ paddingTop: '128px', paddingBottom: '64px', background: '#0f0f0f', minHeight: '100vh' }}>
        <div className="container">
          <ScrollToTop />
          <Switch>
            <Route exact path="/"
              render={() => {
                return (
                  <Redirect to="/movie" />
                )
              }}
            />
            <Route exact path="/movie">
              <Home />
            </Route>
            <Route exact path="/movie/:imdbID">
              <Detail />
            </Route>
          </Switch>
        </div>
      </div>
    </Router >
  )
};

export default AppRoute;