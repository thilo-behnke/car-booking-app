import { Pipe, PipeTransform } from '@angular/core';
import { EnhancedTableColumn } from '../model/enhanced-table-column';

@Pipe({
  name: 'columnFilter',
})
export class ColumnFilterPipe implements PipeTransform {
  transform(
    value: EnhancedTableColumn[],
    columnType: string
  ): EnhancedTableColumn[] {
    return value.filter((column) => column.type === columnType);
  }
}
