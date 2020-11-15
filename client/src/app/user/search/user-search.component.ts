import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../model/User';
import { debounceTime, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { UserSearchService } from './user-search.service';

@Component({
  selector: 'user-search',
  styleUrls: ['./user-search.component.scss'],
  template: `
    <form>
      <mat-form-field class="search-bar">
        <div class="search-bar__form-content">
          <input
            type="text"
            placeholder="Search for last name"
            aria-label="Number"
            matInput
            [formControl]="userSearchControl"
            [matAutocomplete]="auto"
          />
          <mat-autocomplete #auto="matAutocomplete">
            <mat-option
              *ngFor="let option of users$ | async"
              [value]="option.lastName"
            >
              {{ option.firstName + ' ' + option.lastName }}
            </mat-option>
          </mat-autocomplete>
          <button
            type="button"
            (click)="clear()"
            mat-button
            mat-raised-button
            color="primary"
          >
            <span style="font-size: 18px" class="material-icons"> clear </span>
            <span style="margin-left: 5px">Clear</span>
          </button>
        </div>
      </mat-form-field>
    </form>
  `,
})
export class UserSearchComponent implements OnInit, OnDestroy {
  userSearchControl = new FormControl();
  users$: Observable<User[]>;

  private destroy$ = new Subject();

  constructor(public userSearchService: UserSearchService) {}

  ngOnInit() {
    this.users$ = this.userSearchService.users$;
    // Update search with value from input.
    this.userSearchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith(''),
        debounceTime(200),
        tap((lastName) => this.userSearchService.searchByLastName(lastName))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  clear() {
    this.userSearchControl.setValue('');
  }
}
