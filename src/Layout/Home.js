import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function deckLoad() {
      const response = await listDecks();
      setDecks(response);
    }
    deckLoad();
  }, []);

  function deleteHandler(deckId) {
    const confirmed = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (confirmed) {
      deleteDeck(deckId).then(history.push('/decks'));
    }
  }

  const list = decks.map((deck) => (
    <li key={deck.id}>
      <div>
        <h5>{deck.name}</h5>
        <small>{deck.cards.length} cards</small>
      </div>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}`} title="Edit Deck">
        View
      </Link>
      <Link to={`/decks/${deck.id}/study`} title="Study Deck">Study</Link>
      <button
        title="Delete deck"
        onClick={() => deleteHandler(deck.id)}
      >
      </button>
    </li>
  ));

  return (
    <div>
      <Link to="/decks/new" >
        <span/> Create Deck
      </Link>
      <ul>{list}</ul>
    </div>
  );
}

export default Home;