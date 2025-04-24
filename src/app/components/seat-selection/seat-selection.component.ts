import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  private api = inject(ApiService);

  seats: any[] = [];
  selectedSeat: any = null;
  trainId = 1;     // მაგ: URL-იდან ან მიმდინარე ტრეინიდან წამოსაღები
  userId = 12345;  // დროებით მომხმარებლის ID

  bookingStatus: string = '';
  showStatusCheck = false;
  ticketIdForCheck: number | null = null;
  ticketStatus: string = '';

  ngOnInit() {
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
}
