import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';


export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},
    {path: 'trains', loadComponent: () => import('./components/train-list/train-list.component').then(m => m.TrainListComponent)},
    {path: 'booking', loadComponent: () => import('./pages/booking-page/booking-page.component').then(m => m.BookingPageComponent)},
    {path: 'transaction', loadComponent: () => import('./pages/transaction-page/transaction-page.component').then(m => m.TransactionPageComponent)},
    {path: '**', component: ErrorComponent} 
    
];
