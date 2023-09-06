import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/services/auth.service";
import Constants from "../../constants/constants";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"]
})
export class AppHeaderComponent implements OnInit {
  // Used to conditionally show Signup/Signin or Signout in the header,
  // depending on whether or not the user is signed in.
  signedIn: boolean = false;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    // We subscribe to the authService signed in observable to be notified 
    // if user has signed in or has signed out. This will automatically 
    // change displaying Signup/Signin or Signout in the app header.
    this.authService.getSignedInObservable().subscribe({
      next: (result: boolean) => {
        this.signedIn = result;
      },
      error: (err: any) => {
        console.log("AppHeader - error getting updated signed in state");
      }
    });
  }

  onSignupSignin() {
    // User clicked Signup/Signin so display the popup they will use to either signup or signin.
    this.authService.showSignupSignin(Constants.SIGNIN);
  }

  onSignout() {
    // User clicked Signout so sign the user out.
    this.authService.signOut();
  }
}