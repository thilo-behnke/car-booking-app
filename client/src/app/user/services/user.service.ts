import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';

export type UserSearchParams = Array<{ param: 'last_name'; value: string }>;

@Injectable()
export abstract class UserService {
  abstract getUsers(params?: UserSearchParams): Observable<User[]>;
  abstract getUserById(id: number): Observable<User | null>;
}
