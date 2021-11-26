const MODE = "prod";
const BACKEND_URL =
  MODE == "prod"
    ? "https://takemytest-backend.herokuapp.com"
    : "http://localhost:8000";

export { BACKEND_URL };
