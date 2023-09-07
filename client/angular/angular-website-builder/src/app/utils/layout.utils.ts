import Constants from "../constants/constants";

export default class LayoutUtils {
  public static addLayout (
    key: string, 
    target: any,
    onDragEnter: any, 
    onDragLeave: any, 
    onDragOver: any, 
    onDrop: any
  ) {
    let parentContainer, col1, col2, col3, col4, row1, row2, row3, row4, cont1, cont2, cont3, cont4, header, footer;

    switch (key) {
      case "single":
        const singleContainer = LayoutUtils.createContainer("98.5%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);
        target.appendChild(singleContainer);
        break;
      case "2col":
        parentContainer = LayoutUtils.createContainer("98.5%", "97%");
        parentContainer.style.display = "flex";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        col1 = LayoutUtils.createContainer("49%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col2 = LayoutUtils.createContainer("49%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        parentContainer.appendChild(col1);
        parentContainer.appendChild(col2);
        target.appendChild(parentContainer);
        break;
      case "2row":
        parentContainer = LayoutUtils.createContainer("98.5%", "97%");

        parentContainer.style.display = "flex";
        parentContainer.style.flexDirection = "column";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        row1 = LayoutUtils.createContainer("98.5%", "49%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row2 = LayoutUtils.createContainer("98.5%", "49%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        parentContainer.appendChild(row1);
        parentContainer.appendChild(row2);
        target.appendChild(parentContainer);
        break;
      case "3col":
        parentContainer = LayoutUtils.createContainer("98.5%", "97%");
        parentContainer.style.display = "flex";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        col1 = LayoutUtils.createContainer("33%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col2 = LayoutUtils.createContainer("33%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col3 = LayoutUtils.createContainer("33%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        parentContainer.appendChild(col1);
        parentContainer.appendChild(col2);
        parentContainer.appendChild(col3);
        target.appendChild(parentContainer);
        break;
      case "3row":
        parentContainer = LayoutUtils.createContainer("98.5%", "97%");

        parentContainer.style.display = "flex";
        parentContainer.style.flexDirection = "column";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        row1 = LayoutUtils.createContainer("98.5%", "33%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row2 = LayoutUtils.createContainer("98.5%", "33%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row3 = LayoutUtils.createContainer("98.5%", "33%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        parentContainer.appendChild(row1);
        parentContainer.appendChild(row2);
        parentContainer.appendChild(row3);
        target.appendChild(parentContainer);
        break;
      case "4col":
        parentContainer = LayoutUtils.createContainer("98.5%", "97%");
        parentContainer.style.display = "flex";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        col1 = LayoutUtils.createContainer("24%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col2 = LayoutUtils.createContainer("24%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col3 = LayoutUtils.createContainer("24%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col4 = LayoutUtils.createContainer("24%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        parentContainer.appendChild(col1);
        parentContainer.appendChild(col2);
        parentContainer.appendChild(col3);
        parentContainer.appendChild(col4);
        target.appendChild(parentContainer);
        break;
      case "4row":
        parentContainer = LayoutUtils.createContainer("98.5%", "97%");

        parentContainer.style.display = "flex";
        parentContainer.style.flexDirection = "column";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        row1 = LayoutUtils.createContainer("98.5%", "24%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row2 = LayoutUtils.createContainer("98.5%", "24%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row3 = LayoutUtils.createContainer("98.5%", "24%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row4 = LayoutUtils.createContainer("98.5%", "24%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        parentContainer.appendChild(row1);
        parentContainer.appendChild(row2);
        parentContainer.appendChild(row3);
        parentContainer.appendChild(row4);
        target.appendChild(parentContainer);
        break;
      case "4cont":
        parentContainer = LayoutUtils.createContainer("98.5%", "97%");
        parentContainer.style.display = "flex";
        parentContainer.style.flexWrap = "wrap";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        cont1 = LayoutUtils.createContainer("48%", "45%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        cont2 = LayoutUtils.createContainer("48%", "45%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        cont3 = LayoutUtils.createContainer("48%", "45%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        cont4 = LayoutUtils.createContainer("48%", "45%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        parentContainer.appendChild(cont1);
        parentContainer.appendChild(cont2);
        parentContainer.appendChild(cont3);
        parentContainer.appendChild(cont4);
        target.appendChild(parentContainer);
        break;
      case "hf2col":
        parentContainer = LayoutUtils.createContainer("99%", "97%");
        parentContainer.style.display = "flex";
        parentContainer.style.flexDirection = "column";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        header = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col1 = LayoutUtils.createContainer("50%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col2 = LayoutUtils.createContainer("50%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        footer = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        cont1 = LayoutUtils.createContainer("99.75%", "78%");  
        cont1.style.display = "flex";
        cont1.style.alignItems = "center";
        cont1.style.justifyContent = "center";
        cont1.style.gap = "10px";
        cont1.style.padding = "0";
        cont1.style.border = "none";

        cont1.appendChild(col1);
        cont1.appendChild(col2);

        parentContainer.appendChild(header);
        parentContainer.appendChild(cont1);
        parentContainer.appendChild(footer);
        target.appendChild(parentContainer);
        break;
      case "hf2row":
        parentContainer = LayoutUtils.createContainer("99%", "97%");
        parentContainer.style.display = "flex";
        parentContainer.style.flexDirection = "column";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        header = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row1 = LayoutUtils.createContainer("98.5%", "40%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row2 = LayoutUtils.createContainer("98.5%", "40%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        footer = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        parentContainer.appendChild(header);
        parentContainer.appendChild(row1);
        parentContainer.appendChild(row2);
        parentContainer.appendChild(footer);
        target.appendChild(parentContainer);
        break;
      case "hf3col":
        parentContainer = LayoutUtils.createContainer("99%", "97%");
        parentContainer.style.display = "flex";
        parentContainer.style.flexDirection = "column";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        header = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col1 = LayoutUtils.createContainer("33%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col2 = LayoutUtils.createContainer("33%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        col3 = LayoutUtils.createContainer("33%", "97%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        footer = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        cont1 = LayoutUtils.createContainer("99.75%", "78%");  
        cont1.style.display = "flex";
        cont1.style.alignItems = "center";
        cont1.style.justifyContent = "center";
        cont1.style.gap = "10px";
        cont1.style.padding = "0";
        cont1.style.border = "none";

        cont1.appendChild(col1);
        cont1.appendChild(col2);
        cont1.appendChild(col3);

        parentContainer.appendChild(header);
        parentContainer.appendChild(cont1);
        parentContainer.appendChild(footer);
        target.appendChild(parentContainer);
        break;
      case "hf3row":
        parentContainer = LayoutUtils.createContainer("99%", "97%");
        parentContainer.style.display = "flex";
        parentContainer.style.flexDirection = "column";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        header = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row1 = LayoutUtils.createContainer("98.5%", "26%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row2 = LayoutUtils.createContainer("98.5%", "26%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        row3 = LayoutUtils.createContainer("98.5%", "26%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        footer = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        parentContainer.appendChild(header);
        parentContainer.appendChild(row1);
        parentContainer.appendChild(row2);
        parentContainer.appendChild(row3);
        parentContainer.appendChild(footer);
        target.appendChild(parentContainer);
        break;
      case "hf4cont":
        parentContainer = LayoutUtils.createContainer("99%", "97%");
        parentContainer.style.display = "flex";
        parentContainer.style.flexDirection = "column";
        parentContainer.style.alignItems = "center";
        parentContainer.style.justifyContent = "center";
        parentContainer.style.gap = "10px";

        header = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        cont1 = LayoutUtils.createContainer("50%", "91%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        cont2 = LayoutUtils.createContainer("50%", "91%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        cont3 = LayoutUtils.createContainer("50%", "91%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        cont4 = LayoutUtils.createContainer("50%", "91%", onDragEnter, onDragLeave, onDragOver, onDrop);  
        footer = LayoutUtils.createContainer("98.5%", "10%", onDragEnter, onDragLeave, onDragOver, onDrop);  

        const subContainer1 = LayoutUtils.createContainer("99.75%", "78%");  
        subContainer1.style.display = "flex";
        subContainer1.style.alignItems = "center";
        subContainer1.style.justifyContent = "center";
        subContainer1.style.gap = "10px";
        subContainer1.style.padding = "0";
        subContainer1.style.border = "none";

        subContainer1.appendChild(cont1);
        subContainer1.appendChild(cont2);

        const subContainer2 = LayoutUtils.createContainer("99.75%", "78%");  
        subContainer2.style.display = "flex";
        subContainer2.style.alignItems = "center";
        subContainer2.style.justifyContent = "center";
        subContainer2.style.gap = "10px";
        subContainer2.style.padding = "0";
        subContainer2.style.border = "none";

        subContainer2.appendChild(cont3);
        subContainer2.appendChild(cont4);

        parentContainer.appendChild(header);
        parentContainer.appendChild(subContainer1);
        parentContainer.appendChild(subContainer2);
        parentContainer.appendChild(footer);
        target.appendChild(parentContainer);
        break;
    }
  }

  public static createContainer (
    width: string, 
    height: string, 
    dragEnterHandler?: any, 
    dragLeaveHandler?: any, 
    dragOverHandler?: any, 
    dropHandler?: any
  ) {
    // Create a single div container.
    const div = document.createElement("div");
    div.style.width = width;
    div.style.height = height;
    div.style.padding = "10px";
    LayoutUtils.addRandomBorder(div);

    if (dragEnterHandler && dragLeaveHandler && dragOverHandler && dropHandler) {
      LayoutUtils.addDragDropHandlers(
        div, 
        dragEnterHandler, 
        dragLeaveHandler, 
        dragOverHandler, 
        dropHandler
      );  
    }

    return div;
  }

  public static addRandomBorder (el: any) {
    const borderColor = LayoutUtils.getRandomBorderColor();
    el.style.border = `1px solid ${borderColor}`;
  }

  public static addDragDropHandlers (
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
    "#827717",
    "#F57F17",
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
