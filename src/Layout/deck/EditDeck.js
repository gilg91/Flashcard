import React, { useEffect, useState } from "react";

import { readDeck, updateDeck } from "../../utils/api";
import { useParams, useHistory } from "react-router-dom";

function EditDeck() {
  const { deckId } = useParams();
  const [formData, setFormData] = useState({});


  useEffect(() => {
    const abortController = new AbortController();
    const readingDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setFormData(() => ({ ...deckData }));
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

  const handleChange = (event) => {
    console.log(event.target.value);

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(formData).then((result) => history.push(`/decks/${result.id}`));
  };

  return (
    <div>
      <nav>
        <ol>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href={`/decks/${deckId}`}>{formData.name}</a>
          </li>
          <li>Edit Deck</li>
        </ol>
      </nav>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Deck Name:
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="description">
          Description:
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <button
          type="button"
          onClick={() => history.goBack(-1)}
        >
          Cancel
        </button>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;