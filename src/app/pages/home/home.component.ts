import { Component } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  form = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder,
              ) { }

  confirm() {
    console.log(this.form.valid);
    console.log(this.form.value);
  }

  validOrTouched(fieldName: string): boolean{
    const field = this.form.get(fieldName)
    return field!!.touched && !field!!.valid
  }

}
