import { Component, Input } from "@angular/core";

@Component({
  selector: "app-user-manager-text",
  templateUrl: "./user-manager-text.component.html",
  styleUrls: ["./user-manager-text.component.scss"]
})
export class UserManagerText {
  // When using this component in the app, you can specify a font-size,
  // because in some areas you might want it large, other areas small.
  @Input() textFontSize: string = "20px";
}