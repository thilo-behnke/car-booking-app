import { Injectable } from '@angular/core';
import { UserSearchService } from './user-search.service';
import { UserSearchParams, UserService } from '../services/user.service';
import { User } from '../model/User';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';

@Injectable()
export class DefaultUserSearchService implements UserSearchService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);

  users$ = this.usersSubject$.asObservable();

  constructor(private userService: UserService) {}

  searchByLastName(lastName: string): void {
    const searchParams = lastName
      ? ([{ param: 'last_name', value: lastName }] as UserSearchParams)
      : [];
    this.userService
      .getUsers(searchParams)
      .pipe(
        tap((users: User[]) => {
          this.usersSubject$.next(users);
        })
      )
      .subscribe();
  }
}
