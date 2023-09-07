import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

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
  layoutSelected: boolean = false;

  layoutIcons: any = [
    "../../../assets/images/layout-icons/single.png",
    "../../../assets/images/layout-icons/2col.png",
    "../../../assets/images/layout-icons/2row.png",
    "../../../assets/images/layout-icons/3col.png",
    "../../../assets/images/layout-icons/3row.png",
    "../../../assets/images/layout-icons/4col.png",
    "../../../assets/images/layout-icons/4row.png",
    "../../../assets/images/layout-icons/4cont.png",
    "../../../assets/images/layout-icons/hf2col.png",
    "../../../assets/images/layout-icons/hf2row.png",
    "../../../assets/images/layout-icons/hf3col.png",
    "../../../assets/images/layout-icons/hf3row.png",
    "../../../assets/images/layout-icons/hf4cont.png"
  ];

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.tools = Constants.TOOLS;
  }

  getTooltip(mode: string) {
    if (mode === "layout_icon") {
      if (!this.layoutSelected) {
        return "Layout Containers";
      } else {
        return "Layout container already selected";
      }
    } else {
      const key = Utils.getToolKey(mode);

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
      const key: string = Utils.getToolKey(data);

      if (key && Constants.LAYOUT_KEYS.indexOf(key) !== -1) {
        LayoutUtils.addLayout(key, target, this.onDragEnter, this.onDragLeave, this.onDragOver, this.onDrop);
        this.layoutSelected = true;
        this.toastr.success("Colored borders will be removed on deploying website");
      }
    }
  }
}