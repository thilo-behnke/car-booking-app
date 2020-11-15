import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import {
  EnhancedTableColumn,
  TableColumnType,
} from './model/enhanced-table-column';

@Component({
  selector: `app-table`,
  template: `
      <div class="car-list-container">
          <ng-container *ngIf="!isLoading; else loading">
              <ngx-datatable
                      [columns]="columns"
                      [rows]="rows"
                      rowHeight="auto"
                      headerHeight="auto"
                      class="material striped"
              >
                  <ng-container *ngFor="let column of columns">
                      <ng-container
                              *ngIf="column.type === TableColumnType.DATE; else defaultColumn"
                      >
                          <ngx-datatable-column prop="{{ column.prop }}">
                              <ng-template let-value="value" ngx-datatable-cell-template>
                                  {{ value | date: 'dd.MM.yyyy' }}
                              </ng-template>
                          </ngx-datatable-column>
                      </ng-container>
                      <ng-template #defaultColumn>
                          <ngx-datatable-column prop="{{ column.prop }}">
                              <ng-template let-value="value" ngx-datatable-cell-template>
                                  {{ value }}
                              </ng-template>
                          </ngx-datatable-column>
                      </ng-template>
                  </ng-container>
                  <ngx-datatable-column>
                      <ng-template let-row="row" ngx-datatable-cell-template>
                          <button mat-button mat-raised-button (click)="open.emit(row)">
                <span style="font-size: 18px" class="material-icons">
                  launch
                </span>
                              <span style="margin-left: 5px">Open</span>
                          </button>
                      </ng-template>
                  </ngx-datatable-column>
              </ngx-datatable>
          </ng-container>
          <ng-template #loading>
              <mat-spinner></mat-spinner>
          </ng-template>
      </div>
  `,
})
export class TableComponent {
  @Input()
  public isLoading: boolean;

  @Input()
  public columns: EnhancedTableColumn[];

  @Input()
  public rows: any;

  @Output()
  public open = new EventEmitter<any>();

  TableColumnType = TableColumnType;
}
