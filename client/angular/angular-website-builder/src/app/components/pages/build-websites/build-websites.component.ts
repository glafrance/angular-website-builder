import { Component } from "@angular/core";

@Component({
  selector: "app-build-websites",
  templateUrl: "./build-websites.component.html",
  styleUrls: ["./build-websites.component.scss"]
})
export class BuildWebsitesComponent {
  showLayouts: boolean = false;

  layoutIcons: any = [
    "../../../assets/images/layout-icons/single.png",
    "../../../assets/images/layout-icons/two-columns.png",
    "../../../assets/images/layout-icons/two-rows.png",
    "../../../assets/images/layout-icons/three-columns.png",
    "../../../assets/images/layout-icons/three-rows.png",
    "../../../assets/images/layout-icons/four-columns.png",
    "../../../assets/images/layout-icons/four-rows.png",
    "../../../assets/images/layout-icons/four-containers.png",
    "../../../assets/images/layout-icons/header-footer.png",
    "../../../assets/images/layout-icons/header-footer-two-columns.png",
    "../../../assets/images/layout-icons/header-footer-two-rows.png",
    "../../../assets/images/layout-icons/header-footer-three-columns.png",
    "../../../assets/images/layout-icons/header-footer-three-rows.png",
    "../../../assets/images/layout-icons/header-footer-four-containers.png"
  ];

  onShowLayouts() {
    this.showLayouts = true;
  }

  onHideLayouts() {
    this.showLayouts = false;
  }
}