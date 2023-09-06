/* This Component is for a user profile page, where a user
    can update their information, such as email and password,
    address and phone numbers, profile image etc.
*/
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import Constants from "src/app/constants/constants";
import { UserService } from "src/app/services/user.service";
import Utils from "src/app/utils/utils";
import ValidationUtils from "src/app/utils/validationUtils";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  title: string = "Profile Page";
  subTitle: string = "Manage your information and settings on this page";

  // This allows us to enable the save profile button only when 
  // user has made changes to their profile data.
  formDataChanged: boolean = false;

  // Also want to enable the save profile button if user 
  // selected a different profile image.
  profileImageChanged: boolean = false;
  profileImageName: string = "";

  profileImage: any;
  fileToUpload?: File;
  profileImageSrc: any;

  bioBlurb: any = {
    errors: {
      minlength: false,
      maxLength: false
    },
    changed: false,
    touched: false,
    value: ""
  };

  /* When this page is first displayed we populate this object
     with user's current profile data, and we use this to
     detect if user has made any profile data changes.
  */
  originalData: any = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    homePhone: "",
    mobilePhone: "",
    workPhone: "",
    bioBlurb: ""
  };

  // Creating the Angular reactive form.
  userProfileForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/)
    ]),
    passwordConfirm: new FormControl(""),
    firstName: new FormControl("", [Validators.maxLength(30)]),
    lastName: new FormControl("", [Validators.maxLength(30)]),
    address: new FormControl("", [Validators.maxLength(50)]),
    address2: new FormControl("", [Validators.maxLength(30)]),
    city: new FormControl("", [Validators.maxLength(30)]),
    state: new FormControl("", [Validators.maxLength(2)]),
    postalCode: new FormControl("", [Validators.maxLength(10)]),
    homePhone: new FormControl("", [Validators.maxLength(10)]),
    mobilePhone: new FormControl("", [Validators.maxLength(10)]),
    workPhone: new FormControl("", [Validators.maxLength(10)])
  });

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    /* The validator checking if password and confirm password field values
       match is at the form level, and we use a custom validator:
         app/utils/validationUtils.ts
    */
    this.userProfileForm.addValidators([ValidationUtils.passwordsMatch(this.password, this.passwordConfirm)]);

    // This allows us to populate the page with current user profile data,
    // and to refresh the UI after user has saved profile data changes. 
    this.userService.getUserProfileObservable().subscribe({
      next: (result: any) => {
        if (result && result.data) {
          const data = result.data;

          if (data[Constants.BIO_BLURB]) {
            // The bio blurb is not managed by the reactive form,
            // so we set the value manually and then delete it,
            // so it doesn't interfere with updating the form values.
            this.bioBlurb.value = data[Constants.BIO_BLURB];
          }

          // Angular reactive form way of updating form data values.
          this.userProfileForm.patchValue({
            ...data
          });

          this.originalData = data;
        }
      },
      error: (err: any) => {
        console.log("UserProfileComponent - error getting user profile", err);
      }
    });

    // The profile image is not managed by the Angular reactive form
    // so we subscribe to changes to set the initial and updated image info.
    this.userService.getUserProfileImageObservable().subscribe({
      next: (result) => {
        if (result && result.data) {
          this.profileImageSrc = result.data;
        } else if (result && result.message) {
          console.log(result.message);
        }
      }, 
      error: (err: any) => {
        console.log("UserProfileComponent - error getting user profile image", err);
      }
    });

    // Here we get the current user profile data and user profile image
    // data when this page first renders.
    this.userService.getUserProfile();
    this.userService.getUserProfileImage();
  }

  // Angular reactive form getters for form fields.
  get email() { return this.userProfileForm.get("email") };
  get password() { return this.userProfileForm.get("password") };
  get passwordConfirm() { return this.userProfileForm.get("passwordConfirm") };
  get firstName() { return this.userProfileForm.get("firstName") };
  get lastName() { return this.userProfileForm.get("lastName") };
  get address() { return this.userProfileForm.get("address") };
  get address2() { return this.userProfileForm.get("address2") };
  get city() { return this.userProfileForm.get("city") };
  get state() { return this.userProfileForm.get("state") };
  get postalCode() { return this.userProfileForm.get("postalCode") };
  get homePhone() { return this.userProfileForm.get("homePhone") };
  get mobilePhone() { return this.userProfileForm.get("mobilePhone") };
  get workPhone() { return this.userProfileForm.get("workPhone") };

  // Method to compare a changed form field value with the original
  // value when page was first loaded, to detect if user made any
  // changes to their profile data.
  dataChanged(evt: any, field: string) {
    let value = evt.target.value;    

    if (Utils.isNotNullOrUndefinedOrEmpty(value) && value["trim"]) {
      value = value.trim();
    }

    if (field === Constants.PROFILE_IMAGE) {
      this.profileImageChanged = value !== this.profileImageName;
    } else {  
      const originalValue = this.originalData[field];
  
      this.formDataChanged = (value !== originalValue);
  
      // Bio blurb is not managed by the reactive form, 
      // so we check for differences differently.
      if (field === "bioBlurb") {
        this.bioBlurb.value = value;
  
        this.bioBlurb.changed = (value !== originalValue);
  
        // If the value changed, reset any bio blurb min and max length errors.
        this.bioBlurb.errors.minlength = false;
        this.bioBlurb.errors.maxlength = false;
  
        // After resetting bio blurb length errors, check 
        // length of new value to trigger errors if necessary.
        if (Utils.isNotNullOrUndefinedOrEmpty(value)) {
          this.bioBlurb.errors.minlength = value.length < 50;
          this.bioBlurb.errors.maxlength = value.length > 1000;  
        }
      }  
    }
  }

  // The submit button should be disabled under these conditions:
  //    - user has changed nothing on the form, has not changed bio blurb, and has not selected a file for upload
  //    - user has changed data on form, and form is invalid
  //    - user has changed bio blurb and it is either too short or too long
  //
  // Button should not be disabled if:
  //    - user has selected image for upload OR
  //    - user has changed bio blurb and has no errors (not too short or too long) OR
  //    - user has changed form data and there form is valid
  disableButton() {
    const userChangedFormData = this.formDataChanged;
    const profileImageChanged = this.profileImageChanged;
    const formIsInvalid = this.userProfileForm.invalid;
    const userSelectedImage = Utils.isNotNullOrUndefined(this.fileToUpload);
    const userChangedBioBlurb = this.bioBlurb.changed;
    const bioBlurbErrors = this.bioBlurb.errors.minlength || this.bioBlurb.errors.maxlength;

    if (
      !userChangedFormData && 
      !userChangedBioBlurb && 
      !userSelectedImage &&
      !profileImageChanged
    ) {
      return true;
    }

    if (userChangedFormData && formIsInvalid) {
      return true;
    }

    if (userChangedBioBlurb && bioBlurbErrors) {
      return true;
    }

    return false;
  }

  // Bio blurb is not controlled by the reactive form, 
  // so we manage its touched property manually.
  onBioBlurbBlur() {
    this.bioBlurb.touched = true;
  }

  // Process the image user has selected for upload.
  // This allows us to show the image in the profile
  // page before they upload.
  onSelectImage(evt: any) {
    const fileInput = evt.target;

    if (
      Utils.isNotNullOrUndefined(fileInput) &&
      fileInput.files &&
      fileInput.files.length
    ) {
      const files = fileInput.files;
      const profileImageFile = files[0];
      const name = profileImageFile.name;
      this.profileImageName = name;
      const size = profileImageFile.size;

      if (size > 1048576) {
        this.toastr.error("Profile images must be 1MB (1048576 bytes) or less", "ERROR - File Size");
      } else {
        this.fileToUpload = profileImageFile;

        if (FileReader && profileImageFile) {
          const self = this;
          const fr = new FileReader();

          fr.onload = function () {
              self.profileImageSrc = fr.result;
          }
          fr.readAsDataURL(profileImageFile);
        }        
      }
    }
  }

  // Submit user profile changes, form data and profile image.
  submitUserProfile() {
    const data = this.getValidProfileData();

    if (this.fileToUpload && this.profileImageChanged) {
      this.userService.uploadUserProfileImage(this.fileToUpload).subscribe({
        next: (result: any) => {
          // console.log(result);
          if (result) {                    
            this.toastr.success("Your profile image was successfully changed.", "Profile Image Changed");
          } else {
            console.log("UserService - error uploading user profile image, no result");
          }
        },
        error: (err: any) => {
          this.toastr.error("Error changing your profile image.", "Error Changing Image");
        }
      });
    }
    
    if (this.formDataChanged) {
      this.userService.setUserProfile(data);
    }

    this.formDataChanged = false;
    this.profileImageChanged = false;
    this.fileToUpload = undefined;
    this.bioBlurb.changed = false;
    this.bioBlurb.touched = false;
    this.bioBlurb.errors.minlength = false;
    this.bioBlurb.errors.maxlength = false;

  }

  // User to get the user profile form data.
  getValidProfileData() {
    let data = this.userProfileForm.value;

    if (
      data && 
      Object.keys(data) && 
      Object.keys(data).length
    ) {
      for (let key of Object.keys(data)) {
        // Delete data values whose values are null, undefined, or empty.
        if (Utils.isNullOrUndefinedOrEmpty(data[key])) {
          delete data[key];
        }
      }
    }

    // Bio blurb is not managed by the Angular reactive form,
    // so add the bio blurb to the data.
    if (this.bioBlurb.value) {
      data[Constants.BIO_BLURB] = this.bioBlurb.value;
    }

    return data;
  }
}
