// Authentication service handling signup/signin,
// and also a method to show the signup/signin popup.

import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";

import Constants from "../constants/constants";
import { HttpService } from "./http.service";
import { LocalStorageService } from "./local-storage.service";
import { SignupSigninComponent } from "../components/signup-signin/signup-signin.component";
import Utils from "../utils/utils";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public dialog: MatDialog,
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ///////////////////////// START SIGNUP/SIGNIN SECTION //////////////////////////
  // Call the backend to signup the user.
  signUp(config: any): Observable<any> {
    let result = new Observable();

    if (
      Utils.isNotNullOrUndefined(config) && 
      Utils.isNotNullOrUndefined(config.email) &&
      Utils.isNotNullOrUndefined(config.password)
    ) {
      const apiConfig = {
        url: Constants.API_ENDPOINTS.SIGNUP,
        method: Constants.HTTP_METHODS.POST,
        data: {
          email: config.email,
          password: config.password
        },
        options: {
          withCredentials: true
        }
      };

      result = this.httpService.doHttp(apiConfig);
    } else {
      console.log("Unable to signup user, missing email, password, or both")
    }

    return result;
  }

  // Call the backend to signin the user.
  signIn(config: any): Observable<any> {
    let result = new Observable();

    if (
      Utils.isNotNullOrUndefined(config) && 
      Utils.isNotNullOrUndefined(config.email) &&
      Utils.isNotNullOrUndefined(config.password)
    ) {
      const apiConfig = {
        url: Constants.API_ENDPOINTS.SIGNIN,
        method: Constants.HTTP_METHODS.POST,
        data: {
          email: config.email,
          password: config.password
        },
        options: {
          withCredentials: true
        }
      };

      result = this.httpService.doHttp(apiConfig);
    } else {
      console.log("Unable to signin user, missing email, password, or both")
    }

    return result;
  }

  // BehaviorSubject components can subscribe to in order to be notified 
  // when user has signed in. This is because signing in is asynchronous
  // and they need to broadcast when user has signed in.
  _signedInObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _isSignedIn: boolean = false;

  // Components call this method, and subscribe to the returned value, providing an 
  // object with two properties, next and error, these property values are callbacks
  // executed if the signin process succeeds or errors out. Note that even on signout,
  // the "next" property callback will execute, and the supplied result will be false,
  // meaning not signed in.
  getSignedInObservable(): BehaviorSubject<boolean> {
    return this._signedInObservable;
  }

  // On successful signin in the signup/signin popup, that popup calls this method
  // to trigger the above BehaviorSubject to broadcast the signin result. Also on
  // signout this method is called to broadcast the signout result.
  setSignedIn(signedIn: boolean, userId?: any) {
    this._isSignedIn = signedIn;

    if (signedIn) {
      this.localStorageService.saveToLocalStorage(Constants.SIGNED_IN_LOCAL_STORAGE_KEY, signedIn);
      this.localStorageService.saveToLocalStorage(Constants.USER_ID_LOCAL_STORAGE_KEY, userId);
    } else {
      this.localStorageService.clearFromLocalStorage(Constants.SIGNED_IN_LOCAL_STORAGE_KEY);
      this.localStorageService.clearFromLocalStorage(Constants.USER_ID_LOCAL_STORAGE_KEY);
    }

    this._signedInObservable.next(signedIn);
  }

  // This method is a convenience method if a component needs to know if user
  // has signed in, but the asynchronous nature of signing in does not matter.
  getSignedIn(): boolean {
    return this._isSignedIn;
  }

  // Signout the user and navigate to the home component.
  signOut() {
    this.setSignedIn(false);
    this.router.navigateByUrl(Constants.ROUTER_URLS.HOME);
  }
  ////////////////////////// END SIGNUP/SIGNIN SECTION ///////////////////////////

  // Show the signup / signin popup component.
  showSignupSignin(mode: string): void {
    this.dialog.open(SignupSigninComponent, {
      data: { mode },
      autoFocus: false
    });
  }
}
