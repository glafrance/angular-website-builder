// This service performs operations related to the user.
// Some operations like signup and signin are in auth service.

import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import Constants from "../constants/constants";
import { HttpService } from "./http.service";
import { LocalStorageService } from "./local-storage.service";
import Utils from "../utils/utils";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {}

  // User profile BehaviorSubject the profile page (and other pages if necessary)
  // can subscribe to in order to be notified if user profile changes.
  // For example, profile page user goes to in order to change user profile information
  // subscribes so when user submits changed profile data the profile page can 
  // be updated asynchronously when the data has been successfully changed on backend.
  _userProfileObservable: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Components call this method, and subscribe to the returned value, providing an 
  // object with two properties, next and error, these property values are callbacks
  // executed if the user profile update succeeds or errors out. 
  getUserProfileObservable(): BehaviorSubject<any> {
    return this._userProfileObservable;
  }

  // Call the HttpService to actually submit changes to update the user profile info.
  getUserProfile() {
    const userId = this.localStorageService.getFromLocalStorage(Constants.USER_ID_LOCAL_STORAGE_KEY);

    if (Utils.isNotNullOrUndefined(userId)) {
      const config = {
        url: `${Constants.API_ENDPOINTS.PROFILE}/${userId}`,
        method: Constants.HTTP_METHODS.GET,
        options: {
          withCredentials: true
        }
      };
  
      this.httpService.doHttp(config).subscribe({
        next: (result) => {
          if (result) {
            this._userProfileObservable.next(result);
          } else {
            console.log("UserService - error getting user profile, no result");
          }
        },
        error: (err) => {
          console.log("UserService - error getting user profile", err);
        }
      });
    }
  }

  // Call the HttpService to get the user profile information, for example when
  // user navigates to the user profile page to change information there.
  // Notice we first get the user ID stored in local storage. We do this because
  // if the user has not signed in then they cannot see their user profile info.
  setUserProfile(userData: any) {
    let resultObservable: any = new Observable();

    const userId = this.localStorageService.getFromLocalStorage(Constants.USER_ID_LOCAL_STORAGE_KEY);

    if (Utils.isNotNullOrUndefined(userId)) {
      const config = {
        url: `${Constants.API_ENDPOINTS.PROFILE}/${userId}`,
        method: Constants.HTTP_METHODS.POST,
        data: {
          data: userData
        },
        options: {
          withCredentials: true
        }
      };
  
      resultObservable = this.httpService.doHttp(config);

      if (resultObservable) {
        resultObservable.subscribe({
          next: (result: any) => {
            if (
              result && 
              result[Constants.RESULT] && 
              result[Constants.RESULT] === Constants.SUCCESS &&
              result[Constants.DATA]
            ) {
              this.toastr.success("Your profile changes were successfully submitted.", "Profile Changes Submitted");
              this._userProfileObservable.next(result[Constants.DATA]);
            }        
          },
          error: (err: any) => {
            this.toastr.error("Something went wrong submitting your profile changes, please try again.", "Error Submitting Profile");
          }
        });
      }  
    }

    return resultObservable;
  }

  // User profile image BehaviorSubject the profile page (and other pages if necessary)
  // can subscribe to in order to be notified if user profile image changes.
  _userProfileImageObservable: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Components call this method, and subscribe to the returned value, providing an 
  // object with two properties, next and error, these property values are callbacks
  // executed if the user profile image update succeeds or errors out. 
  getUserProfileImageObservable(): BehaviorSubject<any> {
    return this._userProfileImageObservable;
  }

  // Call the HttpService to get the user profile image.
  getUserProfileImage() {
    const userId = this.localStorageService.getFromLocalStorage(Constants.USER_ID_LOCAL_STORAGE_KEY);

    if (Utils.isNotNullOrUndefined(userId)) {
      const config = {
        url: `${Constants.API_ENDPOINTS.PROFILE_IMAGE}/${userId}`,
        method: Constants.HTTP_METHODS.GET,
        options: {
          withCredentials: true
        }
      };
  
      this.httpService.doHttp(config).subscribe({
        next: (result) => {
          if (result) {
            this._userProfileImageObservable.next(result);
          } else {
            console.log("UserService - error getting user profile image, no result");
          }
        },
        error: (err) => {
          console.log("UserService - error getting user profile image", err);
        }
      });
    }
  }

  // Call the HttpService to actually upload user profile image.
  uploadUserProfileImage(profileImage: File) {
    let resultObservable: any = new Observable();

    if (profileImage) {
      const userId = this.localStorageService.getFromLocalStorage(Constants.USER_ID_LOCAL_STORAGE_KEY);

      if (Utils.isNotNullOrUndefined(userId)) { 
        const formData = new FormData(); 
        formData.append("file", profileImage, profileImage.name);
  
        const config = {
          url: `${Constants.API_ENDPOINTS.PROFILE_IMAGE}/${userId}`,
          method: Constants.HTTP_METHODS.POST,
          data: formData,
          options: {
            withCredentials: true
          }
        };
    
        resultObservable = this.httpService.doHttp(config);
      }
    }

    return resultObservable;
  }

  // Call the HttpService to request a password reset email
  // be sent to the user supplied email address.
  requestResetPassword(email: string) {
    let resultObservable: any = new Observable();

    if (Utils.isNotNullOrUndefined(email)) { 
      const config = {
        url: `${Constants.API_ENDPOINTS.REQUEST_RESET_PASSWORD}`,
        method: Constants.HTTP_METHODS.POST,
        data: {
          email
        }
      };
  
      console.log(config);
      resultObservable = this.httpService.doHttp(config);
    }

    return resultObservable;
  }

  // Call the HttpService to actually reset the password.
  // We also send the reset password token that was extracted
  // from the password reset link in the email sent to the
  // user's email address so the server can validate this
  // is a valid password reset attempt.
  getNewPassword(resetToken: string, newPassword: string) {
    let resultObservable: any = new Observable();

    if (
      Utils.isNotNullOrUndefined(resetToken) && 
      Utils.isNotNullOrUndefined(newPassword)
    ) { 
      const config = {
        url: `${Constants.API_ENDPOINTS.RESPONSE_RESET_PASSWORD}`,
        method: Constants.HTTP_METHODS.POST,
        data: {
          resetToken,
          newPassword
        }
      };
  
      resultObservable = this.httpService.doHttp(config);
    }

    return resultObservable;
  }

  // Call the HttpService to make a backend API call
  // to validate the reset password token.
  validatePasswordToken(resetToken: string) {
    let resultObservable: any = new Observable();

    if (Utils.isNotNullOrUndefined(resetToken)) { 
      const config = {
        url: `${Constants.API_ENDPOINTS.VALIDATE_RESET_TOKEN}`,
        method: Constants.HTTP_METHODS.POST,
        data: {
          resetToken
        }
      };
  
      resultObservable = this.httpService.doHttp(config);
    }

    return resultObservable;
  }  
}
