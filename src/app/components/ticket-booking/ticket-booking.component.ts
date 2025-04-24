import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.scss']
})
export class TicketBookingComponent implements OnInit {
  ticketData: any;
  bookingSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    // მოდულში გადაცემული params ან state-ით გადმოტანილი მონაცემები
    this.ticketData = history.state?.ticketData;

    if (!this.ticketData) {
      this.router.navigate(['/home']);
    }
  }

  bookTicket() {
    this.api.registerTicket(this.ticketData).subscribe({
      next: (res) => {
        this.bookingSuccess = true;
      },
      error: (err) => {
        this.errorMessage = 'დაჯავშნისას მოხდა შეცდომა. გთხოვთ სცადეთ თავიდან.';
      }
    });
  }
}
