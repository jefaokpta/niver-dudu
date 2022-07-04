import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {CopyClipboardComponent} from "../../components/copy-clipboard/copy-clipboard.component";
import {ConfirmedComponent} from "../../components/confirmed/confirmed.component";


@NgModule({
  declarations: [
    AdminComponent,
    CopyClipboardComponent,
    ConfirmedComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
  ]
})
export class AdminModule { }
