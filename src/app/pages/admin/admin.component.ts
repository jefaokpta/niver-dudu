import { Component } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ServerService} from "../../services/server.service";
import {Guest} from "../../model/Participant";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  sendButtornLoading = true;
  sendButtonText = 'Salvar';

  private param = this.activatedRoute.snapshot.paramMap.get('idParticipant');

  form = this.formBuilder.group({
    id: [null],
    name: [null, Validators.required],
    phone: [null, [Validators.required]],
    confirmed: [false],
    guests: this.formBuilder.array([])
  })

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private server: ServerService) {}

  get guests() {
    return this.form.get('guests') as FormArray;
  }

  addGuest(guest: Guest) {
    this.guests.push(this.formBuilder.group({
      id: [guest.id],
      name: [guest.name, Validators.required],
      isKid: [guest.isKid],
    }));
  }

  removeGuest(index: number) {
    this.guests.removeAt(index);
  }

  confirm() {
    console.log(this.form.value);
    if(this.form.valid){
      this.sendButtornLoading = false;
      this.server.create(this.form.value).subscribe({
        next: (response) => {
          this.form.reset()
          console.log(response);
        },
        error: (error) => {
          alert(error.message)
          this.sendButtornLoading = true;
          console.log('CAGOU', error);
        },
        complete: () => {
          console.log('COMPLETO');
          this.sendButtornLoading = true;
        }
      })
    } else{
      this.form.markAllAsTouched();
      alert('Preencha todos os campos corretamente');
    }
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
