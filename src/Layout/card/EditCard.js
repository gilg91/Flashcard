import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

function CardEdit() {
  const [card, setCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState({ cards: [] });

  const history = useHistory();
  const { deckId, cardId } = useParams();

  useEffect(() => {
    async function deckRead() {
      const deckResponse = await readDeck(deckId);
      setDeck(deckResponse);
      const cardResponse = await readCard(cardId);
      setCard(cardResponse);
    }
    deckRead();
  }, [deckId, cardId]);

  async function submitHandler(card) {
    await updateCard(card);
    doneHandler(card);
  }

  function doneHandler() {
    history.push(`/decks/${deck.id}`);
  }

  const cardFormEdit = card.id ? (
    <CardForm
      onSubmit={submitHandler}
      onDone={doneHandler}
      deckName={deck.name}
      initialState={card}
      doneButton="Cancel"
    />
  ) : (
    <p>Loading...</p>
  );
  return (
    <div>
      <nav>
        <ol>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>
          <li>Edit Card {cardId}</li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      {cardFormEdit}
    </div>
  );
}

export default CardEdit;