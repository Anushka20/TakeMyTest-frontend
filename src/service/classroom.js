const constant = require("../constants");
const authenticationService = require("./authentication");

function processResponse(res) {
  // check if user is authenticated/authorized or not
  if (res.status == 401) {
    // user not authenticated
    // remove access token from localStorage if present
    if (localStorage.getItem("takeMyTestAccessToken")) {
      localStorage.removeItem("takeMyTestAccessToken");
    }
    return {
      status: 401,
      message: "User not authenticated!",
    };
  } else if (res.status == 403) {
    // user not authorized
    return {
      status: 403,
      message: "User not authorized",
    };
  } else {
    // user is authenticated as well as authorized
    return res.json();
  }
}

// function to create classroom
async function createClassRoom(classroomData) {
  const res = await fetch(`${constant.BACKEND_URL}/createClassroom`, {
    method: "POST",
    headers: {
      authorization: `JWT ${authenticationService.getToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      classroomData: classroomData,
    }),
  }).then((res) => processResponse(res));
  return res;
}

// function to join classroom
async function joinClassRoom(classroomData) {
  const res = await fetch(`${constant.BACKEND_URL}/joinClassroom`, {
    method: "POST",
    headers: {
      authorization: `JWT ${authenticationService.getToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      classroomData: classroomData,
    }),
  }).then((res) => processResponse(res));
  return res;
}

// function to create test
async function createTest(testData) {
  const res = await fetch(`${constant.BACKEND_URL}/createTest`, {
    method: "POST",
    headers: {
      authorization: `JWT ${authenticationService.getToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(testData),
  }).then((res) => processResponse(res));
  return res;
}

// function to fetch all test for students & teachers
async function fetchAllTestInClassroom(classroomId) {
  const res = await fetch(
    `${constant.BACKEND_URL}/fetchAllTestInClassroom?classroomId=${classroomId}`,
    {
      method: "GET",
      headers: {
        authorization: `JWT ${authenticationService.getToken()}`,
        "content-type": "application/json",
      },
    }
  ).then((res) => processResponse(res));
  return res;
}

// function to fetch particular test
async function fetchTest(testId) {
  const res = await fetch(
    `${constant.BACKEND_URL}/fetchTest?testId=${testId}`,
    {
      method: "GET",
      headers: {
        authorization: `JWT ${authenticationService.getToken()}`,
        "content-type": "application/json",
      },
    }
  ).then((res) => processResponse(res));
  return res;
}

// function to submit test
async function submitTest(testId, answers) {
  const res = await fetch(`${constant.BACKEND_URL}/submitTest`, {
    method: "POST",
    headers: {
      authorization: `JWT ${authenticationService.getToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      testId: testId,
      answers: answers,
    }),
  }).then((res) => processResponse(res));
  return res;
}

module.exports = {
  createClassRoom: createClassRoom,
  joinClassRoom: joinClassRoom,
  createTest: createTest,
  fetchAllTestInClassroom: fetchAllTestInClassroom,
  fetchTest: fetchTest,
  submitTest: submitTest,
};
