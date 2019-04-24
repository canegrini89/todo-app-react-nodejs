import React, { Component } from "react";
import { format } from "timeago.js";
import axios from "axios";

export class TodoForm extends Component {
  state = {
    todo: {}
  };

  async componentDidMount() {
    const { data: todo } = await axios.get(
      `http://localhost:5000/todos/${this.props.match.params.id}`
    );

    this.setState({ todo });
  }

  render() {
    return (
      <div className="card mx-auto " style={{ maxWidth: 540 }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={"http://localhost:5000/" + this.state.todo.path}
              className="card-img"
              alt="img-example"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{this.state.todo.title}</h5>
              <p className="card-text">{this.state.todo.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  {format(this.state.todo.created_at)}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoForm;
