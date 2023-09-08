import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import Constants from "src/app/constants/constants";
import LayoutUtils from "src/app/utils/layout.utils";
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

  tools: any;
  layoutSelected: boolean = false;


  layoutIcons: any = [];
  textToolIcons: any = [];

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.tools = Constants.TOOLS;
    this.layoutIcons = Constants.LAYOUT_ICONS;
    this.textToolIcons = Constants.TEXT_TOOL_ICONS;
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
    } else if (icon) {
      const key = Utils.getToolKey(icon);

      if (key) {
        let item;

        if (mode === "layout") {
          item = this.tools.LAYOUT[key];
        } else if (mode === "text") {
          item = this.tools.TEXT[key];
        }

        if (item && item.tooltip) {
          return item.tooltip;
        }
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

  onDragIconStart(evt: any, imageUrl: string) {
    const img = new Image();
    img.src = imageUrl;
    evt.dataTransfer.setDragImage(img, 0, 0);
    evt.dataTransfer.setData("text/plain", imageUrl);
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

    const data = evt.dataTransfer.getData("text/plain");

    if (data) {
      const key: string = Utils.getToolKey(data);

      if (key) {
        if (Constants.LAYOUT_KEYS.indexOf(key) !== -1) {
          LayoutUtils.addLayout(key, target, this.onDragEnter, this.onDragLeave, this.onDragOver, this.onDrop);
          this.layoutSelected = true;
          this.toastr.success("Colored borders will be removed on deploying website");
        } else if (Constants.TEXT_TOOL_KEYS.indexOf(key) !== -1) {
          ToolsUtils.addElement(target, key);
        }  
      }
    }
  }
}