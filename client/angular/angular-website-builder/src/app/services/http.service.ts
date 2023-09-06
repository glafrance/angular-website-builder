// This service centralizes code to call the backend
// to make API calls, which results in less duplicated 
// code and reduces the possibility of coding errors.

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {shareReplay } from 'rxjs/operators'

import Constants from "../constants/constants";
import Utils from "../utils/utils";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  // This is the method components call to make an API call.
  // the config must have the API url and the HTTP method
  // (GET, POST, DELETE, PUT), and might have a data property
  // for example for POST and PUT calls, but it might also
  // have options for headers, etc.
  doHttp(config: any) {
    let result = new Observable();

    if (
      Utils.isNotNullOrUndefined(config) &&
      Utils.isNotNullOrUndefined(config.url) &&
      Utils.isNotNullOrUndefined(config.method)
    ) {
      const url = `${Constants.BASE_URL}/${config.url}`;
      // Now we call the method of this service that handles
      // the GET, POST, PUT, DELETE calls.
      result = this.callApi(url, config.method, config["data"], config["options"]);
    }

    return result;
  }

  // This method actually makes the API calls. Notice the defaults for the
  // data and options properties.
  callApi(url: string, method: string, data: any = {}, options: any = {}): Observable<any> {
    let result = new Observable();

    switch (method) {
      case Constants.HTTP_METHODS.GET:
        result = this.httpClient.get(url, options).pipe(shareReplay());
        break;
      case Constants.HTTP_METHODS.POST:
        result = this.httpClient.post(url, data, options).pipe(shareReplay());
        break;
      case Constants.HTTP_METHODS.DELETE:
        result = this.httpClient.delete(url, options).pipe(shareReplay());
        break;
      case Constants.HTTP_METHODS.PUT:
        result = this.httpClient.put(url, data, options).pipe(shareReplay());
        break;
    }

    return result;
  }
}