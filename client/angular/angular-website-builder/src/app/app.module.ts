import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


import { AppComponent } from './app.component';
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { BuildWebsitesComponent } from "./components/pages/build-websites/build-websites.component";
import { ColorPickerComponent } from "./components/shared/color-picker/color-picker.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { PageTemplateOneComponent } from "./components/pages/page-template-one/page-template-one.component";
import { PropertySidePanelComponent } from "./components/property-side-panel/property-side-panel.component";
import { RequestResetPasswordComponent } from "./components/signup-signin/sub-components/request-reset-password/request-reset-password.component";
import { ResponseResetPasswordComponent } from "./components/signup-signin/sub-components/response-reset-password/response-reset-password.component";
import { SignupSigninComponent } from "./components/signup-signin/signup-signin.component";
import { TextToolbarComponent } from "./components/shared/toolbars/text-toolbar/text-toolbar.component";
import { UserProfileComponent } from "./components/pages/user-profile/user-profile.component";
import { WebsiteBuilderText } from "./components/shared/website-builder-text/website-builder-text.component";

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    BuildWebsitesComponent,
    ColorPickerComponent,
    HomeComponent,
    PageTemplateOneComponent,
    PropertySidePanelComponent,
    RequestResetPasswordComponent,
    ResponseResetPasswordComponent,
    SignupSigninComponent,
    WebsiteBuilderText,
    TextToolbarComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
