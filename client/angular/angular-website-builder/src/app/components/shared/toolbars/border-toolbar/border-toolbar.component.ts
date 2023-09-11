import { Component, ElementRef, HostListener, Input } from "@angular/core";

@Component({
  selector: "app-border-toolbar",
  templateUrl: "./border-toolbar.component.html",
  styleUrls: ["./border-toolbar.component.scss"]
})
export class BorderToolbarComponent {
  @Input() borderWidthModel: any;
  @Input() borderStyleModel: any;
  @Input() borderColorModel: any;
  @Input() changeCallback: any;
  @HostListener("document:click", ["$event"])
  documentClickListener(evt: any) {
    if (!this.elem.nativeElement.contains(evt.target)) {
      this.showBorderWidthEditor = false;
      this.showBorderStyleEditor = false;
      this.showBorderColorEditor = false;
    }
  }

  borderColorLabel: string = "Border color: ";

  showBorderWidthEditor: boolean = false;
  showBorderStyleEditor: boolean = false;
  showBorderColorEditor: boolean = false;

  constructor(private elem: ElementRef) {}

  onClickBorderWidth() {
    this.showBorderStyleEditor = false;
    this.showBorderColorEditor = false;

    this.showBorderWidthEditor = !this.showBorderWidthEditor;
  }

  onClickBorderStyle() {
    this.showBorderWidthEditor = false;
    this.showBorderColorEditor = false;

    this.showBorderStyleEditor = !this.showBorderStyleEditor;
  }

  onClickBorderColor() {
    this.showBorderWidthEditor = false;
    this.showBorderStyleEditor = false;

    this.showBorderColorEditor = !this.showBorderColorEditor;
  }

  onChangeProperty(value: any, property: string) {
    if (this.changeCallback) {
      this.changeCallback(value, property);
    }
  }
}
