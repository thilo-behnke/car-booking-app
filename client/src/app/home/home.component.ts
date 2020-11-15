import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h3>Welcome to my car booking app :)</h3>
    <span>Features:</span>
    <mat-selection-list>
      <mat-list-option *ngFor="let feature of features" [selected]="true">
        <span style="display: flex; align-items: center">
          <span class="material-icons" style="margin-right: 10px">
            {{ feature.type === 'client' ? 'devices' : 'dns' }}
          </span>
          {{ feature.name }}
        </span>
      </mat-list-option>
    </mat-selection-list>
  `,
})
export class HomeComponent {
  features = [
    {
      name: 'CRUD methods for managing cars through the REST api',
      type: 'server',
    },
    {
      name: 'CRUD methods for managing users through the REST api',
      type: 'server',
    },
    {
      name:
        'Validate car data on create (validTill must be a future date, all other fields are mandatory)',
      type: 'server',
    },
    {
      name: 'Limit result of users by last name parameter through REST api',
      type: 'server',
    },
    { name: 'Search for a user by name', type: 'client' },
    { name: 'Open user details', type: 'client' },
    {
      name: 'Custom material theming',
      type: 'client',
    },
    { name: 'Client form validation (car form)', type: 'client' },
    { name: 'Modular architecture with lazy loaded modules', type: 'client' },
  ];
}
