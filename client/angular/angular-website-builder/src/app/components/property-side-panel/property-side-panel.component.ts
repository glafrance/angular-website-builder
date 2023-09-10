import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import Constants from "src/app/constants/constants";
import { PropertyService } from "src/app/services/property.service";
import ToolsUtils from "src/app/utils/tools.utils";
import Utils from "src/app/utils/utils";

@Component({
  selector: "app-property-side-panel",
  templateUrl: "./property-side-panel.component.html",
  styleUrls: ["./property-side-panel.component.scss"]
})
export class PropertySidePanelComponent implements OnInit {
  _elem: any;

  get elem(): any {
    return this._elem;
  }

  @Input() set elem(value: any) {
      this._elem = value;
      this.processElemProperties();
  }

  @Output() closeSidePanelEvt: EventEmitter<null> = new EventEmitter<null>();

  elementProperties: any = {
    "tagName": "",
    "textContent": "",
    "font-size": "",
    "color": "",
    "background-color": "",
    "border-width": 0,
    "border-style": "",
    "border-color": ""
  };

  textColorLabel: string = "Text color: ";
  backgroundColorLabel: string = "Background color: ";
  borderColorLabel: string = "Border color: ";

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getResetPropertyPaneObservable().subscribe({
      next: (result) => {
        if (result) {
          this.resetPanel();
        }
      },
      error: (err: any) => {
        console.log("Error getting reset panel notification", err);
      }
    });
  }

  processElemProperties(): void {
    if (this._elem) {
      if (this._elem.tagName) {
        this.elementProperties.tagName = this._elem.tagName;
      }

      if (this._elem.textContent) {
        this.elementProperties.textContent = this._elem.textContent;
      }

      this.elementProperties["font-size"] = ToolsUtils.getElementPropertyValue(this._elem, 'font-size');
      this.elementProperties["color"] = ToolsUtils.getElementPropertyValue(this._elem, 'color');
      this.elementProperties["background-color"] = ToolsUtils.getElementPropertyValue(this._elem, 'background-color');
      this.elementProperties["border-color"] = ToolsUtils.getElementPropertyValue(this._elem, 'border-color');
      this.elementProperties["border-width"] = ToolsUtils.getElementPropertyValue(this._elem, 'border-width');
      this.elementProperties["border-style"] = ToolsUtils.getElementPropertyValue(this._elem, 'border-style');
    }
  }

  onPropertyChange(value: any, prop: string) {
    if (prop === "text") {
      if (value === "") {
        this._elem.textContent = Constants.ADD_TEXT_HERE;
      } else {
        this._elem.textContent = value;
      }
      this.elementProperties.textContent = this._elem.textContent;
    } else {      
      this.elementProperties[prop] = value;

      if (Constants.PROPERTY_PIXEL_VALUES[prop]) {
        this._elem.style[prop] = `${value}px`;
      } else {
        this._elem.style[prop] = value;
      }  
    }
  }

// } else if (prop === "background-color") {
//   this._elem.style.backgroundColor = value;
//   this.elementProperties["background-color"] = value;
// } else if (prop === "font-size") {
//   this._elem.style.fontSize = `${value}px`;
//   this.elementProperties["font-size"] = value;
// } else if (prop === "border-width") {
//   this._elem.style.borderWidth = `${value}px`;
//   this.elementProperties["border-width"] = value;
// } else if (prop === "border-style") {
//   this._elem.style.borderStyle = value;
//   this.elementProperties["border-style"] = value;
// } else if (prop === "border-color") {
//   this._elem.style.borderColor = value;
//   this.elementProperties["border-color"] = value;
// }

  // onPropertyChange(value: any, prop: string) {
  //   if (prop === "text") {
  //     if (value === "") {
  //       this._elem.textContent = Constants.ADD_TEXT_HERE;
  //     } else {
  //       this._elem.textContent = value;
  //     }
  //     this.elementProperties.textContent = this._elem.textContent;
  //   } else {
  //     this._elem.style[prop] = value;
  //     this.elementProperties[prop] = value;
  //   }
  // }

  resetPanel() {
    this._elem = null;

    this.elementProperties.textContent = "";
    this.elementProperties["font-size"] = 16;
    this.elementProperties.color = "#000000";
    this.elementProperties["background-color"] = "#000000";
    this.elementProperties["border-width"] = 0;
    this.elementProperties["border-style"] = "none";
    this.elementProperties["border-color"] = "#000000";

    this.onCloseSidePanel();
  }

  onCloseSidePanel() {
    this.closeSidePanelEvt.emit();
  }
}
