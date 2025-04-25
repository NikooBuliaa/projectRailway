import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-train-list',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss']
})
export class TrainListComponent implements OnInit {
  trains: any[] = [];
  from: string = '';
  to: string = '';
  date: string = '';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.from = params['departure'] || '';
      this.to = params['destination'] || '';
      this.date = params['date'] || '';

      if (this.from && this.to && this.date) {
        this.search();
      }
    });
  }

  search() {
    this.api.getDepartures(this.from, this.to, this.date).subscribe(result => {
      this.trains = result[0]?.trains || [];
      console.log(this.trains);
    });
  }

  getDuration(departure: string, arrival: string): string {
    const start = new Date(`1970-01-01T${departure}`);
    const end = new Date(`1970-01-01T${arrival}`);
    const diff = (end.getTime() - start.getTime()) / 1000;

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    return `${hours} სთ ${minutes} წთ`;
  }

  book(trainId: number, vagonId: number): void {
    this.router.navigate(['/booking'], {
      queryParams: {
        train_id: trainId,
        vagon_id: vagonId
      }
    });
  }
}
