import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../../actions/auth-actions";

import Nav from "../home/nav";

const Register = () => {
  const [dob, setDob] = useState();
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = () => {
    if (
      newUser.fullName === "" ||
      newUser.email === "" ||
      newUser.password === "" ||
      !dob
    ) {
      setError("All fields are required.");
    } else {
      newUser.dob = new Date(dob);
      registerUser(dispatch, newUser)
        .then(() => navigate("/profile"))
        .catch((e) =>
          setError("A user with this email address already exists.")
        );
    }
  };

  const renderError = () => {
    if (error.includes("exists")) {
      return (
        <>
          {error} <Link to="/login">Login here!</Link>
        </>
      );
    } else {
      return <>{error}</>;
    }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="row mt-5 mb-2">
          <div className="offset-md-3 col-6">
            <h1>Register</h1>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-3 col-6">
            <div className="form-group">
              <div
                className={`invalid-feedback ${error ? "d-inline" : "d-none"}`}
              >
                {renderError()}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="fullName"
                  placeholder="John Smith"
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullName: e.target.value })
                  }
                />
                <label htmlFor="fullName">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  placeholder="name@example.com"
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="form-floating mb-3 w-50 mx-auto">
              <input
                type="date"
                className="form-control"
                id="dob"
                min="1900-01-01"
                max={new Date().toLocaleDateString("en-ca")}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
              <label htmlFor="dob">Date of Birth</label>
            </div>
            <div className="text-center mb-4">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={register}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
