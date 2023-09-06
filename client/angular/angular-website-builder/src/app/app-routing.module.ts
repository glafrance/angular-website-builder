// This file handles Angular application routing:
// https://angular.io/guide/routing-overview
// https://angular.io/guide/router

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuildWebsitesComponent } from "./components/pages/build-websites/build-websites.component";
import Constants from "./constants/constants";
import { HomeComponent } from "./components/pages/home/home.component";
import { ResponseResetPasswordComponent } from "./components/signup-signin/sub-components/response-reset-password/response-reset-password.component";
import { signedInGuard } from "./guards/signedIn.guard";
import { UserProfileComponent } from "./components/pages/user-profile/user-profile.component";

/*
  Empty path redirects to home component.
  
  User profile component is guard protected, so if user is not 
  signed in they will be redirected to the home component.

  Unknown paths are redirected to the home component.
 */
const routes: Routes = [
  { path: "", redirectTo: Constants.ROUTER_URLS.HOME, pathMatch: "full" },
  { path: Constants.ROUTER_URLS.HOME, component: HomeComponent },
  { 
    path: Constants.ROUTER_URLS.USER_PROFILE, 
    component: UserProfileComponent,
    canActivate: [signedInGuard]
  },
  { 
    path: Constants.ROUTER_URLS.BUILD_WEBSITES, 
    component: BuildWebsitesComponent,
    canActivate: [signedInGuard]
  },
  {
      path: `${Constants.ROUTER_URLS.RESPONSE_RESET_PASSWORD}/:token`,
      component: ResponseResetPasswordComponent
  },
  { path: "**", redirectTo: Constants.ROUTER_URLS.HOME }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
