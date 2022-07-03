import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TableComponent} from "../../components/table/table.component";
import {Ng2SmartTableModule} from "ng2-smart-table";


@NgModule({
  declarations: [
    AdminComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
  ]
})
export class AdminModule { }
