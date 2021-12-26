import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmpTableComponent, NgbdSortableHeader } from './emp-table/emp-table.component'
import { ModalModule } from 'ngb-modal'; 
import { ApiService } from './api.service';
import { ApidataComponent } from './apidata/apidata.component';
import { AppRoutingModule } from './app-routing.module';
import { SmartphoneComponent } from './smartphone/smartphone.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataTablesModule } from 'angular-datatables';
import { NgCircleProgressModule } from 'ng-circle-progress';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DevicesDetailComponent } from './smartphone/devices-detail/devices-detail.component';
import { TemplateFormsComponent } from './template-forms/template-forms.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { CheckPasswordDirective } from './template-forms/check-password.directive';
import { CounterComponent } from './template-forms/counter/counter.component';
import { PhonechildComponent } from './smartphone/phonechild.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextShortPipe } from './common/customPipes/text-short.pipe';
import { AlertModule } from './common/alert/alert.module';
import { AngularMaterialModule } from './common/material/angular-material.module';
import { SnackBarComponent, TemplateFormTableComponent } from './template-forms/template-form-table/template-form-table.component';
import { FirstAlphaUpperPipe } from './common/customPipes/first-alpha-upper.pipe';
import { FormDataViewComponent } from './common/components/form-data-view/form-data-view.component';
import { HidePassCodePipe } from './common/customPipes/hide-pass-code.pipe';
import { FormDataCreateUpdateComponent } from './common/components/form-data-create-update/form-data-create-update.component';
import { FormDataDeleteComponent } from './common/components/form-data-delete/form-data-delete.component';
import { NotFoundPageComponent } from './common/components/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpTableComponent,
    ApidataComponent,
    SmartphoneComponent,
    NavigationComponent,
    NgbdSortableHeader,
    DevicesDetailComponent,
    TemplateFormsComponent,
    ReactiveFormsComponent,
    CheckPasswordDirective,
    CounterComponent,
    PhonechildComponent,
    TextShortPipe,
    TemplateFormTableComponent,
    FirstAlphaUpperPipe,
    FormDataViewComponent,
    HidePassCodePipe,
    FormDataCreateUpdateComponent,
    FormDataDeleteComponent,
    SnackBarComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    AppRoutingModule,
    DataTablesModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AlertModule,
    AngularMaterialModule
    //NgbModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: [
    FormDataViewComponent,
    FormDataDeleteComponent,
    SnackBarComponent
  ]
})
export class AppModule { }
