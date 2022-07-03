import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ServerService} from "../../services/server.service";
import {Guest, Participant} from "../../model/Participant";
import {Row} from "ng2-smart-table/lib/lib/data-set/row";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  sendButtornLoading = true;
  sendButtonText = 'Salvar';
  editButtonShow = false;
  participants: Participant[] = [];

  tableSettings = {
    mode: 'external',
    // hideSubHeader: true,
    actions: {
      add: false,
      position: 'right',
    },
    columns: {
      name: {
        title: 'Nome'
      },
      phone: {
        title: 'Telefone'
      },
      link: {
        title: 'Link'
      },
      confirmed: {
        title: 'Confirmado'
      }
    }
  };

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
      this.load();
  }

  private load() {
    this.server.findAll().subscribe({
      next: (response) => {
        const p = response as Participant[];
        this.participants = p.map(participant => {
          return {
            id: participant.id,
            name: participant.name,
            phone: participant.phone,
            link: `https://aniversario-dudu.jpbx.com.br/${participant.id}`,
            confirmed: participant.confirmed,
            guests: participant.guests
          }
        });
      }
    })
  }

  edit(row: Row) {
    const participant = row.getData() as Participant;
    this.form.controls['id'].setValue(participant.id);
    this.form.controls['name'].setValue(participant.name);
    this.form.controls['phone'].setValue(participant.phone);
    participant.guests.forEach(guest => {this.addGuest(guest)});
    this.editButtonShow = true;
  }

  delete(row: Row) {
    const index = row.index;
    const participant = row.getData() as Participant;
    this.server.delete(participant.id).subscribe({
      next: () => {
        console.log('Deletado');
        this.load()
      }
    })
    // console.log(data);
  }

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

  doPut() {
    this.server.update(this.form.value).subscribe({
      next: (response) => {
        this.guests.clear()
        this.form.reset()
        this.load()
        this.editButtonShow = false;
      }
    })
  }

  confirm() {
    console.log(this.form.value);
    if(this.form.valid){
      this.sendButtornLoading = false;
      this.server.create(this.form.value).subscribe({
        next: (response) => {
          this.guests.clear()
          this.form.reset()
          this.load()
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
