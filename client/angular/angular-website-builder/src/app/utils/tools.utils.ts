import Constants from "../constants/constants";
import Utils from "./utils";

export default class ToolsUtils {
  public static addElement (target: any, item: any, clickHandler?:any ) {
    if (target && item) {
      const el = document.createElement(item.key);
      el.style.cursor = "pointer";
      el.addEventListener("click", () => clickHandler(el));

      if (target.textContent === Constants.DROP_CONTENT_MESSAGE) {
        target.textContent = "";
      }

      if (item.type === "text") {
        el.textContent = Constants.ADD_TEXT_HERE;
      }

      target.appendChild(el);
    }
  }

  public static getElementPropertyValue(elem: any, property: string) {
    let propertyValue: any = window.getComputedStyle(elem, null).getPropertyValue(property);

    if (Constants.PROPERTY_PIXEL_VALUES[property]) {
      propertyValue = propertyValue.replace("px", "");
      propertyValue = parseFloat(propertyValue);    
    }

    if(Constants.PROPERTY_COLOR_VALUES[property]) {
      propertyValue = Utils.rgbToHex(propertyValue);
    }

    return propertyValue;
  }
}