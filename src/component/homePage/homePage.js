import React from "react";
import "./homePage.css";
import Header from "../header/header";
import StudentHome from "../studentHome/studentHome";
import TeacherHome from "../teacherHome/teacherHome";
import shapesImage from "../../assets/images/shapes.jpg";
import NoUserLandingPage from "../NoUserLandingPage/noUserLandingPage";
const userService = require("../../service/user");
const authentication = require("../../service/authentication");
export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      currUserData: null,
    };
  }

  fetchUserData = async () => {
    var res = await userService.fetchUserData();
    if (res.status == 200) {
      this.setState({
        currUserData: res.userData,
      });
    } else {
      this.setState(
        {
          currUserData: null,
        },
        () => localStorage.removeItem("takeMyTestAccessToken")
      );
    }
  };

  logoutUser = () => {
    this.setState(
      {
        currUserData: null,
      },
      () => localStorage.removeItem("takeMyTestAccessToken")
    );
  };
  render() {
    if (!this.state.currUserData && authentication.getToken())
      this.fetchUserData();
    return (
      <div className="home-page-container">
        <div
          style={{
            backgroundImage: `url(${shapesImage})`,
            position: "absolute",
            zIndex: -1,
            width: "100vw",
            height: "100%",
            minHeight: "100vh",
            opacity: 0.5,
          }}
        ></div>
        <div className="header-container">
          <Header
            fetchUserData={this.fetchUserData}
            logoutUser={this.logoutUser}
          />
        </div>
        <div className="user-home-container">
          {this.state.currUserData && this.state.currUserData.isStudent ? (
            <StudentHome
              fetchUserData={this.fetchUserData}
              currUserData={this.state.currUserData}
            />
          ) : this.state.currUserData && this.state.currUserData.isTeacher ? (
            <TeacherHome
              fetchUserData={this.fetchUserData}
              currUserData={this.state.currUserData}
            />
          ) : (
            <NoUserLandingPage />
          )}
        </div>
      </div>
    );
  }
}
