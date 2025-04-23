import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  stations = [
    { name: 'თბილისი', code: 'TBS' },
    { name: 'ბათუმი', code: 'BTM' },
    { name: 'ქუთაისი', code: 'KUT' }
  ];
}
