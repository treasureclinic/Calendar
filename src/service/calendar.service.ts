import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventData } from '../model/model';
import { VerifyData } from '../model/model';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {


    constructor(
        private http: HttpClient,
        private service: Service
    ) {
    }

    public saveEventData(eventData: EventData): Observable<EventData> {
        return this.http.post<EventData>(this.service.url + '/saveEventData', eventData);
    }

    public getEventDatas(): Observable<EventData[]> {
        return this.http.get<EventData[]>(this.service.url + '/getEventDatas');
    }

    public getEventDataById(eventId: number): Observable<EventData> {
        return this.http.post<EventData>(this.service.url + '/getEventDataById', eventId);
    }

    public deleteEventData(eventId: number): Observable<void> {
        return this.http.post<void>(this.service.url + '/deleteEventData', eventId);
    }

}
