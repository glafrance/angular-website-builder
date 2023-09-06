import { Component, OnInit } from '@angular/core';

import { AuthService } from "./services/auth.service";
import Constants from "./constants/constants";
import { LocalStorageService } from "./services/local-storage.service";
import Utils from "./utils/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const signedIn = this.localStorageService.getFromLocalStorage(Constants.SIGNED_IN_LOCAL_STORAGE_KEY);
    const userId = this.localStorageService.getFromLocalStorage(Constants.USER_ID_LOCAL_STORAGE_KEY);

    if (Utils.isNotNullOrUndefined(signedIn) && !!signedIn) {
      this.authService.setSignedIn(true, userId);
    }
  }
}
