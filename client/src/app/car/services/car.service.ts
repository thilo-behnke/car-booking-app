import { Injectable } from '@angular/core';
import { Car } from '../model/Car';
import { Observable } from 'rxjs';

@Injectable()
export abstract class CarService {
  abstract getCars(): Observable<Car[]>;
  abstract getCarById(id: number): Observable<Car | null>;
  abstract createCar(car: Car): Observable<Car>;
  abstract isLicensePlateAvailable(licensePlate: string): Observable<boolean>;
}
