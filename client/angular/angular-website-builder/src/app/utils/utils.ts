// Utility methods to avoid duplicated code
// and to ensure greater code quality.

import Constants from "../constants/constants";

export default class Utils {
  // If a property has a value of 0 (zero) and we
  // do something like     if (myProperty)
  // the result will be false because in JavaScript
  // 0 (zero) equates to false. If we really want to
  // know that the property value is either null or
  // undefined then this method makes it easier.
  public static isNotNullOrUndefined(value: any) {
    let retVal = (
      value !== null &&
      value !== undefined
    );

    return retVal;
  }

  // Same as above but also checks for empty strings 
  // or empty arrays.
  public static isNotNullOrUndefinedOrEmpty(value: any) {
    let retVal = (
      value !== null &&
      value !== undefined &&
      value !== ""
    );

    if (retVal && value["isArray"]) {
      retVal = value.length      
    }

    return retVal;
  }

  // This is same as above but this verifies the positive case.
  public static isNullOrUndefinedOrEmpty(value: any) {
    let retVal = (
      value === null ||
      value === undefined ||
      value === ""
    );

    if (!retVal && value["isArray"]) {
      retVal = !value.length      
    }

    return retVal;
  }

  // Checks if the status property is invalid.
  public static isInvalid(item: any) {
    return (item && item.status === Constants.INVALID);  
  }
}