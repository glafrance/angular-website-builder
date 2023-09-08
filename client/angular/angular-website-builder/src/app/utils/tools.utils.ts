import Constants from "../constants/constants";

export default class ToolsUtils {
  public static addElement (target: any, tag: string, clickHandler?:any ) {
    if (target && tag) {
      const el = document.createElement(tag);
      el.style.cursor = "pointer";
      el.addEventListener("click", clickHandler);

      if (target.textContent === Constants.DROP_CONTENT_MESSAGE) {
        target.textContent = "";
      }

      if (Constants.TEXT_TOOL_KEYS.indexOf(tag) !== -1) {
        el.textContent = "add text here";
      }

      target.appendChild(el);
    }
  }
}