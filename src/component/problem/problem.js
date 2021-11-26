import React from "react";
import "./problem.css";

export default class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      currentQuestion: this.props.currentQuestion,
      currentQuestionAnswer: "",
      answers: {},
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      currentQuestion: props.currentQuestion,
      questions: props.questions,
      answers: props.answers,
    };
  }
  reviewQuestion = (questionId) => {
    this.props.reviewQuestion(questionId, this.state.currentQuestionAnswer);
  };

  saveQuestion = (questionId) => {
    this.props.saveQuestion(questionId, this.state.currentQuestionAnswer);
  };
  changeAnswer = (answer) => {
    this.setState({
      currentQuestionAnswer: answer,
    });
  };
  render() {
    return Object.keys(this.state.questions).map((value, index) => {
      if (value == this.state.currentQuestion) {
        return (
          <div className="problem">
            <div>
              <div className="problem-statement">
                <p>
                  <strong>Question No.{index + 1}) </strong>
                  {this.state.questions[value].statement}
                </p>
              </div>
              <div className="options">
                {Object.keys(this.state.questions[value].options).map(
                  (value_, index_) => {
                    return (
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={`${value}`}
                          id={`${value}${value_}`}
                          defaultChecked={
                            this.state.answers
                              ? this.state.answers[value] == value_
                              : false
                          }
                          onChange={() => this.changeAnswer(value_)}
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          {value_}){" "}
                          {this.state.questions[value].options[value_]}
                        </label>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="actions">
              <button
                className="btn btn-warning"
                onClick={() => this.reviewQuestion(value)}
              >
                Review
              </button>
              <button
                className="btn btn-success"
                onClick={() => this.saveQuestion(value)}
              >
                Save
              </button>
            </div>
          </div>
        );
      }
    });
  }
}
