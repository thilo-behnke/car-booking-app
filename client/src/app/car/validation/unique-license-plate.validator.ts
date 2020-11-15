import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { CarService } from '../services/car.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class UniqueLicensePlateValidator implements AsyncValidator {
  constructor(
    private carService: CarService,
    private initialValue: string
  ) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log(ctrl.value, this.initialValue);
    if (ctrl.value === this.initialValue) {
      return of(null);
    }
    if (ctrl.value === '' || ctrl.value === null) {
      return of(null);
    }
    return this.carService.isLicensePlateAvailable(ctrl.value).pipe(
      map((isAvailable) => {
        if (isAvailable) {
          return null;
        }
        return { uniqueLicensePlateValidator: 'License plate already taken!' };
      })
    );
  }
}

@Injectable()
export class UniqueLicensePlateValidatorFactory {
  constructor(private carService: CarService) {}

  create(initialValue: string) {
    return new UniqueLicensePlateValidator(this.carService, initialValue);
  }
}
