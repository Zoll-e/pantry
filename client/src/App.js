import React, { useEffect, Fragment } from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Alert from "./components/layout/Alert";
import Recipes from "./components/recipes/Recipes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Fragment>
          <Route exact path="/" component={Landing} />
          <section>
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/recipes" component={Recipes} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
