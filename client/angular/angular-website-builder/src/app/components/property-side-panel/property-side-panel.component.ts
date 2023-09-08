import { Component, EventEmitter, Input, Output } from "@angular/core";

import Constants from "src/app/constants/constants";

@Component({
  selector: "app-property-side-panel",
  templateUrl: "./property-side-panel.component.html",
  styleUrls: ["./property-side-panel.component.scss"]
})
export class PropertySidePanelComponent {
  _elem: any;

  get elem(): any {
    return this._elem;
  }

  @Input() set elem(value: any) {
      this._elem = value;
      this.processElemProperties();
  }

  @Output() closeSidePanelEvt: EventEmitter<null> = new EventEmitter<null>();

  tagName?: string;
  elemText: any = "";
  elemStyles: any = {};

  processElemProperties(): void {
    if (this._elem) {
      if (this._elem.tagName) {
        this.tagName = this._elem.tagName;
      }

      if (this._elem.textContent) {
        this.elemText = this._elem.textContent;
      }

      if (this._elem.styles) {
        this.elemStyles = this._elem.styles;
      }
    }
  }

  onPropertyChange(prop: string, value: any) {
    if (prop === "text") {
      if (value === "") {
        this._elem.textContent = Constants.ADD_TEXT_HERE;
      } else {
        this._elem.textContent = value;
      }
    }
  }

  onCloseSidePanel() {
    this.closeSidePanelEvt.emit();
  }
}
