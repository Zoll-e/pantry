import React, { useEffect, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Recipes from "./components/recipes/Recipes";
import PrivateRoute from "./utils/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import RecipeForm from "./components/recipe/RecipeForm";

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
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Recipes} />
          <section>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              
              <PrivateRoute exact path="/add-recipe" component={RecipeForm} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
