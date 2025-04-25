import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule,
    BrowserAnimationsModule
  ],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss',
})
export class BookingPageComponent implements OnInit {
  bookingForm!: FormGroup;
  postObj: any;

  constructor(
      private fb: FormBuilder,
      private api: ApiService,
      @Inject(ToastrService) private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      idNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });
  }

  bookTkt(): void {
    const trainId = JSON.parse(localStorage.getItem('trainId')!);
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat')!);

    this.postObj = {
      trainId: trainId,
      date: new Date().toISOString(),
      email: this.bookingForm.value.email,
      phoneNumber: this.bookingForm.value.phoneNumber,
      people: [
        {
          seatId: selectedSeat,
          name: this.bookingForm.value.name,
          surname: this.bookingForm.value.surname,
          idNumber: this.bookingForm.value.idNumber,
          status: 'booked',
          payoutCompleted: true,
        },
      ],
    };

    this.api.registerTicket(this.postObj).subscribe({
      next: () => {
        this.toastr.success('ბილეთი წარმატებით დაიჯავშნა');
        this.bookingForm.reset();
      },
      error: () => {
        this.toastr.error('დაჯავშნისას მოხდა შეცდომა');
      },
    });
  }
}
