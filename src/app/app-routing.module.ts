import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpTableComponent } from './emp-table/emp-table.component';
import { ApidataComponent } from './apidata/apidata.component';
import { SmartphoneComponent } from './smartphone/smartphone.component';
import { DevicesDetailComponent } from './smartphone/devices-detail/devices-detail.component';
import { AuthGuardServiceGuard } from './auth-guard-service.guard';
import { FormDataCreateUpdateComponent } from './common/components/form-data-create-update/form-data-create-update.component';
import { ManageEmployeeGuard } from './common/AuthGuard/manage-employee.guard';
import { NotFoundPageComponent } from './common/components/not-found-page.component';

const routes : Routes = [
  {path: '', redirectTo: 'employee', pathMatch: 'full'},
  {path: 'newapp/**', component: NotFoundPageComponent},
  {path: 'employee', component: EmpTableComponent},
  {path: 'apidata', component: ApidataComponent,
    children: [
      {path: 'addemp', component: FormDataCreateUpdateComponent},
      {path: 'editemp/:id', component: FormDataCreateUpdateComponent}
    ],
    canActivateChild: [ManageEmployeeGuard]  
  },
  {path: 'smartphone', component: SmartphoneComponent},
  {path: 'smartphone/:id', component: DevicesDetailComponent, canActivate: [AuthGuardServiceGuard]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: false, scrollPositionRestoration: 'top'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
