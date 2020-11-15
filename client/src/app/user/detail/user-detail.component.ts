import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserSearchService } from '../search/user-search.service';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-detail',
  styleUrls: ['./user-detail.component.scss'],
  template: `
    <div class="user-detail_container">
      <form class="user-detail_form" [formGroup]="userReadonlyForm">
        <mat-form-field class="user-detail_form-field" appearance="outline">
          <mat-label>Id</mat-label>
          <input matInput formControlName="id" id="id" [readonly]="true" />
        </mat-form-field>
        <mat-form-field class="user-detail_form-field" appearance="outline">
          <mat-label>First Name</mat-label>
          <input
            matInput
            formControlName="firstName"
            id="firstName"
            [readonly]="true"
          />
        </mat-form-field>
        <mat-form-field class="user-detail_form-field" appearance="outline">
          <mat-label>Last Name</mat-label>
          <input
            matInput
            formControlName="lastName"
            id="lastName"
            [readonly]="true"
          />
        </mat-form-field>
        <mat-form-field class="user-detail_form-field" appearance="outline">
          <mat-label>Email</mat-label>
          <input
            matInput
            formControlName="email"
            id="email"
            [readonly]="true"
          />
        </mat-form-field>
        <mat-form-field class="user-detail_form-field" appearance="outline">
          <mat-label>Birthday</mat-label>
          <input
            matInput
            formControlName="birthday"
            id="birthday"
            [readonly]="true"
            type="date"
          />
        </mat-form-field>
      </form>
    </div>
  `,
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;

  userReadonlyForm = this.formBuilder.group({
    id: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    birthday: [''],
  });

  private destroy$ = new Subject();

  constructor(
    private userService: UserService,
    private userSearchService: UserSearchService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.subscribeUserChange();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  private subscribeUserChange() {
    combineLatest([this.userSearchService.users$, this.route.paramMap])
      .pipe(
        takeUntil(this.destroy$),
        switchMap(([users, paramMap]) => {
          const id = paramMap.get('id');
          const user = users.find(
            (user) => user.id.toString() === id.toString()
          );
          // If the user is not yet cached, try to retrieve it from the server.
          return user ? of(user) : this.userService.getUserById(parseInt(id));
        }),
        filter((user) => !!user),
        tap((user) => {
          this.setUser(user);
        })
      )
      .subscribe();
  }

  private setUser(user: User) {
    this.user = user;
    this.userReadonlyForm.setValue(user);
  }
}
