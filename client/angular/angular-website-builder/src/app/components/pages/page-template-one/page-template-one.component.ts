import { Component, Input } from "@angular/core";

@Component({
  selector: "app-page-template-one",
  templateUrl: "./page-template-one.component.html",
  styleUrls: ["./page-template-one.component.scss"]
})
export class PageTemplateOneComponent {
  /* You provide a page title and optional subtitle as attributes
      when using this page template: 
    
      <app-page-template-one 
        [title]="title"
        [subTitle]="subTitle">
  */
  @Input() title?: string;
  @Input() subTitle?: string;
}