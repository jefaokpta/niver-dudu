import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  settings = {
    columns: {
      name: {
        title: 'Nome'
      },
      link: {
        title: 'Link'
      },
      confirmed: {
        title: 'Confirmado'
      }
    }
  };

}
