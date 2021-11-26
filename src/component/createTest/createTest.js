import React from "react";
import "./createTest.css";
import TextField from "@mui/material/TextField";
const classroomService = require("../../service/classroom");
export default class CreateTest extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      testDurationInMins: null,
      testStartsAt: null,
      testName: "",
    };
  }
  addQuestion = () => {
    let question = {
      statement: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    };
    let questions = this.state.questions.concat([question]);
    this.setState({
      questions: questions,
    });
  };
  handleQuestionStatementChange = (e, questionIndex) => {
    e.preventDefault();
    let questions = [...this.state.questions];
    questions[questionIndex].statement = e.target.value;
    this.setState({
      questions: questions,
    });
  };

  handleQuestionOptionChange = (e, questionIndex, optionType) => {
    e.preventDefault();
    let questions = [...this.state.questions];
    questions[questionIndex].options[optionType] = e.target.value;
    this.setState({
      questions: questions,
    });
  };
  handleQuestionAnswerChange = (e, questionIndex) => {
    let questions = [...this.state.questions];
    questions[questionIndex].answer = e.target.value;
    this.setState({
      questions: questions,
    });
  };
  handleStateChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState((prevState) => {
      var curr = { ...prevState };
      curr[name] = value;
      return curr;
    });
  };
  createTest = async () => {
    const res = await classroomService.createTest({
      test: {
        questions: this.state.questions,
        duration: this.state.testDurationInMins,
        startTime: this.state.testStartsAt,
        name: this.state.testName,
      },
      classroom: this.props.classroom.id,
    });
    if (res.status == 200) {
      alert("Test added successfully");
      this.props.fetchUserData();
      this.props.closeCreateTest();
    } else {
      alert("Test not added");
    }
  };
  render() {
    return (
      <div className="new-test-container">
        <div
          style={{ width: "100%", padding: "0px 0px 20px 0px" }}
          class="form-check form-check-inline"
        >
          <label class="form-check-label" for="testDurationInMins">
            Test Name
          </label>
          <input
            class="form-control"
            type="text"
            name="testName"
            id="testName"
            value={this.state.testName}
            onChange={(e) => this.handleStateChange(e)}
          />
        </div>
        <div className="test-duration-start-date">
          <div class="form-check form-check-inline">
            <label class="form-check-label" for="testDurationInMins">
              Test Duration ( mins )
            </label>
            <input
              class="form-control"
              type="text"
              name="testDurationInMins"
              id="testDurationInMins"
              value={this.state.testDurationInMins}
              onChange={(e) => this.handleStateChange(e)}
            />
          </div>
          <div class="form-check form-check-inline">
            <TextField
              id="datetime-local"
              label="Test starts at"
              type="datetime-local"
              sx={{ width: 250 }}
              name="testStartsAt"
              value={this.state.testStartsAt}
              onChange={(e) => this.handleStateChange(e)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        {this.state.questions.map((value, index) => {
          return (
            <div className="question-container">
              <hr />
              <div className="question-statement-container">
                <label for={`question${index + 1}`} class="form-label">
                  <strong>Question {index + 1}</strong>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id={`question${index + 1}`}
                  onChange={(e) => this.handleQuestionStatementChange(e, index)}
                  value={value.statement}
                />
              </div>
              <div className="question-options-container">
                {/* option a */}
                <label for={`question${index + 1}`} class="form-label">
                  <strong>Option A</strong>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id={`question${index + 1}`}
                  value={value.options.a}
                  onChange={(e) =>
                    this.handleQuestionOptionChange(e, index, "a")
                  }
                />
                {/* option b */}
                <label for={`question${index + 1}`} class="form-label">
                  <strong>Option B</strong>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id={`question${index + 1}`}
                  value={value.options.b}
                  onChange={(e) =>
                    this.handleQuestionOptionChange(e, index, "b")
                  }
                />
                {/* option c */}
                <label for={`question${index + 1}`} class="form-label">
                  <strong>Option C</strong>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id={`question${index + 1}`}
                  value={value.options.c}
                  onChange={(e) =>
                    this.handleQuestionOptionChange(e, index, "c")
                  }
                />
                {/* option D */}
                <label for={`question${index + 1}`} class="form-label">
                  <strong>Option D</strong>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id={`question${index + 1}`}
                  value={value.options.d}
                  onChange={(e) =>
                    this.handleQuestionOptionChange(e, index, "d")
                  }
                />
              </div>
              <div className="question-answer-container">
                <label class="form-label">
                  <strong>Answer</strong>
                </label>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={`option-${index + 1}`}
                    id="inlineRadio1"
                    value="a"
                    onChange={(e) => this.handleQuestionAnswerChange(e, index)}
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    A
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={`option-${index + 1}`}
                    id="inlineRadio2"
                    value="b"
                    onChange={(e) => this.handleQuestionAnswerChange(e, index)}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    B
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={`option-${index + 1}`}
                    id="inlineRadio2"
                    value="c"
                    onChange={(e) => this.handleQuestionAnswerChange(e, index)}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    C
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={`option-${index + 1}`}
                    id="inlineRadio2"
                    value="d"
                    onChange={(e) => this.handleQuestionAnswerChange(e, index)}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    D
                  </label>
                </div>
              </div>
            </div>
          );
        })}

        <div className="create-test-action-container">
          <button className="btn btn-danger" onClick={() => this.addQuestion()}>
            Add question
          </button>

          <button
            className="btn btn-success"
            disabled={this.state.questions.length == 0 ? true : false}
            onClick={() => this.createTest()}
          >
            Save Test
          </button>
        </div>
      </div>
    );
  }
}
