import { NgModule } from '@angular/core';
import { UserService } from './services/user.service';
import { DefaultUserService } from './services/default-user.service';
import { UserListComponent } from './user-list.component';
import { TableModule } from '../components/table.module';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { UserSearchComponent } from './search/user-search.component';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserOverviewComponent } from './overview/user-overview.component';
import { MatButtonModule } from '@angular/material/button';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserSearchService } from './search/user-search.service';
import { DefaultUserSearchService } from './search/default-user-search.service';

const routes: Routes = [
  { path: '', component: UserOverviewComponent },
  { path: ':id', component: UserDetailComponent },
];

@NgModule({
  providers: [
    { provide: UserService, useClass: DefaultUserService },
    { provide: UserSearchService, useClass: DefaultUserSearchService },
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  declarations: [
    UserOverviewComponent,
    UserListComponent,
    UserSearchComponent,
    UserDetailComponent,
  ],
})
export class UserModule {}
