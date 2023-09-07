import Constants from "../constants/constants";

export default class LayoutUtils {
  public static createSingleContainer(
    width: string, 
    height: string, 
    dragEnterHandler: any, 
    dragLeaveHandler: any, 
    dragOverHandler: any, 
    dropHandler: any
  ) {
    // Create a single div container.
    const div = document.createElement("div");
    div.style.width = width;
    div.style.height = height;
    div.style.padding = "10px";
    LayoutUtils.addRandomBorder(div);
    LayoutUtils.addDragDropHandlers(
      div, 
      dragEnterHandler, 
      dragLeaveHandler, 
      dragOverHandler, 
      dropHandler
    );

    return div;
  }

  public static addRandomBorder(el: any) {
    const borderColor = LayoutUtils.getRandomBorderColor();
    el.style.border = `1px solid ${borderColor}`;
  }

  public static addDragDropHandlers(
    el: any, 
    dragEnterHandler: any, 
    dragLeaveHandler: any, 
    dragOverHandler: any, 
    dropHandler: any
  ) {
    el.setAttribute("droppable", "true");
    el.addEventListener("dragenter", dragEnterHandler);
    el.addEventListener("dragleave", dragLeaveHandler);
    el.addEventListener("dragover", dragOverHandler);
    el.addEventListener("drop", dropHandler);
  }

  public static getRandomBorderColor() {
    const index = Math.floor(Math.random() * LayoutUtils.borderColors.length - 1) + 1;
    return LayoutUtils.borderColors[index];
  }

  public static borderColors = [
    "#EF5350",
    "#B71C1C",
    "#F06292",
    "#880E4F",
    "#BA68C8",
    "#4A148C",
    "#9575CD",
    "#311B92",
    "#7986CB",
    "#1A237E",
    "#64B5F6",
    "#0D47A1",
    "#4FC3F7",
    "#01579B",
    "#4DD0E1",
    "#4DB6AC",
    "#004D40",
    "#81C784",
    "#1B5E20",
    "#AED581",
    "#33691E",
    "#DCE775",
    "#827717",
    "#FFF176",
    "#F57F17",
    "#FFD54F",
    "#FF6F00",
    "#FFB74D",
    "#E65100",
    "#FF8A65",
    "#BF360C",
    "#A1887F",
    "#3E2723",
    "#90A4AE",
    "#263238"
  ];
}
