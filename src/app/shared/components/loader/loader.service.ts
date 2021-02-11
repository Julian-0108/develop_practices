import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoaderService {

  private varLoading: boolean;
  public loadingStatus: any;

  constructor() {
    this.varLoading = false;
    this.loadingStatus = new Subject();
  }

  get loading(): boolean {
    return this.varLoading;
  }

  set loading(value) {
    this.varLoading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
