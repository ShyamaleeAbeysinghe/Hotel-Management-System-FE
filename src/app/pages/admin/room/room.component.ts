import { Component} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

interface Room{
  name:string,
  roomNo:string,
  description:string,
  size:string,
  beds:string
}



@Component({
  selector: 'app-room',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  public url:any;
  public room:Room={
    name: '',
    roomNo: '',
    description: '',
    size: '',
    beds: ''
  };
  constructor(private modalReference:ModalReference<Room>){
      if(this.modalReference.config.model){
        let copy=this.modalReference.config.model;
        this.room=copy;
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
