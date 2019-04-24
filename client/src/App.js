import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ToDoList from "./components/ToDoList";
import AddToDoForm from "./components/AddToDoForm";
import TodoForm from "./components/TodoForm";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

class App extends Component {
  state = {
    todos: [],
    searchText: "",
    value: ""
  };

  async componentDidMount() {
    const { data: todos } = await axios.get("http://localhost:5000/todos");

    this.setState({ todos });
  }

  handleCompletedTodo = async todo => {
    const todos = [...this.state.todos];
    const index = todos.indexOf(todo);
    todos[index] = { ...todos[index] };
    todos[index].isCompleted = !todos[index].isCompleted;
    this.setState({ todos });
  };

  handleDeleteTodo = async id => {
    const originalTodos = this.state.todos;

    const todos = this.state.todos.filter(todo => todo._id !== id);
    this.setState({ todos });

    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
    } catch (error) {
      alert("Something failed while deleting a todo!");
      this.setState({ todos: originalTodos });
    }
  };

  handleSelectSearch = e => {
    this.setState({ value: e.target.value });
  };

  handleSearchChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitSearch = async e => {
    e.preventDefault();

    const { data: todos } = await axios.get(
      `http://localhost:5000/todos?${this.state.value}=${this.state.searchText}`
    );
    this.setState({ todos, value: "", searchText: "" });
  };

  render() {
    const { todos, value, searchText } = this.state;
    return (
      <React.Fragment>
        <NavBar
          handleSubmitSearch={this.handleSubmitSearch}
          handleSearchChange={this.handleSearchChange}
          handleSelectSearch={this.handleSelectSearch}
          value={value}
          searchText={searchText}
        />
        <div className="container">
          <Switch>
            <Route path="/todos/:id" component={TodoForm} />
            <Route
              path="/"
              exact
              component={props => (
                <ToDoList
                  todos={todos}
                  {...props}
                  handleCompletedTodo={this.handleCompletedTodo}
                  handleDeleteTodo={this.handleDeleteTodo}
                />
              )}
            />
            <Route path="/new-todo" component={AddToDoForm} />
            <Redirect to="/" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
