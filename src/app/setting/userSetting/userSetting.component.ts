import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";

import { Service } from "../../../service/service";
import { SwalService } from "../../../service/swal.service";
import { AuthService } from '../../../service/author.service';

import { PrimeNgSharedModule } from "../../shared.module";
import { AngularSharedModule } from "../../shared.module";
import { User, EventData, ColorType } from "../../../model/model";

import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular'; // PrimeNG 的 FullCalendar 模块
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // 用于事件交互
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid'; // 月视图
import timeGridPlugin from '@fullcalendar/timegrid'; // 周、天视图
import zhTwLocale from '@fullcalendar/core/locales/zh-cn';  // 引入中文语言包
import { CalendarService } from "../../../service/calendar.service";


@Component({
    selector: 'app-userSetting',
    templateUrl: './userSetting.component.html',
    styleUrls: ['./userSetting.component.css'],
    standalone: true,
    imports: [
        AngularSharedModule,
        PrimeNgSharedModule,
    ]
})
export class UserSettingComponent implements OnInit {

    
    constructor(
        private fb: FormBuilder,
        private router: Router,
        public swalService: SwalService,
        public authService: AuthService,
        public calendarService: CalendarService,
        public service: Service
    ) {

    }

    user: User;
    
    async ngOnInit() {
        this.authService.getCurrentUser().subscribe(
            result => {
                this.user = result;
            }
        )
    }

    

}