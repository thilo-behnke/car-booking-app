import { Component } from '@angular/core';
import { UserSearchService } from '../search/user-search.service';
import { DefaultUserSearchService } from '../search/default-user-search.service';

@Component({
  selector: 'user-overview',
  styleUrls: ['./user-overview.component.scss'],
  template: `
    <div class="user-overview-container">
      <user-search class="user-search"></user-search>
      <user-list class="user-list"></user-list>
    </div>
  `,
})
export class UserOverviewComponent {}
