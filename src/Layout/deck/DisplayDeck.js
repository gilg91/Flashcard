import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, Route } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api";
import CardList from "../card/CardList";

function DisplayDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "Loading...", cards: [] });

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteDeck(id);
      history.go(0);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const readingDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(() => ({ ...deckData }));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    };

    readingDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  return (
    <div>
      <nav>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {deck.name}
          </li>
        </ol>
      </nav>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}/edit`}>
        <button
          type="button"
          onClick={() => history.push(`/decks/${deck.id}`)}
        >
          Edit
        </button>
      </Link>
      <Link to={`/decks/${deck.id}/study`}>
        <button type="button">
          Study
        </button>
      </Link>
      <Link to={`/decks/${deck.id}/cards/new`}>
        <button type="button">
          + Add Card
        </button>
      </Link>
      <button
        type="delete"
        onClick={() => handleDelete(deck.id)}
      >
        Delete
      </button>
      <h2>Cards</h2>
      <Route>
        <CardList cards={deck.cards} />
      </Route>
    </div>
  );
}
export default DisplayDeck;