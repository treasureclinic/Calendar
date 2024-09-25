import { Component, Input, OnInit } from "@angular/core";
import { SwalService } from "../../service/swal.service";
import { AuthService } from '../../service/author.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { PrimeNgSharedModule } from "../shared.module";
import { AngularSharedModule } from "../shared.module";
import { User } from "../../model/model";

import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // PrimeNG 的 FullCalendar 模块
import interactionPlugin from '@fullcalendar/interaction'; // 用于事件交互
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid'; // 月视图
import timeGridPlugin from '@fullcalendar/timegrid'; // 周、天视图
import zhTwLocale from '@fullcalendar/core/locales/zh-cn';  // 引入中文语言包

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    standalone: true,
    imports: [
        AngularSharedModule,
        PrimeNgSharedModule,
        FullCalendarModule
    ]
})
export class CalendarComponent implements OnInit {

    ngOnInit(): void {

    }
    calendarOptions: CalendarOptions = {
        // themeSystem: 'bootstrap5',
        initialView: 'timeGridDay',
        locale: zhTwLocale,
        plugins: [
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin
        ],  // 添加日历插件
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridDay,listWeek'
        },
        buttonText: {
            today: '今天',
            month: '月視圖',
            week: '週視圖',
            day: '日視圖',
            list: '周列表'
        },
        noEventsContent: '無行程',
        customButtons: {
            myCustomButton: {
                text: '自訂按鈕',
                click: function () {
                    alert('你點擊了自訂按鈕!');
                }
            }
        },
        height: 'auto',
        contentHeight: 500,
        editable: true,  // 允许事件可编辑
        selectable: true,  // 允许点击选择日期
        allDaySlot: false,
        slotMinTime: '12:00:00',  // 时间范围开始
        slotMaxTime: '20:00:00',  // 时间范围结束
        slotDuration: '00:30:00',  // 每半小时一栏
        slotLabelInterval: '00:30',  // 每 30 分钟显示一个标签
        slotLabelFormat: {  // 自定义时间段显示格式
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 24小时制
        },
        eventTimeFormat: {  // 自定义事件时间显示格式
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false  // 不显示AM/PM
        },
        eventClick: this.handleEventClick.bind(this),
        dateClick: this.handleDateClick.bind(this),
        select: this.handleDateSelect.bind(this),  // 处理日期选择
        events: [
            {
                id: '1',
                title: '全日事件',
                start: '2024-09-30',
                allDay: true,
                backgroundColor: '#FFD700',
                textColor: '#000000'
            },
            {
                id: '2',
                title: '会议',
                start: '2024-09-30T10:30:00',
                end: '2024-09-30T12:30:00',
                backgroundColor: '#007bff',
                url: 'https://example.com/meeting',
                extendedProps: {
                    description: '定期会议',
                    location: '会议室A'
                }
            }
        ],  // 预先加载事件（可以通过 API 获取）
    };
    handleEventClick(clickInfo: EventClickArg) {
        console.log(clickInfo);
    }

    handleDateClick(arg: any) {
        const calendarApi = arg.view.calendar;  // 获取日历实例
        calendarApi.changeView('timeGridDay', arg.dateStr);  // 切换到天视图，显示点击的日期
    }

    // 处理日期选择
    handleDateSelect(selectInfo: DateSelectArg) {
        console.log(selectInfo);
        if (selectInfo.view.type == 'timeGridDay') {
            const title = prompt('请输入事件标题');  // 获取事件标题
            if (title) {
                const calendarApi = selectInfo.view.calendar;
                calendarApi.addEvent({

                });
                calendarApi.addEvent({ // 添加事件到日历中
                    title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay
                });

                // this.saveEventToDB({ // 调用保存到数据库的函数
                //     title,
                //     start: selectInfo.startStr,
                //     end: selectInfo.endStr,
                //     allDay: selectInfo.allDay
                // });
            }
        }

    }

    // 模拟保存事件到数据库
    saveEventToDB(eventData: any) {
        // 使用 Angular 的 HttpClient 发送 POST 请求，将事件数据插入到数据库
        // 例如，调用后端 API：this.http.post('api/events', eventData)
        console.log('事件已保存到数据库:', eventData);
    }
}