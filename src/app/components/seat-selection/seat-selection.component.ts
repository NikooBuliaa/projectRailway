import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  seats: any[] = [];
  selectedSeat: any = null;
  trainId: number = 1; // URL-დან წამოსაღებად
  userId: number = 12345; // დროებითი მომხმარებელი
  travelDate: string = ''; // თუ გექნება, შეგიძლია URL-დანაც წამოიღო

  bookingStatus: string = '';
  showStatusCheck = false;
  ticketIdForCheck: number | null = null;
  ticketStatus: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.trainId = +this.route.snapshot.paramMap.get('trainId')!;
    this.travelDate = this.route.snapshot.queryParamMap.get('date') || new Date().toISOString().split('T')[0];

    this.api.getVagon(1).subscribe({
      next: (data) => this.seats = data,
      error: (err) => console.error('ვაგონის ჩატვირთვის შეცდომა:', err)
    });
  }

  selectSeat(seat: any) {
    if (!seat.isAvailable) return;
    this.selectedSeat = seat;
  }

  confirmBooking() {
    if (!this.selectedSeat) return;

    const ticketData = {
      seatId: this.selectedSeat.id,
      trainId: this.trainId,
      userId: this.userId
    };

    this.api.registerTicket(ticketData).subscribe({
      next: (res) => {
        this.bookingStatus = `დაჯავშნა წარმატებულია! ბილეთის ID: ${res.ticketId}`;
        this.ticketIdForCheck = res.ticketId;
        this.showStatusCheck = true;
      },
      error: (err) => {
        this.bookingStatus = 'დაჯავშნის შეცდომა!';
        console.error(err);
      }
    });
  }

  checkStatus() {
    if (!this.ticketIdForCheck) return;

    this.api.checkTicketStatus(this.ticketIdForCheck).subscribe({
      next: (res) => {
        this.ticketStatus = `ბილეთის სტატუსი: ${res.status}`;
      },
      error: () => {
        this.ticketStatus = 'სტატუსის გამოთხოვა ვერ მოხერხდა.';
      }
    });
  }

  goToBooking() {
    if (!this.selectedSeat) return;

    const ticketData = {
      trainId: this.trainId,
      seat: this.selectedSeat,
      date: this.travelDate,
      userId: this.userId
    };

    this.router.navigate(['/booking'], {
      state: { ticketData }
    });
  }
}
