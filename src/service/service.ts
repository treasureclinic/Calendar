import { HttpClient } from "@angular/common/http";
import { Injectable, SimpleChanges, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'  // 全局可用的服务
  })
export class Service {

    public url: string;
    
    constructor(
        private http: HttpClient
    ) {
        this.url = environment.apiUrl;
    }

    public stringToDate(date_String: string): Date {
        return new Date(date_String);
    }

    // YYYYMMDD
    public dateToString(date: Date) {
        return date.getFullYear() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
    }

    // YYYY年MM月DD日
    public dateToString2(date: Date) {
        return date.getFullYear() + ' 年 '
        + (date.getMonth() + 1).toString() + ' 月 '
        + date.getDate().toString() + ' 日';
    }

    public dateToTime(date: Date) {
        return date.getHours().toString().padStart(2, '0') + date.getMinutes().toString().padStart(2, '0') + date.getSeconds().toString().padStart(2, '0')
    }

    // YYYYMMDD, HHmmss => YYYY-MM-DDThh:mm:ss
    public dateTimeToCalendarTime(date: string, time: string): string {
        return date.substring(0, 4) + '-'
        + date.substring(4, 6) + '-'
        + date.substring(6, 8) + 'T'
        + time.substring(0, 2) + ':'
        + time.substring(2, 4) + ':'
        + time.substring(4, 6);
    }

    // YYYY-MM-DDThh:mm:ss => YYYYMMDD, HHmmss
    public calendarTimeToDateTime(calendarTime: string): {date: string, time: string} {
        return {
            date: calendarTime.substring(0, 10).replaceAll('-', ''),
            time: calendarTime.substring(11, 19).replaceAll(':', '')
        }
    }

    public getJsonData(fileName: string): Observable<any> {
        return this.http.get('dat/' + fileName + '.json');
    }

    public getJsonDataChild(fileName: string): Observable<any> {
        return this.http.get('dat/' + fileName + '.json');
    }
}