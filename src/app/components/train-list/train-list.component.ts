import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-train-list',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss']
})
export class TrainListComponent  {
  trains: any[] = [];
  from : string =""
  to:string =""
  date:string =""

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     const { departure, destination, date } = params;
  //     this.api.getDepartures(departure, destination, date).subscribe(result => {
  //       this.trains = result[0]?.trains || [];
  //       console.log(this.trains);
  //     });
  //   });
  // }


  search(){
    this.api.getDepartures(this.from, this.to, this.date).subscribe(result => {
      this.trains = result[0]?.trains || [];
      console.log(this.trains);
    });
  }

  book(trainId: number): void {
    this.router.navigate(['/booking'], {
      queryParams: { train_id: trainId }
    });
  }
}
