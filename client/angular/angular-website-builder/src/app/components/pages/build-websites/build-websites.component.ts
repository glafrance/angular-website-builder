import { Component, OnInit } from "@angular/core";

import Constants from "src/app/constants/constants";
import LayoutUtils from "src/app/utils/layout.utils";
import Utils from "src/app/utils/utils";

@Component({
  selector: "app-build-websites",
  templateUrl: "./build-websites.component.html",
  styleUrls: ["./build-websites.component.scss"]
})
export class BuildWebsitesComponent implements OnInit {
  showLayouts: boolean = false;
  tools: any;

  layoutIcons: any = [
    "../../../assets/images/layout-icons/single.png",
    "../../../assets/images/layout-icons/2col.png",
    "../../../assets/images/layout-icons/2row.png",
    "../../../assets/images/layout-icons/3col.png",
    "../../../assets/images/layout-icons/3row.png",
    "../../../assets/images/layout-icons/4col.png",
    "../../../assets/images/layout-icons/4row.png",
    "../../../assets/images/layout-icons/4cont.png",
    "../../../assets/images/layout-icons/hf.png",
    "../../../assets/images/layout-icons/hf2col.png",
    "../../../assets/images/layout-icons/hf2row.png",
    "../../../assets/images/layout-icons/hf3col.png",
    "../../../assets/images/layout-icons/hf3row.png",
    "../../../assets/images/layout-icons/hf4cont.png"
  ];

  ngOnInit(): void {
    this.tools = Constants.TOOLS;
  }

  getTooltip(iconPath: string) {
    if (iconPath) {
      const key = Utils.getToolKey(iconPath);

      if (key) {
        const item = this.tools.LAYOUT[key];

        if (item && item.tooltip) {
          return item.tooltip;
        }
      }
    }

    return "";
  }

  onShowLayouts() {
    this.showLayouts = true;
  }

  onHideLayouts() {
    this.showLayouts = false;
  }

  onDragStart(evt: any, imageUrl: string) {
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
      const key = Utils.getToolKey(data);

      if (key) {
        switch (key) {
          case "single":
            const singleContainer = LayoutUtils.createSingleContainer(
              "98.5%", 
              "97%", 
              this.onDragEnter, 
              this.onDragLeave, 
              this.onDragOver, 
              this.onDrop
            );

            if (singleContainer) {
              target.appendChild(singleContainer);
            }
            break;
        }
      }
    }
  }
}