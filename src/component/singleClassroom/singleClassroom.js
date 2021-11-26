import React from "react";
import "./singleClassroom.css";
import AllQuestion from "../allQuestion/allQuestion";
import Problem from "../problem/problem";
import CreateTest from "../createTest/createTest";
import { BACKEND_URL } from "../../constants";
const classroomService = require("../../service/classroom");
const moment = require("moment");
export default class SingleClassroom extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: {},
      reviewedSavedQuestion: {},
      currentQuestion: {},
      currentQuestionNumber: null,
      answers: {},
      createTest: false,
      allTestStudent: null,
      allTestTeacher: null,
      isTestAvail: false,
      test: null,
      testResult: null,
      testResultName: "",
    };
  }
  changeQuestion = (newQuestion) => {
    this.setState({
      currentQuestion: newQuestion,
    });
  };
  reviewQuestion = (questionId, ans) => {
    this.setState(
      (prevState) => {
        let curr = { ...this.state.reviewedSavedQuestion };
        curr[questionId].reviewed = true;
        curr[questionId].saved = false;
        return curr;
      },
      () => {
        let curr = this.state.answers;
        curr[questionId] = ans;
        this.setState({
          answers: curr,
        });
      }
    );
  };
  saveQuestion = (questionId, ans) => {
    this.setState(
      (prevState) => {
        var curr = { ...this.state.reviewedSavedQuestion };
        curr[questionId].reviewed = false;
        curr[questionId].saved = true;
        return curr;
      },
      () => {
        let curr = this.state.answers;
        curr[questionId] = ans;
        this.setState({
          answers: curr,
        });
      }
    );
  };

  fetchAllTestStudent = async () => {
    const res = await classroomService.fetchAllTestInClassroom(
      this.props.classroom.id
    );

    if (res.status == 200) {
      this.setState({
        allTestStudent: res.test,
      });
    } else {
      this.setState({
        allTestStudent: true,
      });
    }
  };

  fetchAllTestTeacher = async () => {
    const res = await classroomService.fetchAllTestInClassroom(
      this.props.classroom.id
    );

    if (res.status == 200) {
      this.setState({
        allTestTeacher: res.test,
      });
    } else {
      this.setState({
        allTestTeacher: true,
      });
    }
  };

  fetchTestAndStart = async (testId) => {
    const res = await classroomService.fetchTest(testId);
    if (res.status == 200 && res.test) {
      let reviewedSavedQuestion = {};
      let answers = {};
      Object.keys(res.test.questions).map((value, index) => {
        reviewedSavedQuestion[value] = {
          reviewed: false,
          saved: false,
        };
        answers[value] = "";
      });
      this.setState({
        isTestAvail: true,
        test: res.test,
        questions: res.test.questions,
        currentQuestion: 0,
        reviewedSavedQuestion: reviewedSavedQuestion,
        answers: answers,
      });
    } else {
      this.setState({
        isTestAvail: true,
      });
    }
  };
  submitTest = async () => {
    var res = await classroomService.submitTest(
      this.state.test.id,
      this.state.answers
    );
    if (res.status == 200)
      alert(`Your score is : ${res.score}. Click OK to close test`);
    this.setState({
      isTestAvail: false,
      test: null,
      questions: {},
      currentQuestion: null,
      reviewedSavedQuestion: {},
      answers: {},
      allTestStudent: null,
    });
  };

  createNewTest = () => {
    this.setState({
      createTest: true,
    });
  };

  closeCreateTest = () => {
    this.setState({
      createTest: false,
      allTestTeacher: null,
    });
  };

  viewTestResults = (id) => {
    Object.keys(this.state.allTestTeacher).map((value, index) => {
      if (this.state.allTestTeacher[value].id == id) {
        this.setState({
          testResult: this.state.allTestTeacher[value].results,
          testResultName: this.state.allTestTeacher[value].name,
        });
      }
    });
  };

  render() {
    if (this.props.currUserData.isStudent && this.state.allTestStudent == null)
      this.fetchAllTestStudent();
    if (this.props.currUserData.isTeacher && this.state.allTestTeacher == null)
      this.fetchAllTestTeacher();
    return (
      <div className="single-classroom-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{this.props.classroom.name}</h3>
          <button
            className="btn btn-danger"
            onClick={() => this.props.deactivateClassroom()}
          >
            Close Classroom
          </button>
        </div>
        {this.props.currUserData.isStudent ? (
          <div>
            {!this.state.isTestAvail ? (
              <div className="test-strip-container">
                {this.state.allTestStudent &&
                  this.state.allTestStudent.map((value, index) => {
                    return (
                      <div
                        className={`test-strip test-strip-${this.props.classroom.theme}`}
                      >
                        <p>{value.name}</p>
                        {Object.keys(value.results).includes(
                          this.props.currUserData.email.split(".")[0]
                        ) ? (
                          <button className="btn btn-light" disabled>
                            Score :
                            {" " +
                              value.results[
                                this.props.currUserData.email.split(".")[0]
                              ]}
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            disabled={moment(new Date(value.startTime)).isAfter(
                              moment(Date.now())
                            )}
                            onClick={() => this.fetchTestAndStart(value.id)}
                          >
                            Start
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div>
                <div className="test-container">
                  <div className="all-question-container">
                    <div className="all-question-header">
                      {this.state.test.name}
                    </div>
                    <hr />
                    <AllQuestion
                      changeQuestion={this.changeQuestion}
                      questions={this.state.questions}
                      reviewedSavedQuestion={this.state.reviewedSavedQuestion}
                    />
                  </div>
                  <div className="problem-container">
                    <Problem
                      questions={this.state.questions}
                      currentQuestion={this.state.currentQuestion}
                      reviewQuestion={this.reviewQuestion}
                      saveQuestion={this.saveQuestion}
                      answers={this.state.answers}
                    />
                  </div>
                </div>
                <div className="submit-container">
                  <button
                    onClick={() => this.submitTest()}
                    className="btn btn-danger"
                  >
                    Submit Test
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {this.state.createTest ? (
              <CreateTest
                fetchUserData={this.props.fetchUserData}
                classroom={this.props.classroom}
                closeCreateTest={this.closeCreateTest}
              />
            ) : (
              <div>
                <div>
                  {
                    <div className="test-strip-container">
                      {this.state.allTestTeacher &&
                        this.state.allTestTeacher.map((value, index) => {
                          return (
                            <div
                              className={`test-strip test-strip-${this.props.classroom.theme}`}
                            >
                              <p>{value.name}</p>
                              <button
                                className="btn btn-success"
                                onClick={() => this.viewTestResults(value.id)}
                                data-bs-toggle="modal"
                                data-bs-target="#testResultModal"
                              >
                                Test Results
                              </button>
                            </div>
                          );
                        })}
                      <div
                        class="modal fade"
                        id="testResultModal"
                        tabindex="-1"
                        aria-labelledby="loginModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                {this.state.testResultName}
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <table style={{ width: "100%" }}>
                                <tr className="test-result-header-row">
                                  <th className="test-result-header">
                                    Student Email
                                  </th>
                                  <th className="test-result-header">Score</th>
                                  <th className="test-result-header">
                                    Percentage Score
                                  </th>
                                </tr>
                                {this.state.testResult ? (
                                  Object.keys(this.state.testResult).map(
                                    (value, index) => {
                                      return (
                                        <tr className="test-result-body-row">
                                          <td className="test-result-body">
                                            {value}.com
                                          </td>
                                          <td className="test-result-body">
                                            {this.state.testResult[value]}
                                          </td>
                                          <td className="test-result-body">
                                            {(
                                              (parseInt(
                                                this.state.testResult[
                                                  value
                                                ].split("/")[0]
                                              ) *
                                                100) /
                                              parseInt(
                                                this.state.testResult[
                                                  value
                                                ].split("/")[1]
                                              )
                                            ).toFixed(2)}
                                            %
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )
                                ) : (
                                  <></>
                                )}
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => this.createNewTest()}
                >
                  Create Test
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
