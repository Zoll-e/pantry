import React, { useEffect, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Recipes from "./components/recipes/Recipes";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/layout/navbar/main/Navbar";
import RecipeForm from "./components/recipe/recipeform/RecipeForm";
import RecipeShow from "./components/recipe/recipeshow/RecipeShow";


// Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Recipes} />
              <Route exact path="/recipe/:id" component={RecipeShow} />
              <PrivateRoute exact path="/add-recipe" component={RecipeForm} />
            </Switch>
          </Fragment>
        </Router>
    </Provider>
  );
};

export default App;
