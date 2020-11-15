import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { User } from './model/User';
import { UserService } from './services/user.service';
import {
  EnhancedTableColumn,
  TableColumnType,
} from '../components/model/enhanced-table-column';
import { UserSearchService } from './search/user-search.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'user-list',
  styleUrls: ['user-list.component.scss'],
  template: `
    <div class="user-list-container">
      <app-table
        [isLoading]="isLoading"
        [columns]="columns"
        [rows]="users"
        (open)="openUser($event)"
      >
      </app-table>
    </div>
  `,
})
export class UserListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public users: User[] = [];

  public columns: EnhancedTableColumn[] = [
    { prop: 'id', type: TableColumnType.STRING },
    { prop: 'firstName', type: TableColumnType.STRING },
    { prop: 'lastName', type: TableColumnType.STRING },
    { prop: 'email', type: TableColumnType.STRING },
    { prop: 'birthday', type: TableColumnType.DATE },
  ];

  private destroy$ = new Subject();

  constructor(
    private userSearchService: UserSearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;

    // Initial loading of users.
    this.userSearchService.users$
      .pipe(
        tap((users) => {
          this.users = users;
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  openUser(user: User): void {
    this.router.navigate(['users', user.id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
