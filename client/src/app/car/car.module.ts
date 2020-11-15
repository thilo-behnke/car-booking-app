import { NgModule } from '@angular/core';
import { CarService } from './services/car.service';
import { DefaultCarService } from './services/default-car.service';
import { CarListComponent } from './car-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from '../components/table.module';
import { CarDetailComponent } from './detail/car-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarOverviewComponent } from './overview/car-overview.component';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UniqueLicensePlateValidatorFactory } from './validation/unique-license-plate.validator';

const routes: Routes = [
  { path: '', component: CarOverviewComponent },
  { path: 'create', component: CarDetailComponent },
  { path: ':id', component: CarDetailComponent },
];

@NgModule({
  providers: [
    {
      provide: CarService,
      useClass: DefaultCarService,
    },
    UniqueLicensePlateValidatorFactory,
  ],
  imports: [
    MatSnackBarModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    CarOverviewComponent,
    CarListComponent,
    CarDetailComponent,
  ],
})
export class CarModule {}
