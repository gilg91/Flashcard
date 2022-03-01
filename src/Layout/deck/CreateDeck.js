import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const initialState = {
    name: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const history = useHistory();

  const handleSubmit = (event) => {
    console.log("formData", formData)
    event.preventDefault();
    createDeck(formData)
//       .then((result) => history.push(`/decks/${result.id}`));
//       .then(console.log("hiiiii"));
    .then(res => console.log(res));
  };

  return (
    <div>
      <nav>
        <ol>
          <li><a href="/">Home</a></li>
          <li>Create Deck</li>
        </ol>
      </nav>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Deck Name:
          <input type="text" name="name" id="name" onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="description">
          Description:
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
          />
        </label>
        <br />
        <button
          type="button"
          onClick={() => history.push("/")}
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

export default CreateDeck;