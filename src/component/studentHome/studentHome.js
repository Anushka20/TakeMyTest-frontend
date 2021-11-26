import React from "react";
import "./studentHome.css";
import Classroom from "../classroom/classroom";
export default class StudentHome extends React.Component {
  render() {
    return (
      <div className="student-home-container">
        <Classroom
          fetchUserData={this.props.fetchUserData}
          currUserData={this.props.currUserData}
        />
      </div>
    );
  }
}
