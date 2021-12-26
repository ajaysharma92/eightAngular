import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const materialPackage = [
 DragDropModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, A11yModule, CdkTableModule, ScrollingModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule, MatTooltipModule, MatDividerModule, MatDialogModule, MatProgressSpinnerModule, MatCardModule, MatListModule, MatPaginatorModule, MatSortModule, MatSnackBarModule, MatStepperModule, MatRadioModule, MatSelectModule, MatCheckboxModule, NgxMatSelectSearchModule
]

@NgModule({
  declarations: [],
  imports: [
    materialPackage
  ],
  exports: [
    materialPackage
  ]
})
export class AngularMaterialModule { }
