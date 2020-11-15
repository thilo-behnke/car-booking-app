import { Injectable } from '@angular/core';
import { UserSearchParams, UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../../core/environment.service';
import { catchError, map } from 'rxjs/operators';
import { Car } from '../../car/model/Car';

@Injectable()
export class DefaultUserService implements UserService {
  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {}

  getUsers(params: UserSearchParams = []): Observable<User[]> {
    const queryParams = params.length
      ? '?' + params.map((param) => param.param + '=' + param.value)
      : '';
    return this.http
      .get<User[]>(
        this.environmentService.serverUrl + 'api/v1/users' + queryParams
      )
      .pipe(map((users) => users.map((user) => this.formatUser(user))));
  }

  getUserById(id: number): Observable<User | null> {
    return this.http
      .get<User>(`${this.environmentService.serverUrl}api/v1/users/${id}`)
      .pipe(
        map((user) => this.formatUser(user)),
        catchError(() => of(null))
      );
  }

  private formatUser(user: User) {
    const [year, month, day] = user.birthday as any;
    user.birthday = `${year}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return user;
  }
}
