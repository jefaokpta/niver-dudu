import { Component } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  sendButtornLoading: boolean = true;
  form = this.formBuilder.group({
    name: [null, Validators.required],
    phone: [null, [Validators.required]],
    guests: this.formBuilder.array([])
  })

  constructor(private formBuilder: FormBuilder) { }

  get guests() {
    return this.form.get('guests') as FormArray;
  }

  addGuest() {
    this.guests.push(this.formBuilder.group({
      guestName: [null, Validators.required],
      guestAge: [null, Validators.required],
    }));
  }

  removeGuest(index: number) {
    this.guests.removeAt(index);
  }

  confirm() {
    this.sendButtornLoading = false;
    console.log(this.form.valid);
    console.log(this.form.value);
  }

  validOrTouched(fieldName: string): boolean{
    const field = this.form.get(fieldName)
    return field!!.touched && !field!!.valid
  }

  validOrTouchedGuests(fieldName: string, index: number): boolean{
    const field = this.form.get('guests')?.get(index.toString())?.get(fieldName)
    return field!!.touched && !field!!.valid
  }

}
