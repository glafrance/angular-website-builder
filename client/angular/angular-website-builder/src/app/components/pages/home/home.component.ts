import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";
import Constants from "../../../constants/constants";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  // Used in the HTML template to display one of two buttons
  // depending on whether or not the user is signed in.
  signedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    /* We subscribe to the auth service signed in observable to
        be updated on user signing in or signing out, to display
        the appropriate button to the user.
    */
    this.authService.getSignedInObservable().subscribe({
      next: (result: boolean) => {
        this.signedIn = result;
      },
      error: (err: any) => {
        console.log("HomeComponent - error getting updated signed in state");
      }
    });
  }

  // If user clicks to signup or signin we display the signup/signin popup.
  onSignupSignin() {
    this.authService.showSignupSignin(Constants.SIGNIN);    
  }

  // User cliced to go to their profile page, so navigate them to their
  // profile page programmatically.
  onVisitProfile() {
    this.router.navigateByUrl(Constants.ROUTER_URLS.USER_PROFILE);
  }
}