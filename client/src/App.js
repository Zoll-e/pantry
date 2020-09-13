import React, { useEffect, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Recipes from "./components/recipes/Recipes";
import PrivateRoute from "./utils/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import RecipeForm from "./components/recipe/recipeform/RecipeForm";
import RecipeShow from "./components/recipe/RecipeShow";


const App = () => {
  if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}
  useEffect(() => {
    store.dispatch(loadUser());
  },);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Recipes} />
          <section>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/recipe/:id" component={RecipeShow} />

              <PrivateRoute exact path="profile" component={RecipeForm}/>
              <PrivateRoute exact path="/add-recipe" component={RecipeForm} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
