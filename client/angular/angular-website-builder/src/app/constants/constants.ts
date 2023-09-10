// Constants for strings that might appear in multiple areas of code,
// so typos do not result in hard to fix bugs.
export default class Constants {
  // Angular routing uses these strings to know which page to 
  // display during application navigation and routing.
  public static ROUTER_URLS = {
    EMPTY: "/",
    HOME: "home",
    RESPONSE_RESET_PASSWORD: "response-reset-password",
    USER_PROFILE: "user-profile",
    BUILD_WEBSITES: "build-websites"
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
  public static DROP_CONTENT_MESSAGE = "Drop web page content here";
  public static ADD_TEXT_HERE = "add text here";

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

  // Properties for elements used to build web pages.
  public static ITEM_PROPERTIES = [
    { key: "single", type: "layout", tooltip: "One single container" },
    { key: "2col", type: "layout", tooltip: "Two columns" },
    { key: "2row", type: "layout", tooltip: "Two rows" },
    { key: "3col", type: "layout", tooltip: "Three columns" },
    { key: "3row", type: "layout", tooltip: "Three rows" },
    { key: "4col", type: "layout", tooltip: "Four columns" },
    { key: "4row", type: "layout", tooltip: "Four rows" },
    { key: "4cont", type: "layout", tooltip: "Four containers" },
    { key: "hf2col", type: "layout", tooltip: "Header, footer and two columns" },
    { key: "hf2row", type: "layout", tooltip: "Header, footer and two rows" },
    { key: "hf3col", type: "layout", tooltip: "Header, footer and three columns" },
    { key: "hf3row", type: "layout", tooltip: "Header, footer and three rows" },
    { key: "hf4cont", type: "layout", tooltip: "Header, footer and four containers" },
    { key: "h1", type: "text", tooltip: "Heading H1 element" },
    { key: "h2", type: "text", tooltip: "Heading H2 element" },
    { key: "h3", type: "text", tooltip: "Heading H3 element" },
    { key: "h4", type: "text", tooltip: "Heading H4 element" },
    { key: "h5", type: "text", tooltip: "Heading H5 element" },
    { key: "h6", type: "text", tooltip: "Heading H6 element" },
    { key: "p", type: "text", tooltip: "Paragraph element" }
  ];

  public static PROPERTY_PIXEL_VALUES: any = {
    "font-size": true,
    "border-width": true
  }

  public static PROPERTY_COLOR_VALUES: any = {
    "color": true,
    "background-color": true,
    "border-color": true,
  }
}