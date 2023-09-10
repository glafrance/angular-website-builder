import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PropertyService {
  _resetPropertyPaneObservable: Subject<boolean> = new Subject<boolean>();

  getResetPropertyPaneObservable(): Subject<boolean> {
    return this._resetPropertyPaneObservable;
  }

  resetPropertyPane() {
    this._resetPropertyPaneObservable.next(true);
  }
}
