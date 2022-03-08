import React from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function CardList({ cards = [] }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteCard(id);
      history.go(0);
      history.push("/");
    }
  };

  return (
    <div>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <div>
              <div>{card.front}</div>
              {card.back}
            </div>
            <div role="group">
              <Link to={`${url}/cards/${card.id}/edit`}>
                <button type="button" >
                  Edit
                </button>
              </Link>
              <button
                type="delete"
                onClick={() => handleDelete(card.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;