import React from "react";
import "./allQuestion.css";

export default class AllQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      questions: props.questions,
    };
  }
  changeQuestion = (newQuestion) => {
    this.props.changeQuestion(newQuestion);
  };
  render() {
    return (
      <div className="all-question">
        {Object.keys(this.state.questions).map((value, index) => {
          return (
            <button
              className={`single-question ${
                this.props.reviewedSavedQuestion[value].reviewed
                  ? "reviewed"
                  : this.props.reviewedSavedQuestion[value].saved
                  ? "saved"
                  : "not-review-save"
              }`}
              onClick={() => this.changeQuestion(value)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    );
  }
}
