import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-booking-page',
  // imports: [],
  standalone: true,
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss'
})
export class BookingPageComponent {
  constructor(private api : ApiService) {
 
  }
  ngOnInit() {
   console.log(JSON.parse(localStorage.getItem('trainId')!))
   console.log(JSON.parse(localStorage.getItem('selectedSeat')!))
  }
   postObj : any



  bookTkt(){
     this.api.registerTicket(this.postObj).subscribe(resp => console.log(resp))
  }
}





// {
//     "trainId": 0,
//     "date": "2025-04-24T13:00:26.133Z",
//     "email": "string",
//     "phoneNumber": "string",
//     "people": [
//       {
//         "seatId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "name": "string",
//         "surname": "string",
//         "idNumber": "string",
//         "status": "string",
//         "payoutCompleted": true
//       }
//     ]
//   } 