import { Component, ElementRef, HostListener, Input } from "@angular/core";

@Component({
  selector: "app-text-toolbar",
  templateUrl: "./text-toolbar.component.html",
  styleUrls: ["./text-toolbar.component.scss"]
})
export class TextToolbarComponent {
  @Input() fontSizeModel: any;
  @Input() textColorModel: any;
  @Input() textBackgroundColorModel: any;
  @Input() changeCallback: any;
  @HostListener("document:click", ["$event"])
  documentClickListener(evt: any) {
    if (!this.elem.nativeElement.contains(evt.target)) {
      this.showFontSizeEditor = false;
      this.showTextColorEditor = false;
      this.showTextBackgroundColorEditor = false;
    }
  }

  textColorLabel: string = "Text color: ";
  backgroundColorLabel: string = "Background color: ";

  showFontSizeEditor: boolean = false;
  showTextColorEditor: boolean = false;
  showTextBackgroundColorEditor: boolean = false;

  constructor(private elem: ElementRef) {}

  onClickFontSize() {
    this.showTextColorEditor = false;
    this.showTextBackgroundColorEditor = false;
    
    this.showFontSizeEditor = !this.showFontSizeEditor;
  }

  onClickTextColor() {
    this.showFontSizeEditor = false;
    this.showTextBackgroundColorEditor = false;

    this.showTextColorEditor = !this.showTextColorEditor;
  }

  onClickTextBackgroundColor() {
    this.showFontSizeEditor = false;
    this.showTextColorEditor = false;

    this.showTextBackgroundColorEditor = !this.showTextBackgroundColorEditor;
  }

  onChangeProperty(value: any, property: string) {
    if (this.changeCallback) {
      this.changeCallback(value, property);
    }
  }
}
