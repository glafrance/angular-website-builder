import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import Constants from "src/app/constants/constants";
import { PropertyService } from "src/app/services/property.service";
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
    tagName: "",
    textContent: "",
    "font-size": "",
    color: "",
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

      let fontSize: any = window.getComputedStyle(this._elem, null).getPropertyValue('font-size');
      fontSize = fontSize.replace("px", "");
      fontSize = parseFloat(fontSize);  
      this.elementProperties["font-size"] = fontSize;

      let color = window.getComputedStyle(this._elem, null).getPropertyValue('color');
      color = Utils.rgbToHex(color);
      this.elementProperties.color = color;
      
      let backgroundColor = window.getComputedStyle(this._elem, null).getPropertyValue('background-color');
      backgroundColor = Utils.rgbToHex(backgroundColor);
      this.elementProperties["background-color"] = backgroundColor;

      let borderWidth: any = window.getComputedStyle(this._elem, null).getPropertyValue('border-width');
      borderWidth = borderWidth.replace("px", "");
      borderWidth = parseFloat(borderWidth);  
      this.elementProperties["border-width"] = borderWidth;

      let borderStyle = window.getComputedStyle(this._elem, null).getPropertyValue('border-style');
      this.elementProperties["border-style"] = borderStyle;

      let borderColor = window.getComputedStyle(this._elem, null).getPropertyValue('border-color');
      borderColor = Utils.rgbToHex(borderColor);
      this.elementProperties["border-color"] = borderColor;
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
    } else if (prop === "text-color") {
      this._elem.style.color = value;
      this.elementProperties.color = value;
    } else if (prop === "background-color") {
      this._elem.style.backgroundColor = value;
      this.elementProperties["background-color"] = value;
    } else if (prop === "font-size") {
      this._elem.style.fontSize = `${value}px`;
      this.elementProperties["font-size"] = value;
    } else if (prop === "border-width") {
      this._elem.style.borderWidth = `${value}px`;
      this.elementProperties["border-width"] = value;
    } else if (prop === "border-style") {
      this._elem.style.borderStyle = value;
      this.elementProperties["border-style"] = value;
    } else if (prop === "border-color") {
      this._elem.style.borderColor = value;
      this.elementProperties["border-color"] = value;
    }
  }

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
