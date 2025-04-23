import { Component } from '@angular/core';
import { PaidTicketComponent } from "./paid-ticket/paid-ticket.component";

@Component({
  selector: 'app-transaction-page',
  // imports: [],
  standalone: true,
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.scss',
  imports: [PaidTicketComponent]
})
export class TransactionPageComponent {


  paid = false
}
