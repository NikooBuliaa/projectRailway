import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [FormsModule, CommonModule ], // აქ შეიძლება იყოს სხვა კომპონენტები, რომლებიც საჭიროა, მაგალითად `CommonModule`
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {
  trainId!: number;
  vagonData: any;
  trainData: any;
  selectedSeat: any;
  passengerName = '';
  ticketStatus = '';

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.trainId = Number(this.route.snapshot.paramMap.get('trainId'));
    this.loadTrainData();
  }

  loadTrainData() {
    this.api.getTrain(this.trainId).subscribe(train => {
      this.trainData = train;
      if (train.vagons && train.vagons.length > 0) {
        this.loadVagonData(train.vagons[0].id); // ვაჩვენებთ პირველ ვაგონს
      }
    });
  }

  loadVagonData(vagonId: number) {
    this.api.getVagon(vagonId).subscribe(vagon => {
      this.vagonData = vagon;
    });
  }

  selectSeat(seat: any) {
    this.selectedSeat = seat;
  }

  bookTicket() {
    const ticket = {
      name: this.passengerName,
      seat: this.selectedSeat?.seat_number,
      vagon_id: this.vagonData?.id,
      train_id: this.trainId,
    };

    this.api.registerTicket(ticket).subscribe(res => {
      this.ticketStatus = 'დაჯავშნა წარმატებულია!';
    });
  }
}
