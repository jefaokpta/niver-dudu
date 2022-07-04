import { Component } from '@angular/core';
import {Participant} from "../../model/Participant";

@Component({
  selector: 'app-copy-clipboard',
  templateUrl: './copy-clipboard.component.html',
  styleUrls: ['./copy-clipboard.component.scss']
})
export class CopyClipboardComponent {

  rowData: Participant | undefined;
  btnText = 'Copiar Link'

  copyToClipboard() {
    this.btnText = 'Copiado! 🎉'
    navigator.clipboard.writeText(this.rowData!!.link);
  }

}
