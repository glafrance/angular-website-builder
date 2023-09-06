// Constants for strings that might appear in multiple areas of code,
// so typos do not result in hard to fix bugs.
export default class Constants {
  // Angular routing uses these strings to know which page to 
  // display during application navigation and routing.
  public static ROUTER_URLS = {
    EMPTY: "/",
    HOME: "home",
    RESPONSE_RESET_PASSWORD: "response-reset-password",
    USER_PROFILE: "user-profile"
  };

  // General constants
  public static SIGNIN = "Signin";
  public static SIGNUP = "Signup";
  public static USER_MANAGER = "User Manager";
  public static USER_ID = "userId";
  public static DATA = "data";
  public static BIO_BLURB = "bioBlurb";
  public static INVALID = "INVALID";
  public static PROFILE_IMAGE = "profileImage";

  // Constants for backend calls, HTTP methods.
  public static HTTP_METHODS = {
    GET: "get",
    POST: "post",
    DELETE: "delete",
    PUT: "put"
  };

  // The base url for the backend, here assumed to be
  // on localhost port 4002. TODO: implement environment
  // system allowing for development (localhost),
  // production, staging, etc. environments.
  public static BASE_URL = "https://localhost:4002";

  // Backend REST API endpoints, implemented in the 
  // backend code, for getting/saving data to the backend.
  public static API_ENDPOINTS = {
    PROFILE: "user/profile",
    PROFILE_IMAGE: "user/profile-image",
    SIGNUP: "user/signup",
    SIGNIN: "user/signin",
    REQUEST_RESET_PASSWORD: "user/request-reset-password",
    RESPONSE_RESET_PASSWORD: "user/response-reset-password",
    VALIDATE_RESET_TOKEN: "user/validate-reset-token"

  };

  // Response flags for backend API calls.
  public static RESULT = "result";
  public static SUCCESS = "success";
  public static FAILURE = "failure";
  public static ERROR = "error";

  // Local storage keys for data stored in local storage.
  public static SIGNED_IN_LOCAL_STORAGE_KEY = "signed_in";
  public static USER_ID_LOCAL_STORAGE_KEY = "userId";
}