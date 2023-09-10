import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import Constants from "src/app/constants/constants";
import LayoutUtils from "src/app/utils/layout.utils";
import { PropertyService } from "src/app/services/property.service";
import ToolsUtils from "src/app/utils/tools.utils";
import Utils from "src/app/utils/utils";

@Component({
  selector: "app-build-websites",
  templateUrl: "./build-websites.component.html",
  styleUrls: ["./build-websites.component.scss"]
})
export class BuildWebsitesComponent implements OnInit {
  showLayouts: boolean = false;
  showTextControls: boolean = false;
  layoutSelected: boolean = false;
  showSidePanel: boolean = false;
  sidePanelTarget: any;

  itemProperties: any = [];
  layoutItems: any = [];
  textElementItems: any = [];

  constructor(
    private propertyService: PropertyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.itemProperties = Constants.ITEM_PROPERTIES;

    this.layoutItems = this.itemProperties.filter((item: any) => {
      return item.type === "layout";
    });

    this.textElementItems = this.itemProperties.filter((item: any) => {
      return item.type === "text";
    });

    [...this.layoutItems, ...this.textElementItems].forEach((item: any) => {
      item["iconPath"] = `../../assets/images/icons/${item.key}.png`;
    });
  }

  getTooltip(mode: string, icon?: string) {
    if (mode === "layout_icon") {
      if (!this.layoutSelected) {
        return "Layout Containers";
      } else {
        return "Layout container already selected";
      }
    } else if (mode === "text_controls") {
      if (this.layoutSelected) {
        return "Text Elements"
      } else {
        return "Please drag a layout container first";
      }
    }

    return "";
  }

  onShowLayouts() {
    this.onHideToolbarDetails();
    this.showLayouts = true;
  }

  onHideToolbarDetails() {
    this.showLayouts = false;
    this.showTextControls = false;
  }

  onShowTextControls() {
    this.onHideToolbarDetails();
    this.showTextControls = true;
  }

  onDragIconStart(evt: any, item: any) {
    const iconPath = item.iconPath;
    const img = new Image();
    img.src = iconPath;
    evt.dataTransfer.setDragImage(img, 0, 0);
    evt.dataTransfer.setData("text/plain", JSON.stringify(item));
  }

  onDragEnter(evt: any) {
    const el = evt.target;
    el.classList.add("dragging-over");
  }

  onDragLeave(evt: any) {
    const el = evt.target;
    el.classList.remove("dragging-over");
  }

  onDragOver(evt: any) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  onDrop(evt: any) {
    evt.stopPropagation();
    evt.preventDefault();
    const target = evt.target;
    target.classList.remove("dragging-over");

    const item = JSON.parse(evt.dataTransfer.getData("text/plain"));

    if (item) {
      if (item.key) {
        if (item.type === "layout") {
          LayoutUtils.addLayout(item.key, target, this.onDragEnter, this.onDragLeave, this.onDragOver, this.onDrop);
          this.layoutSelected = true;
          this.toastr.success("Colored borders will be removed on deploying website");
        } else if (item.type === "text") {
          this.propertyService.resetPropertyPane();
          ToolsUtils.addElement(target, item, this.openSidePanelHandler);
        }  
      }
    }
  }

  closeSidePanel() {
    this.showSidePanel = false;
  }

  openSidePanelHandler = (el: any) => {
    if (el) {
      this.sidePanelTarget = el;
      this.showSidePanel = true;
    }
  }
}