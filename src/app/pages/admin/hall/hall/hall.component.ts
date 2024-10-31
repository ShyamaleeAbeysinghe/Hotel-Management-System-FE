import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

interface Hall {
  name: string,
  hallNo: string,
  price: string,
  chairs: string,
  tables: string
}


@Component({
  selector: 'app-hall',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.css'
})
export class HallComponent {
  public url: any;
  public hall: Hall = {
    name: '',
    hallNo: '',
    price: '',
    chairs: '',
    tables: ''
  };

  constructor(private modalReference: ModalReference<Hall>) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.hall = copy;
    }
  }

  public addFile(event: any) {
    console.log(event)
    if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.url = event.target.result;
                console.log(this.url)
            }
            reader.readAsDataURL(event.target.files[0]);
        }
  }
}
