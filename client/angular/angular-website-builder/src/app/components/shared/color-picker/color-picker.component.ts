import { Component, OnInit } from "@angular/core";

import { colors } from "src/app/constants/colors";

@Component({
  selector: "app-color-picker",
  templateUrl: "./color-picker.component.html",
  styleUrls: ["./color-picker.component.scss"]
})
export class ColorPickerComponent implements OnInit {
  colorInPalette: any = [];
  selectedColor: any;

  ngOnInit(): void {
    this.colorInPalette = colors;
    this.selectedColor = colors[0];
  }
}

