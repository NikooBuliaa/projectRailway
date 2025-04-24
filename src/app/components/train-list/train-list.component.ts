import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-train-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss']
})
export class TrainListComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  stations: any[] = [];
  from = '';
  to = '';
  date = '';

  departures: any[] = [];
  loading = false;

  ngOnInit() {
    this.api.getStations().subscribe((stations) => {
      this.stations = stations;
    });
  }

  search() {
    if (!this.from || !this.to || !this.date) return;

    this.loading = true;
    this.api.getDepartures(this.from, this.to, this.date).subscribe({
      next: (res) => {
        this.departures = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('შეცდომა ძებნისას', err);
        this.loading = false;
      }
    });
  }

  selectTrain(departure: any) {
    this.router.navigate(['/seats', departure.train_id]);
  }
}
