import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable()
export abstract class UserSearchService {
  abstract get users$(): Observable<User[]>;

  abstract searchByLastName(lastName: string): void;
}
