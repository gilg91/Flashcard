import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

function CardCreate() {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();

  const history = useHistory();

  useEffect(() => {
    async function deckRead() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    deckRead();
  }, [deckId]);

  function submitHandler(card) {
    createCard(deckId, card);
  }

  function doneHandler() {
    history.push(`/decks/${deckId}`);
  }
  return (
    <div>
      <nav>
        <ol>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to={`/decks/${deckId}`}>
              {deck.name}
            </Link>
          </li>
          <li> Add Card </li>
        </ol>
      </nav>
      <CardForm
        deckName={deck.name}
        initialState={deck}
        onSubmit={submitHandler}
        onDone={doneHandler}
      />
    </div>
  );
}

export default CardCreate;