import React, { Component } from "react";
import axios from "axios";
import defaultImage from "../assets/default-img.jpg";

class AddToDoForm extends Component {
  state = {
    title: "",
    description: "",
    image: defaultImage,
    imageFile: null
  };

  handleSubmit = e => {
    e.preventDefault();
    let imageFormObj = new FormData();

    imageFormObj.append("image", this.state.imageFile);
    imageFormObj.append("title", this.state.title);
    imageFormObj.append("description", this.state.description);

    axios.post("http://localhost:5000/todos/upload", imageFormObj).then(res => {
      console.log(res.statusText);
    });

    this.props.history.push("/");

    window.location = "/";
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileUpload = e => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
      imageFile: e.target.files[0]
    });
  };

  render() {
    return (
      <form className="card mx-auto">
        <div className="card-body">
          <h3 className="center">New To Do</h3>
          <div className="form-group my-3">
            <label htmlFor="title">New To Do</label>
            <input
              onChange={this.handleChange}
              value={this.state.title}
              name="title"
              type="text"
              id="title"
              className="form-control"
              placeholder="To Do title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">To Do description</label>
            <textarea
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              className="form-control"
              id="description"
              rows="3"
            />
          </div>
          <div className="form-group my-3">
            <input
              onChange={this.handleFileUpload}
              name="image"
              type="file"
              id="image"
            />
            <img
              src={this.state.image}
              className="img-fluid my-2"
              alt="upload-img"
            />
          </div>
          <button
            onClick={this.handleSubmit}
            className="btn btn-primary btn-block my-2"
          >
            Put it on the list
          </button>
        </div>
      </form>
    );
  }
}

export default AddToDoForm;
