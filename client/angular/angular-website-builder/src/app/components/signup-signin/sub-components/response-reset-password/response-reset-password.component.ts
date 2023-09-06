import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "src/app/services/auth.service";
import Constants from "../../../../constants/constants";
import { UserService } from "src/app/services/user.service";
import Utils from "../../../../utils/utils";
import ValidationUtils from "src/app/utils/validationUtils";

@Component({
  selector: "app-response-reset-password",
  templateUrl: "./response-reset-password.component.html",
  styleUrls: ["./response-reset-password.component.scss"]
})
export class ResponseResetPasswordComponent implements OnInit {
  // The token will be at the end of the reset password link that is in
  // the email sent to the user when they entered their email address
  // in the reset password request popup. In this component we will extract
  // that token and send it to the server for validation.
  token?: string;

  // Create the Angular reactive form for the password and password confirm fields.
  forgotPasswordForm: FormGroup = new FormGroup({
    password: new FormControl("", [
      Validators.required, 
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/)
    ]),
    passwordConfirm: new FormControl("")
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the password reset token from the browser url.
    if (this.route && this.route.snapshot && this.route.snapshot.params && this.route.snapshot.params["token"]) {
      this.token = this.route.snapshot.params["token"];
    }

    // Add the form-level password/password confirm matches validator.
    this.forgotPasswordForm.addValidators([ValidationUtils.passwordsMatch(this.password, this.passwordConfirm)]);
  }

  // Angular reactive form field getters.
  get password() { return this.forgotPasswordForm.get("password") };
  get passwordConfirm() { return this.forgotPasswordForm.get("passwordConfirm") };

  // Submit the new password to the backend so the user can change their password.
  submit() {
    if (this.password && this.password.value && this.token) {
      const password = this.password.value;
      const token = this.token;
      
      // First validate the password reset token that was taken from the browser url.
      // It is the token that was in the link in the email sent to the user's email
      // address when user entered their email in this application's request reset 
      // password popup.
      this.userService.validatePasswordToken(this.token).subscribe({
        next: (result: any) => {
          if (result && result[Constants.RESULT] && result[Constants.RESULT] === Constants.SUCCESS) {
            // If the token was valid then make a backend call to actually change the 
            // user's password to the one they entered in this component's form.s
            this.userService.getNewPassword(token, password).subscribe({
              next: (result: any) => {
                if (result && result[Constants.RESULT] && result[Constants.RESULT] === Constants.SUCCESS) {
                  this.toastr.success("Your password was successfully changed.", "Reset Password Success");
                  this.password?.reset();
                  this.passwordConfirm?.reset();
                  this.authService.showSignupSignin(Constants.SIGNIN);
                } else {
                  this.toastr.error("Something went wrong resetting your password, please try again. Reset password links are valid for one hour.", "Reset Password Failure");
                }
              },
              error: (result: any) => {
                this.toastr.error("Something went wrong resetting your password, please try again. Reset password links are valid for one hour.", "Reset Password Failure");
              }
            });        
          }
        },
        error: (err: any) => {
          this.toastr.error("Something went wrong resetting your password, please try again. Reset password links are valid for one hour.", "Reset Password Failure");
        }
      });
    }
  }

  // Submit button should only be enabled if user entered a properly formatted 
  // email address, and the password/password confirm fields values match.
  disableButtons() {
    let disabled = true;
    const passwordInvalid = Utils.isInvalid(this.password);
    const formInvalid = Utils.isInvalid(this.forgotPasswordForm);

    disabled = (passwordInvalid || formInvalid);

    return disabled;
  }
}
