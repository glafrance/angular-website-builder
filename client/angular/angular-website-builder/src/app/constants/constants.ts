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

  // Data for tools.
  public static TOOLS = {
    LAYOUT: {
      "single": {
        tooltip: "One single container"
      },
      "2col": {
        tooltip: "Two columns"
      },
      "2row": {
        tooltip: "Two rows"
      },
      "3col": {
        tooltip: "Three columns"
      },
      "3row": {
        tooltip: "Three rows"
      },
      "4col": {
        tooltip: "Four columns"
      },
      "4row": {
        tooltip: "Four rows"
      },
      "4cont": {
        tooltip: "Four containers"
      },
      "hf2col": {
        tooltip: "Header, footer and two columns"
      },
      "hf2row": {
        tooltip: "Header, footer and two rows"
      },
      "hf3col": {
        tooltip: "Header, footer and three columns"
      },
      "hf3row": {
        tooltip: "Header, footer and three rows"
      },
      "hf4cont": {
        tooltip: "Header, footer and four containers"
      }
    },
    TEXT:{
      "h1": {
        tooltip: "Heading H1 element"
      },
      "h2": {
        tooltip: "Heading H2 element"
      },
      "h3": {
        tooltip: "Heading H3 element"
      },
      "h4": {
        tooltip: "Heading H4 element"
      },
      "h5": {
        tooltip: "Heading H5 element"
      },
      "h6": {
        tooltip: "Heading H6 element"
      },
      "p": {
        tooltip: "Paragraph element"
      }
    }
  };

  public static LAYOUT_ICONS: any = [
    "../../../assets/images/layout-icons/single.png",
    "../../../assets/images/layout-icons/2col.png",
    "../../../assets/images/layout-icons/2row.png",
    "../../../assets/images/layout-icons/3col.png",
    "../../../assets/images/layout-icons/3row.png",
    "../../../assets/images/layout-icons/4col.png",
    "../../../assets/images/layout-icons/4row.png",
    "../../../assets/images/layout-icons/4cont.png",
    "../../../assets/images/layout-icons/hf2col.png",
    "../../../assets/images/layout-icons/hf2row.png",
    "../../../assets/images/layout-icons/hf3col.png",
    "../../../assets/images/layout-icons/hf3row.png",
    "../../../assets/images/layout-icons/hf4cont.png"
  ];

  public static LAYOUT_KEYS = [
    "single",
    "2col",
    "2row",
    "3col",
    "3row",
    "4col",
    "4row",
    "4cont",
    "hf2col",
    "hf2row",
    "hf3col",
    "hf3row",
    "hf4cont"
  ];

  public static TEXT_TOOL_ICONS: any = [
    "../../../assets/images/text-tool-icons/h1.png",
    "../../../assets/images/text-tool-icons/h2.png",
    "../../../assets/images/text-tool-icons/h3.png",
    "../../../assets/images/text-tool-icons/h4.png",
    "../../../assets/images/text-tool-icons/h5.png",
    "../../../assets/images/text-tool-icons/h6.png",
    "../../../assets/images/text-tool-icons/p.png"
  ];

  public static TEXT_TOOL_KEYS = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p"
  ];
}