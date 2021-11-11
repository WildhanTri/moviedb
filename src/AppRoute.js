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

const AppRoute = () => {

  return (
    <Router>
      <Header />
      <div style={{ paddingTop: '64px', paddingBottom: '64px', background: '#0f0f0f', minHeight: '100vh' }}>
        <ScrollToTop />
        <Switch>
          <Route exact path="/"
            render={() => {
              return (
                <Redirect to="/home" />
              )
            }}
          />
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router >
  )
};

export default AppRoute;