import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

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

  colorInPalette: any = [];
  showPalette: boolean = false;

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
