import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vagons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vagons.component.html',
  styleUrls: ['./vagons.component.scss']
})
export class VagonsComponent {
  vagons: any[] = [];
  selectedSeats: any[] = [];
  selectedVagon: any = null;

  selectedSeat = {
    seatId: '',
    name: '',
    surname: '',
    idNumber: '',
    status: '',
    payoutCompleted: true
  };

  postObject = {
    trainId: 0,
    date: new Date().toISOString(),
    email: 'string',
    phoneNumber: 'string'
  };

  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.route.params.subscribe(params => {
      const trainId = params['id'];
      this.api.getVagon(trainId).subscribe(result => {
        this.vagons = result;
        this.postObject.trainId = +trainId; // Automatically set trainId to postObject
        console.log(this.vagons);
      });
    });
  }

  classSelected = ""

selectSeat(seat: any, trainId: number) {
  const isSelected = this.isSeatSelected(seat.seatId);
  
  if (isSelected) {
    this.selectedSeats = this.selectedSeats.filter(s => s.seatId !== seat.seatId);
  } else {
    this.selectedSeats.push({
      seatId: seat.seatId,
      number: seat.number,
      price: seat.price,
      trainId: trainId
    });
  }

  localStorage.setItem('trainId', JSON.stringify(trainId));
  localStorage.setItem('selectedSeat', JSON.stringify(this.selectedSeats));
}

isSeatSelected(seatId: number): boolean {
  return this.selectedSeats.some(s => s.seatId === seatId);
}
  // Group seats by row
  groupSeatsByRow(seats: any[]): any[][] {
    const grouped: { [key: string]: any[] } = {};

    seats.forEach(seat => {
      const rowNumberMatch = seat.seatId.match(/\d+/);
      const rowNumber = rowNumberMatch ? rowNumberMatch[0] : 'unknown';
      if (!grouped[rowNumber]) grouped[rowNumber] = [];
      grouped[rowNumber].push(seat);
    });

    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => a.seatId.localeCompare(b.seatId));
    });

    return Object.values(grouped);
  }

  // Function to select a vagon
  selectVagon(vagon: any) {
    this.selectedVagon = this.selectedVagon === vagon ? null : vagon; // Toggle selection
  }

  // Check if vagon is selected
  isVagonSelected(vagon: any): boolean {
    return this.selectedVagon === vagon;
  }
}
