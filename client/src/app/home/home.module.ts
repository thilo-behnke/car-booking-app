import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [MatListModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent],
})
export class HomeModule {}
