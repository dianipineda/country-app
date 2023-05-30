import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './searchBox.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeHolder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        console.log('debaucer value', value);
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    //console.log('destruido');
    this.debouncerSubscription?.unsubscribe();
  }

  emitSearch(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    //console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }
}
