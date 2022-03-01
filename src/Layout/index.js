import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./deck/CreateDeck";
import DisplayDeck from "./deck/DisplayDeck";
import EditDeck from "./deck/EditDeck";
import AddCard from "./card/AddCard";
import EditCard from "./card/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route exact={true} path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact={true} path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <DisplayDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
