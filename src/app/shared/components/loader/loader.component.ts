import { Component, OnDestroy, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy, AfterViewInit {

  public mode = 'indeterminate';
  public value = 50;
  public loading: boolean;
  public loadingSubscription!: Subscription;
  public debounceTime!: number;


  constructor(
    public loaderService: LoaderService,
    private elmRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.loading = false;
  }
 
  ngAfterViewInit(): void {
    this.elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loaderService.loadingStatus
      .pipe(debounceTime(this.debounceTime))
      .subscribe((status: boolean) => {
        this.elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this.changeDetectorRef.detectChanges();
      });
  }
 
  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
