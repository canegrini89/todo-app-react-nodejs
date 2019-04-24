import React from "react";
import ToDo from "./ToDo";

const ToDoList = ({ todos, handleCompletedTodo, handleDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <h2 className="text-center my-5">There is no To Do in the list !!</h2>
    );
  } else {
    return (
      <div className="my-5">
        {todos.map(todo => (
          <ToDo
            key={todo._id}
            todo={todo}
            handleCompletedTodo={handleCompletedTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </div>
    );
  }
};

export default ToDoList;
