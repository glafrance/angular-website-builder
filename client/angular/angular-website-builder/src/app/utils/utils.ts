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

  // Get the key for tool data from its icon path.
  public static getToolKey(iconPath: string) {
    let key = "";

    if (iconPath) {
      const match = iconPath.match(/.*?\/(\w+)\.png/);

      if (match && (match.length > 0)) {
        key = match[1];        
      }
    }

    return key;
  }  

  public static decimalToHex(value: any) {
    if (typeof value === "string") {
      value = parseInt(value);
    }

    let hex = value.toString(16);
    hex = hex.length == 1 ? "0" + hex : hex;
    return hex;
  }
  
  public static rgbToHex(value: any) {
    let result = "#000000", red, green, blue;
    const regex = /.+?(\d+),\s*(\d+),\s*(\d+).*/;
    const match = value.match(regex);

    if (match && match.length === 4) {
      red = match[1];
      green = match[2];
      blue = match[3];

      if (
        Utils.isNotNullOrUndefined(red) && 
        Utils.isNotNullOrUndefined(green) && 
        Utils.isNotNullOrUndefined(blue)
      ) {
        result = `#${Utils.decimalToHex(red)}${Utils.decimalToHex(green)}${Utils.decimalToHex(blue)}`;
      }  
    }
    return result;
  }
}