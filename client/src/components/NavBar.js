import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({
  handleSubmitSearch,
  handleSearchChange,
  handleSelectSearch,
  value,
  searchText
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          ToDo App
        </NavLink>
        <select
          className="custom-select ml-auto"
          value={value}
          onChange={handleSelectSearch}
        >
          <option>Choose...</option>
          <option value="id">ID</option>
          <option value="title">TITLE</option>
          <option value="isCompleted">COMPLETED</option>
        </select>
        <form
          className="form-inline my-2 my-lg-0 ml-auto"
          onSubmit={handleSubmitSearch}
        >
          <input
            onChange={handleSearchChange}
            value={searchText}
            name="searchText"
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search by ID, title or status"
            aria-label="Search"
          />
          >
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item mx-2">
            <NavLink className="nav-link" to="/new-todo">
              Add To Do
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <button
              className="btn btn-outline-danger"
              onClick={() => (window.location = "/")}
            >
              Go to List
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
