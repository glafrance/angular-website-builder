import { Component, Input } from "@angular/core";

@Component({
  selector: "app-align-text-toolbar",
  templateUrl: "./align-text-toolbar.component.html",
  styleUrls: ["./align-text-toolbar.component.scss"]
})
export class AlignTextToolbarComponent {
  @Input() selectedAlignment: any;
  @Input() changeCallback: any;

  onChangeProperty(value: any) {
    if (this.changeCallback) {
      this.changeCallback(value, "text-align");
    }
  }
}
