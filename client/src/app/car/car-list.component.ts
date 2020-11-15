import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './model/Car';
import { finalize, tap } from 'rxjs/operators';
import { TableColumnType } from '../components/model/enhanced-table-column';
import { User } from '../user/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'car-list',
  styleUrls: ['car-list.component.scss'],
  template: `
    <div class="car-list-container">
      <app-table
        [isLoading]="isLoading"
        [columns]="columns"
        [rows]="cars"
        (open)="openCar($event)"
      ></app-table>
    </div>
  `,
})
export class CarListComponent implements OnInit {
  public isLoading = false;
  public cars: Car[] = [];

  public columns = [
    { prop: 'id', type: TableColumnType.STRING },
    { prop: 'licensePlate', type: TableColumnType.STRING },
    { prop: 'vin', type: TableColumnType.STRING },
    { prop: 'model', type: TableColumnType.STRING },
    { prop: 'active', type: TableColumnType.STRING },
    { prop: 'color', type: TableColumnType.STRING },
    { prop: 'validTill', type: TableColumnType.DATE },
  ];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCars();
  }

  fetchCars(): void {
    this.isLoading = true;

    this.carService
      .getCars()
      .pipe(
        tap((car) => {
          this.cars = car;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  openCar(car: Car): void {
    this.router.navigate(['cars', car.id]);
  }
}
