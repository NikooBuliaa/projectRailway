import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station.model';
import { Departure } from '../models/departure.model';
import { Train } from '../models/train.model';
import { Vagon } from '../models/vagon.model';
import { Ticket } from '../models/ticket.model';


@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly API_URL = 'https://railway.stepprojects.ge/api/';

  constructor(private http: HttpClient) {}

  getStations(): Observable<any> {
    return this.http.get(this.API_URL + 'stations');
  }

  getDepartures(from: string, to: string, date: string): Observable<any> {
    return this.http.get(`${this.API_URL}getdeparture?from=${from}&to=${to}&date=${date}`);
  }

  getTrain(trainId: number): Observable<any> {
    return this.http.get(`${this.API_URL}trains/${trainId}`);
  }

  getVagon(vagonId: number): Observable<any> {
    return this.http.get(`${this.API_URL}getvagon/${vagonId}`);
  }

  registerTicket(ticketData: any): Observable<any> {
    return this.http.post(`${this.API_URL}tickets/register`, ticketData);
  }

  checkTicketStatus(ticketId: number): Observable<any> {
    return this.http.post(`${this.API_URL}tickets/checkstatus`, { ticketId });
  }

  fetchTickets(): Observable<any> {
    return this.http.get(`${this.API_URL}tickets`);
  }
}
