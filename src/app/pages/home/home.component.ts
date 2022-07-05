import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ServerService} from "../../services/server.service";
import {Guest, Participant} from "../../model/Participant";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  sendButtornLoading = true;
  sendButtonText = 'Confirmar';
  sendButtonTextConfirmed = 'Confirmado! 👍🏼';
  sendButtonDisabled = true
  btnLoading: boolean = true;

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

  ngOnInit(): void {
      if(this.param){
        this.server.findById(this.param).subscribe({
            next: (response) => {
              const participant = response as Participant;
              this.form.controls['id'].setValue(participant.id);
              this.form.controls['name'].setValue(participant.name);
              this.form.controls['phone'].setValue(participant.phone);
              participant.guests.forEach(guest => {this.addGuest(guest)});
              this.sendButtonDisabled = false;
              if(participant.confirmed){
                this.sendButtonText = this.sendButtonTextConfirmed;
                this.sendButtonDisabled = true;
              }
            },
            error: (error) => console.log('CAGOU', error),
            complete: () => this.btnLoading = false
          }
        )
      }
    }

  get guests() {
    return this.form.get('guests') as FormArray;
  }

  private addGuest(guest: Guest) {
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
    this.sendButtornLoading = false;
    console.log(this.form.value);
    this.form.controls['confirmed'].setValue(true);
    this.server.update(this.form.value).subscribe({
      next: () => {
        this.sendButtonText = this.sendButtonTextConfirmed;
        this.sendButtornLoading = true;
        this.sendButtonDisabled = true;
      },
      error: (error) => {
        console.log('CAGOU', error);
        this.sendButtornLoading = true;
      },
      complete: () => {
        console.log('COMPLETO');
        this.sendButtornLoading = true;
      }
    })
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
