import React from "react";
import takeMyTestIcon from "../../assets/images/takeMyTest.png";
const authenticationService = require("../../service/authentication");
export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerName: "",
      registerPassword: "",
      registerProfession: "",
      loggedIn: localStorage.getItem("takeMyTestAccessToken") != null,
      isError: false,
      errorMsg: "",
      isSuccess: false,
      successMsg: "",
    };
  }

  handleStateChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState((prevState) => {
      var curr = { ...prevState };
      curr[name] = value;
      return curr;
    });
  };

  loginUser = async (e) => {
    e.preventDefault();
    var loginUserData = {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
    };
    const res = await authenticationService.handleLogin(loginUserData);
    if (res.status == 200) {
      localStorage.setItem("takeMyTestAccessToken", res.token);
      this.setState(
        {
          loggedIn: true,
          isSuccess: true,
          isError: false,
          successMsg: res.message,
          errorMsg: "",
        },
        () => this.props.fetchUserData()
      );
    } else {
      localStorage.removeItem("takeMyTestAccessToken");
      this.setState({
        loggedIn: false,
        isSuccess: false,
        isError: true,
        successMsg: "",
        errorMsg: res.message,
      });
    }
  };

  registerUser = async (e) => {
    e.preventDefault();
    var registerUserData = {
      email: this.state.registerEmail,
      password: this.state.registerPassword,
      name: this.state.registerName,
      profession: this.state.registerProfession,
    };
    const res = await authenticationService.handleRegister(registerUserData);
    if (res.status == 200) {
      localStorage.setItem("takeMyTestAccessToken", res.token);
      this.setState(
        {
          loggedIn: true,
          isSuccess: true,
          isError: false,
          successMsg: res.message,
          errorMsg: "",
        },
        () => this.props.fetchUserData()
      );
    } else {
      localStorage.removeItem("takeMyTestAccessToken");
      this.setState({
        loggedIn: false,
        isSuccess: false,
        isError: true,
        successMsg: "",
        errorMsg: res.message,
      });
    }
  };

  logout = () => {
    localStorage.removeItem("takeMyTestAccessToken");
    this.setState(
      {
        loggedIn: false,
        isError: false,
        isSuccess: false,
        errorMsg: "",
        successMsg: "",
      },
      () => this.props.fetchUserData()
    );
  };

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={takeMyTestIcon} alt="" width="30" height="24" />
          </a>
          <a class="navbar-brand" href="#">
            TakeMyTest
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"></a>
              </li>
            </ul>
            <form class="d-flex">
              {!this.state.loggedIn ? (
                <div>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => this.logout()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        <div
          class="modal fade"
          id="loginModal"
          tabindex="-1"
          aria-labelledby="loginModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Login
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form style={{ textAlign: "left" }}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      name="loginEmail"
                      value={this.state.loginEmail}
                      onChange={(e) => this.handleStateChange(e)}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      name="loginPassword"
                      value={this.state.loginPassword}
                      onChange={(e) => this.handleStateChange(e)}
                    />
                  </div>

                  <button
                    onClick={(e) => this.loginUser(e)}
                    class="btn btn-primary"
                  >
                    Login
                  </button>
                </form>
              </div>
              <div className="modal-footer" style={{ display: "block" }}>
                {this.state.isError && (
                  <div class="alert alert-danger" role="alert">
                    {this.state.errorMsg}
                  </div>
                )}
                {this.state.isSuccess && (
                  <div class="alert alert-success" role="alert">
                    {this.state.successMsg}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="registerModal"
          tabindex="-1"
          aria-labelledby="loginModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Register
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form style={{ textAlign: "left" }}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="registerEmail"
                      value={this.state.registerEmail}
                      onChange={(e) => this.handleStateChange(e)}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      name="registerPassword"
                      value={this.state.registerPassword}
                      onChange={(e) => this.handleStateChange(e)}
                    />
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      name="registerName"
                      value={this.state.registerName}
                      onChange={(e) => this.handleStateChange(e)}
                    />
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="profession"
                      id="profession-student"
                      onClick={() =>
                        this.setState({ registerProfession: "student" })
                      }
                    />
                    <label class="form-check-label" for="profession-student">
                      I'm student
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="profession"
                      id="profession-teacher"
                      onClick={() =>
                        this.setState({ registerProfession: "teacher" })
                      }
                    />
                    <label class="form-check-label" for="profession-teacher">
                      I'm teacher
                    </label>
                  </div>
                  <br />
                  <br />
                  <button
                    onClick={(e) => this.registerUser(e)}
                    class="btn btn-primary"
                  >
                    Register
                  </button>
                </form>
              </div>
              <div className="modal-footer" style={{ display: "block" }}>
                {this.state.isError && (
                  <div class="alert alert-danger" role="alert">
                    {this.state.errorMsg}
                  </div>
                )}
                {this.state.isSuccess && (
                  <div class="alert alert-success" role="alert">
                    {this.state.successMsg}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
