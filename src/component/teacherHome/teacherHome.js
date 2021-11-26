import React from "react";
import "./teacherHome.css";
import CreateTest from "../createTest/createTest";
import Classroom from "../classroom/classroom";
export default class TeacherHome extends React.Component {
  render() {
    return (
      <div className="teacher-home-container">
        <Classroom
          fetchUserData={this.props.fetchUserData}
          currUserData={this.props.currUserData}
        />
      </div>
    );
  }
}
