import { Component, OnInit, Directive, Input, Output, EventEmitter, ViewChild, ViewChildren, Query, QueryList } from '@angular/core';
import { ApiService } from '../api.service';
import { Employee } from '../employees';
import { HttpClient, HttpResponse} from '@angular/common/http';

interface Country {
  id: number;
  name: string;
  html_url: string;
  description: string;
}
const COUNTRIES: Country[] = [
  {
    id: 1,
    name: 'Russia',
    html_url: 'fFlagofRussiasvg',
    description: '146989754'
  },
  {
    id: 2,
    name: 'Canada',
    html_url: 'cFlagofCanadasvg',
    description: '36624199'
  },
  {
    id: 3,
    name: 'United States',
    html_url: 'aFlagoftheUnitedStatessvg',
    description: '324459463'
  },
  {
    id: 4,
    name: 'China',
    html_url: 'fFlagofthePeopleRepublicofChinasvg',
    description: '1409517397'
  }
];

export type SortColumn = keyof Country | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = {'asc' : 'desc', 'desc' : '', '' : 'asc'};
const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent{
  column : SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]' : 'direction === "asc"',
    '[class.desc]' : 'direction === "desc"',
    '(click)' : 'rotate()'
  }
})

export class NgbdSortableHeader {

  @Input() sortable : SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.css']
})
export class EmpTableComponent implements OnInit {
  
  repos : Employee[];
  userName : string;
  loading: boolean = false;
  errorMessage;
  dtOptions: DataTables.Settings = {};
  showSpinner: boolean = true;
  data: any;
  ariaSort: any;
  countries = COUNTRIES;
  sortedEmp: any[];
  empDataList: any[] = [];
  isAllowed: boolean = false;  

  @ViewChildren(NgbdSortableHeader) headers:QueryList<NgbdSortableHeader>;

  constructor(private api : ApiService) {}

  public getRepos(){
    this.loading = true;
    this.errorMessage = '';
    this.api.getRepos(this.userName).subscribe(
      (response) => {
        console.log('Response Received');
        this.repos = response;
        //this.empDataList.push(this.repos);
        this.sortedEmp = this.repos;
      },
      (error)=>{
        console.error("Request failed with error");
        this.errorMessage = error;
        this.loading = false;      
      },
      () => {
        console.log('Request completed')
        this.loading = false; 
      })
  }

  ngOnInit(){
    const that = this;
    this.ariaSort = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      responsive: true,
      ordering: true,
      deferLoading: 0,
      columns: [
        {data: 'id'},
        {data: 'name'},
        {data: 'html_url'},
        {data: 'description'}
      ],
      columnDefs: [
        { "width": "15%", "targets": 0 },
        { "width": "25%", "targets": 1 },
        { "width": "25%", "targets": 2 },
        { "width": "25%", "targets": 3 }
      ]
    }

    this.ariaSort['id'] = 'none';
    this.ariaSort['name'] = 'none';
    this.ariaSort['htmlurl'] = 'none';
    this.ariaSort['description'] = 'none';
  }

  checkInputField(){
    if(this.userName === '')
      this.isAllowed = false
    else
      this.isAllowed = true
  }


  onSort({column, direction}: SortEvent){

    if(direction !== '')
      this.ariaSort[column] = direction == 'asc' ? 'ascending' : 'descending';
    else
      this.ariaSort[column] = "none";


    this.headers.forEach(header => {
      if(header.sortable !== column){
        header.direction = '';
      }
    });

    if(direction === '' || column === ''){
      this.sortedEmp = this.repos;
        //this.countries = COUNTRIES;
        console.log(this.sortedEmp);
    }
    else{
      this.sortedEmp = [...this.repos].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      })
      console.log(this.sortedEmp);
    }
  }

}
