import { Component, Input } from "@angular/core";

@Component({
  selector: "app-website-builder-text",
  templateUrl: "./website-builder-text.component.html",
  styleUrls: ["./website-builder-text.component.scss"]
})
export class WebsiteBuilderText {
  // When using this component in the app, you can specify a font-size,
  // because in some areas you might want it large, other areas small.
  @Input() textFontSize: string = "20px";
}