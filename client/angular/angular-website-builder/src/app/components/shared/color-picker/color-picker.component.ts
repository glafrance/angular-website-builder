import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";

import { colors } from "src/app/constants/colors";

@Component({
  selector: "app-color-picker",
  templateUrl: "./color-picker.component.html",
  styleUrls: ["./color-picker.component.scss"]
})
export class ColorPickerComponent implements OnInit {
  @Input() label: any;
  @Input() selectedColor: any;
  @Output() colorChanged: EventEmitter<string> = new EventEmitter<string>();
  @HostListener("document:click", ["$event"])
  DocumentClick(evt: Event) {
    if (!this.elem.nativeElement.contains(evt.target)) {
      this.showPalette = false;
    }
  }

  colorInPalette: any = [];
  showPalette: boolean = false;

  constructor(private elem: ElementRef) {}

  ngOnInit(): void {
    this.colorInPalette = colors;
  }

  toggleShowPalette() {
    this.showPalette = !this.showPalette;
  }  

  onSelectColor(col: string) {
    this.selectedColor = col;
    this.toggleShowPalette();
    this.colorChanged.emit(col);
  }
}
