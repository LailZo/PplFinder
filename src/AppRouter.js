import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Favorites, Profile } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { FavoritesProvider } from './context'

const AppRouter = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default AppRouter;
