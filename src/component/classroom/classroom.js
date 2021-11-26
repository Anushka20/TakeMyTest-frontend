import React from "react";
import SingleClassroom from "../singleClassroom/singleClassroom";
import "./classroom.css";
const classroomService = require("../../service/classroom");

export default class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUserData: props.currUserData,
      createClassName: "",
      joinClassId: "",
      isError: false,
      errorMsg: "",
      isSuccess: false,
      successMsg: "",
      classroomActive: null,
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

  static getDerivedStateFromProps(props) {
    return { currUserData: props.currUserData };
  }

  createClassroom = async (e) => {
    e.preventDefault();
    var classData = {
      name: this.state.createClassName,
    };
    const res = await classroomService.createClassRoom(classData);
    if (res.status == 200) {
      this.setState(
        {
          isSuccess: true,
          successMsg: res.message,
          isError: false,
          errorMsg: "",
        },
        () => this.props.fetchUserData()
      );
    } else {
      this.setState({
        isSuccess: false,
        successMsg: "",
        isError: true,
        errorMsg: res.message,
      });
    }
  };

  joinClassroom = async (e) => {
    e.preventDefault();
    var classData = {
      id: this.state.joinClassId,
    };
    const res = await classroomService.joinClassRoom(classData);
    if (res.status == 200) {
      this.setState(
        {
          isSuccess: true,
          successMsg: res.message,
          isError: false,
          errorMsg: "",
        },
        () => this.props.fetchUserData()
      );
    } else {
      this.setState({
        isSuccess: false,
        successMsg: "",
        isError: true,
        errorMsg: res.message,
      });
    }
  };

  activateClassroom = (value) => {
    this.setState({
      classroomActive: value,
    });
  };

  deactivateClassroom = () => {
    this.setState({
      classroomActive: null,
    });
  };

  render() {
    return this.state.currUserData ? (
      this.state.currUserData.isStudent ? (
        <div className="student-classroom-container">
          <div className="student-name-container">
            <button
              data-bs-toggle="modal"
              data-bs-target="#joinClassroomModal"
              className="btn btn-success"
            >
              Join classroom
            </button>
            <div>Hello {this.state.currUserData.name}</div>
          </div>
          <div style={{ padding: "0px 30px" }}>
            <h3
              style={{ fontFamily: "Segoe UI", fontWeight: 300, fontSize: 35 }}
            >
              My Classrooms
            </h3>
            <hr />
          </div>

          <div className="classrooms">
            {this.state.classroomActive && (
              <SingleClassroom
                classroom={this.state.classroomActive}
                currUserData={this.state.currUserData}
                deactivateClassroom={this.deactivateClassroom}
              />
            )}
            {this.state.currUserData &&
              this.state.currUserData.enrolledClassroomIdName &&
              !this.state.classroomActive &&
              this.state.currUserData.enrolledClassroomIdName.map(
                (value, index) => {
                  return (
                    <div className={`single-classroom theme-${value.theme}`}>
                      <h4>{value.name}</h4>
                      <hr />
                      <p>Class Code : {value.id}</p>
                      <div className="enter-classroom-button-container">
                        <button
                          className="btn btn-primary"
                          onClick={() => this.activateClassroom(value)}
                        >
                          Enter
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
          </div>

          <div
            class="modal fade"
            id="joinClassroomModal"
            tabindex="-1"
            aria-labelledby="createClassroomLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Join Classroom
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() =>
                      this.setState({
                        isError: false,
                        isSuccess: false,
                        errorMsg: "",
                        successMsg: "",
                        joinClassId: "",
                      })
                    }
                  ></button>
                </div>
                <div class="modal-body">
                  <form style={{ textAlign: "left" }}>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Class Id
                      </label>
                      <input
                        class="form-control"
                        id="exampleInputEmail1"
                        name="joinClassId"
                        value={this.state.joinClassId}
                        onChange={(e) => this.handleStateChange(e)}
                        aria-describedby="emailHelp"
                      />
                    </div>

                    <button
                      onClick={(e) => this.joinClassroom(e)}
                      class="btn btn-primary"
                    >
                      Join
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
        </div>
      ) : (
        <div className="teacher-classroom-container">
          <div className="student-name-container">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#createClassroomModal"
            >
              New classroom
            </button>
            <div>Hello {this.state.currUserData.name}</div>
          </div>
          <div style={{ padding: "0px 30px" }}>
            <h3
              style={{ fontFamily: "Segoe UI", fontWeight: 300, fontSize: 35 }}
            >
              My Classrooms
            </h3>
            <hr />
          </div>
          <div className="classrooms">
            {this.state.classroomActive && (
              <SingleClassroom
                fetchUserData={this.props.fetchUserData}
                classroom={this.state.classroomActive}
                currUserData={this.state.currUserData}
                deactivateClassroom={this.deactivateClassroom}
              />
            )}
            {this.state.currUserData &&
              this.state.currUserData.createdClassroomIdName &&
              !this.state.classroomActive &&
              this.state.currUserData.createdClassroomIdName.map(
                (value, index) => {
                  return (
                    <div className={`single-classroom theme-${value.theme}`}>
                      <h4>{value.name}</h4>
                      <hr />
                      <p>Code : {value.id}</p>
                      <div className="enter-classroom-button-container">
                        <button
                          className="btn btn-primary"
                          onClick={() => this.activateClassroom(value)}
                        >
                          Enter
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
          </div>

          <div
            class="modal fade"
            id="createClassroomModal"
            tabindex="-1"
            aria-labelledby="createClassroomLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Create Classroom
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() =>
                      this.setState({
                        isError: false,
                        isSuccess: false,
                        errorMsg: "",
                        successMsg: "",
                        createClassName: "",
                      })
                    }
                  ></button>
                </div>
                <div class="modal-body">
                  <form style={{ textAlign: "left" }}>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Class name
                      </label>
                      <input
                        class="form-control"
                        id="exampleInputEmail1"
                        name="createClassName"
                        value={this.state.createClassName}
                        onChange={(e) => this.handleStateChange(e)}
                        aria-describedby="emailHelp"
                      />
                    </div>

                    <button
                      onClick={(e) => this.createClassroom(e)}
                      class="btn btn-primary"
                    >
                      Create
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
        </div>
      )
    ) : (
      <></>
    );
  }
}
