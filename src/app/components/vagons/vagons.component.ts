import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vagons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vagons.component.html',
  styleUrl: './vagons.component.scss'
})
export class VagonsComponent {
  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.route.params.subscribe(params => {
      const trainId = params['id'];
      this.api.getVagon(trainId).subscribe(result => {
        this.vagons = result
        console.log(this.vagons);
      });
    });

  }
  vagons : any[] = [];
  selectSeat(selectedSeat: string, trainId: number) {
    console.log("Selected seat: ", selectedSeat, "in train: ", trainId);

    this.selectedSeat.seatId = selectedSeat;

    this.selectedSeats.push(this.selectedSeat);
    localStorage.setItem('trainId', JSON.stringify(trainId)); 
    localStorage.setItem('selectedSeat', JSON.stringify(this.selectedSeats)); 
    
  }
  selectedSeats: any[] = [];
   selectedSeat = {
    seatId: "",
    name: "",
    surname: "",
    idNumber: "",
    status: "",
    payoutCompleted: true
   }

  postObject = {
      trainId: 0,
      date: "2025-04-24T13:00:26.133Z",
      email: "string",
      phoneNumber: "string",
    
  }

}
