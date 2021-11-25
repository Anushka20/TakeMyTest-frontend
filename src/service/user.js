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

// function to fetch user data
async function fetchUserData() {
  const res = await fetch(`${constant.BACKEND_URL}/fetchUserData`, {
    method: "GET",
    headers: {
      authorization: `JWT ${authenticationService.getToken()}`,
      "content-type": "application/json",
    },
  }).then((res) => processResponse(res));
  return res;
}

module.exports = {
  fetchUserData: fetchUserData,
};
