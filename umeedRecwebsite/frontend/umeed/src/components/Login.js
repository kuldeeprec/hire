import React, { Component } from "react";
import "./Login.css";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login, clearAuthState } from "../actions/auth";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleEmailChange = (e) => {
    this.setState({
      userId: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("this.state", this.state);
    const { userId, password } = this.state;
    if (userId && password) {
      this.props.dispatch(login(userId, password));
    }
  };
  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;

    if (isLoggedin) {
      return <Navigate to="/student-info" />;
    }
    return (
      <div className="body">
        {/* <img src="pexels-miguel-á-padriñán-2539.jpg" /> */}
        <div className="cont1">
          <h2>Student Login</h2>
          <center>
            <form action="" method="post">
              <div className="imgcontainer">
                <img
                  src={process.env.PUBLIC_URL + `/assets/img/u-logo.jpeg`}
                  alt="Umeed"
                  className="avatar"
                />
              </div>
              <div className="container">
                <label for="uname">
                  <b>RollNO</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="uname"
                  required
                  onChange={this.handleEmailChange}
                  value={this.state.userId}
                />
                <label for="psw">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="psw"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                  required
                />

                {/* <button type="submit">Login</button> */}
                {inProgress ? (
                  <button onClick={this.handleFormSubmit} disabled={inProgress}>
                    Logging in...
                  </button>
                ) : (
                  <button onClick={this.handleFormSubmit} disabled={inProgress}>
                    Log In
                  </button>
                )}
                {/* <label>
                  <input type="checkbox" checked="checked" name="remember" />{" "}
                  Remember me
                </label> */}
              </div>
              <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
                <button type="button" className="cancelbtn">
                  Cancel
                </button>
                <span className="psw">
                  Forgot <a href="#">password?</a>
                </span>
              </div>
            </form>
          </center>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
