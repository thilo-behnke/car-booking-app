import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './table.component';
import { ColumnFilterPipe } from './pipes/column-filter.pipe';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    SharedModule,
    NgxDatatableModule,
  ],
  exports: [TableComponent, NgxDatatableModule],
  declarations: [TableComponent, ColumnFilterPipe],
})
export class TableModule {}
