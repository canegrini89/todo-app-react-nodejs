import React from "react";
import { Link } from "react-router-dom";

const ToDo = ({ todo, handleCompletedTodo, handleDeleteTodo }) => {
  const crossText = todo.isCompleted ? "cross-text" : "";
  const changeBtn = todo.isCompleted
    ? "far fa-times-circle"
    : "far fa-check-circle";

  return (
    <div className="list-group mx-auto my-2">
      <div className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <Link to={`/todos/${todo._id}`}>
            <h5 className={`mb-1 ${crossText}`}>{todo.title}</h5>
          </Link>
          <small>
            <button
              onClick={() => handleCompletedTodo(todo)}
              className="bg-btn"
            >
              <i className={changeBtn} />
            </button>
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="bg-btn"
            >
              <i className="far fa-trash-alt" />
            </button>
          </small>
        </div>
        <p className={`mb-1 ${crossText}`}>{todo.description}</p>
      </div>
    </div>
  );
};

export default ToDo;
