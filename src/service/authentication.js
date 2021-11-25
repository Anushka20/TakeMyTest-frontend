const constant = require("../constants");

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

function getToken() {
  return localStorage.getItem("takeMyTestAccessToken");
}

// function to login user with email and password
async function handleLogin(userData) {
  const res = await fetch(`${constant.BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userData: userData,
    }),
  }).then((res) => processResponse(res));
  return res;
}

// function to register user
async function handleRegister(userData) {
  const res = await fetch(`${constant.BACKEND_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userData: userData,
    }),
  }).then((res) => processResponse(res));
  return res;
}

module.exports = {
  getToken: getToken,
  handleLogin: handleLogin,
  handleRegister: handleRegister,
};
