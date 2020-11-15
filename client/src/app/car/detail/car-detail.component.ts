import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Car } from '../model/Car';
import { MatSnackBar } from '@angular/material/snack-bar';
import { futureDateValidator } from '../validation/future-date.validator';
import {
  UniqueLicensePlateValidator,
  UniqueLicensePlateValidatorFactory,
} from '../validation/unique-license-plate.validator';

@Component({
  selector: 'car-detail',
  styleUrls: ['./car-detail.component.scss'],
  templateUrl: './car-detail.component.html',
})
export class CarDetailComponent implements OnInit, OnDestroy {
  car: Car;

  carForm: FormGroup;

  errors = [];

  private destroy$ = new Subject();

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private uniqueLicensePlateValidatorFactory: UniqueLicensePlateValidatorFactory
  ) {
    this.initializeForm(null);
  }

  ngOnInit() {
    this.subscribeCarChange();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  private subscribeCarChange() {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((paramMap) => {
          const id = paramMap.get('id');
          return id
            ? this.carService.getCarById(parseInt(id, 10))
            : of(null);
        }),
        filter((car) => !!car),
        tap((car) => {
          this.initializeForm(car);
        })
      )
      .subscribe();
  }

  private initializeForm(car: Car) {
    this.carForm = this.formBuilder.group(
      {
        id: [''],
        licensePlate: [
          '',
          [Validators.required],
          [
            this.uniqueLicensePlateValidatorFactory.create(
              car?.licensePlate
            ),
          ],
        ],
        vin: ['', [Validators.required]],
        model: ['', [Validators.required]],
        active: [false, [Validators.required]],
        color: ['', [Validators.required]],
        validTill: [
          '',
          [Validators.required, futureDateValidator(car?.validTill)],
        ],
      },
      { updateOn: 'blur' }
    );
    this.setCar(car);
  }

  private setCar(car: Car) {
    this.car = car;
    if (car) {
      this.carForm.setValue(car);
    }
  }

  saveCar() {
    this.errors = [];

    const car = this.carForm.value as Car;
    if (!car.id) {
      this.carService
        .createCar(car)
        .pipe(
          tap((car) => {
            this.snackBar.open('Car successfully created!', 'Car', {
              duration: 5000,
              verticalPosition: 'top',
            });
            this.router.navigate(['cars', car.id]);
          })
        )
        .subscribe(
          () => {},
          (error) => {
            this.errors = [error.error.message];
          }
        );
    } else {
      alert('Updating existing records currently not supported!');
    }
  }

  backToList() {
    this.router.navigate(['cars']);
  }
}
