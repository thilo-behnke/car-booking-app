import { CarService } from './car.service';
import { Injectable } from '@angular/core';
import { Car } from '../model/Car';
import { EnvironmentService } from '../../core/environment.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../user/model/User';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DefaultCarService implements CarService {
  constructor(
    private httpClient: HttpClient,
    private environmentService: EnvironmentService
  ) {}

  getCars(): Observable<Car[]> {
    return this.httpClient
      .get<Car[]>(this.environmentService.serverUrl + 'api/v1/cars')
      .pipe(
        map((cars) =>
          cars.map((car) => this.formatCar(car))
        )
      );
  }

  getCarById(id: number): Observable<Car | null> {
    return this.httpClient
      .get<Car>(`${this.environmentService.serverUrl}api/v1/cars/${id}`)
      .pipe(
        map((cars) => (cars ? this.formatCar(cars) : cars)),
        catchError(() => of(null))
      );
  }

  createCar(cars: Car): Observable<Car> {
    return this.httpClient.post<Car>(
      `${this.environmentService.serverUrl}api/v1/cars`,
      cars
    );
  }

  private formatCar(car: Car) {
    const [year, month, day] = car.validTill as any;
    car.validTill = `${year}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return car;
  }

  isLicensePlateAvailable(licensePlate: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${this.environmentService.serverUrl}api/v1/cars/license_plate_available?name=${licensePlate}`
    );
  }
}
