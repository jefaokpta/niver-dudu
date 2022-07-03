import { Component, OnInit } from '@angular/core';
import {Participant} from "../../model/Participant";

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.scss']
})
export class ConfirmedComponent implements OnInit {

  rowData: Participant | undefined
  icon = 'fa-circle-xmark';
  iconColor = false
  constructor() { }

  ngOnInit(): void {
    if(this.rowData?.confirmed){
      this.icon = 'fa-check-circle';
      this.iconColor = true;
    }
  }

}
