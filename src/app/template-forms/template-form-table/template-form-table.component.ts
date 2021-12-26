import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { ApiService } from '../../api.service';
import { AlertService } from '../../common/alert/alert.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Employeedata } from 'src/app/employees';
import { MatDialog, MatSnackBar, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { FormDataViewComponent } from 'src/app/common/components/form-data-view/form-data-view.component';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { FormDataDeleteComponent } from 'src/app/common/components/form-data-delete/form-data-delete.component';


@Component({
  selector: 'app-template-form-table',
  templateUrl: './template-form-table.component.html',
  styleUrls: ['./template-form-table.component.css']
})
export class TemplateFormTableComponent implements OnInit, DoCheck {

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('empTableView', {static: false}) empTableView: ElementRef;

  employeeLists: any;
  options = {
    autoClose: true,
    KeepAfterRouteChange: false
  }
  empDataSource: any;
  isLoading: boolean = true;
  empDataCount: number = 0;
  addNupdateEmp: boolean = false;
  currentRoute: string;
  event$;
  //modalEmployee = new Employeedata('ds', false, false, '15 SEP 2015', 'asdas', 'asd', 'asdas', 'asda', 'asd', 'asd');

  constructor(
    private api: ApiService, 
    private alertService: AlertService, 
    private dialog: MatDialog, 
    private rendered: Renderer2, 
    private _router: Router,
    private _snackBar: MatSnackBar
    ) {
    this.event$ = this._router.events.subscribe((event: NavigationEnd) => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.url;
      }
    })
  }

  empDisplayColumn = ['id', 'fName', 'location', 'chksubscribe', 'avatar', 'action'];
  columns: any[] = [
    {
      name: 'id',
      title: 'S.No'
    },
    {
      name: 'fName',
      title: 'Name'
    },
    {
      name: 'location',
      title: 'Location'
    },
    {
      name: 'chksubscribe',
      title: 'Subscribe'
    },
    {
      name: 'avatar',
      title: 'Avatar'
    },
    {
      name: 'action',
      title: 'Action'
    }
  ];

  ngOnInit() {
    this.callTblData();
    this.api.subject$.subscribe((val: boolean) => {
      this.addNupdateEmp = val;
      if(val){
        this.checkEmpRoute();
      }
    })
  }

  ngDoCheck(): void {
    this.checkEmpRoute();
  }

  addNewEmp(){
    this.api.subject$.next(true);
    this._router.navigate(['/apidata/addemp']);
  }

  checkEmpRoute(){
    if(this.empTableView !== undefined){
      if(this.addNupdateEmp){
        this.rendered.setStyle(this.empTableView.nativeElement,'display', 'none');
      }else{
        this.rendered.removeStyle(this.empTableView.nativeElement,'display');
      }
    }
  }

  onClickAction(actionName: string, dataIndex: any){
    if(actionName === 'view'){
      const dialogRef = this.dialog.open(FormDataViewComponent, {
        data: {
          empid : dataIndex
        }
      });
      dialogRef.afterClosed().subscribe((result: boolean) => {
        this.addNupdateEmp = result;
      });
    }else if(actionName === 'edit'){
        this._router.navigate(['apidata/editemp', dataIndex]);
        this.api.subject$.next(true);
    }else if(actionName === 'delete'){
      const dialogRef = this.dialog.open(FormDataDeleteComponent, {
        data: {
          empid : dataIndex.id,
          empName: `${dataIndex.fName} ${dataIndex.lName}`
        },
        width: '400px'
      });
      dialogRef.afterClosed().subscribe((result: number) => {
        if(result){
          this.api.deleteEmpRecord(result).subscribe(res => {
            this._snackBar.openFromComponent(SnackBarComponent, {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 5 * 1000,
              panelClass: ['snackbar-style']
            });
            this.ngOnInit();
          });
        }
      })
    }
  }

  callTblData() {
    this.api.getEmpData().subscribe((data: any) => {
      this.employeeLists = new MatTableDataSource<Employeedata>(data);
      this.isLoading = false;
      this.empDataCount = data.length;
      this.employeeLists.paginator = this.paginator;
      this.employeeLists.sort = this.sort;
    }, error => {
      this.isLoading = false;
      alert(error);
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.empDisplayColumn, event.previousIndex, event.currentIndex);
    console.log(this.empDisplayColumn);
  }

}

@Component({
  selector: 'app-form-data-delete',
  template: `
    <mat-icon>delete_forever</mat-icon> Deleted Successfully..!!
  `,
  styles: ['mat-icon{position: relative; top:5px}']
})
export class SnackBarComponent{}
