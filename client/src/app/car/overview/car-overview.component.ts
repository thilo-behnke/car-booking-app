import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'car-overview',
  styleUrls: ['./car-overview.component.scss'],
  template: `
    <div class="car-overview-component">
      <button
        mat-button
        mat-raised-button
        color="primary"
        class="create-car-button"
        (click)="goToCreate()"
      >
        <span style="font-size: 18px" class="material-icons"> create </span>
        <span style="margin-left: 5px">Create new Car</span>
      </button>
      <car-list class="car-list"></car-list>
    </div>
  `,
})
export class CarOverviewComponent {
  constructor(private router: Router) {}

  goToCreate() {
    this.router.navigate(['cars', 'create']);
  }
}
