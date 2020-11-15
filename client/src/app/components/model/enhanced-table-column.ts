import { TableColumn } from '@swimlane/ngx-datatable';

export enum TableColumnType {
  STRING = 'STRING',
  DATE = 'DATE',
}

export type EnhancedTableColumn = TableColumn & { type: TableColumnType };
