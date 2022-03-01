import React, { useState } from "react";

function CardForm({
  onSubmit,
  onDone,
  deckName = "Loading..",
  initialState,
  doneButton = "Done",
}) {
  const [card, setCard] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit({ ...card });
    setCard({ front: "", back: "" });
  }

  return (
    <form onSubmit={submitHandler} >
      <fieldset>
        <legend>{deckName}: Add Card</legend>

        <div>
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            tabIndex="1"
            rows="4"
            required={true}
            placeholder="Enter question here"
            value={card.front}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            tabIndex="2"
            rows="4"
            required={true}
            placeholder="Enter answer here"
            value={card.back}
            onChange={changeHandler}
          />
        </div>

        <button
          onClick={onDone}
          tabIndex="4"
        >
          {doneButton}
        </button>
        <button type="submit" tabIndex="3">
          Save
        </button>
      </fieldset>
    </form>
  );
}

export default CardForm;