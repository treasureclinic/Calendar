import { Component, OnInit, ViewChild } from "@angular/core";

import { Service } from "../../service/service";
import { SwalService } from "../../service/swal.service";
import { AuthService } from '../../service/author.service';
import { CalendarService } from "../../service/calendar.service";

import { PrimeNgSharedModule } from "../shared.module";
import { AngularSharedModule } from "../shared.module";
import { EventData, ColorType } from "../../model/model";

import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular'; // PrimeNG 的 FullCalendar 模块
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // 用于事件交互
import dayGridPlugin from '@fullcalendar/daygrid'; // 月视图
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

    RESERVATION_STARTHOURS = 12;
    RESERVATION_STARTMINUTES = 30;

    RESERVATION_ENDHOURS = 20;
    RESERVATION_ENDMINUTES = 30;
    
    constructor(
        public swalService: SwalService,
        public authService: AuthService,
        public calendarService: CalendarService,
        public service: Service
    ) {

    }

    async ngOnInit() {
        
        this.initialDateEvents();
        this.service.getJsonData('consumeType').subscribe(
            (result: any[]) => {
                this.consumeTypeMap = new Map(
                    result.map(
                        mapResult => [mapResult.type, mapResult.value]
                    )
                );
            }
        );
        this.service.getJsonData('colorType').subscribe(
            (result: ColorType[]) => {
                this.colorTypeList = result;
                this.textColorMap = new Map(
                    result.map(
                        mapResult => [mapResult.value, mapResult.textColor]
                    )
                );
                console.log(this.textColorMap)
            }
        );
       
        await this.getEventDataList();
    }

    formMode: string = '';

    showDateDialog: boolean = false;
    showEventFormDialog: boolean = false;
    consumeTypeMap: Map<string, string>;

    colorTypeList: ColorType[] = [];
    textColorMap: Map<string, string>;

    startTimeDropDownList: {
        value: string,
        label: string
    } [];

    endTimeDropDownList: {
        value: string,
        label: string
    } [];

    selectedDate: Date = new Date();
    selectedDateEvents: EventData[] = [];
    selectedEvent: EventData = new EventData('', '', '');
    eventDataList: EventData[] = [];

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;
    calendarOptions: CalendarOptions = {
        // themeSystem: 'bootstrap5',
        initialView: 'dayGridMonth',
        locale: zhTwLocale,
        plugins: [
            dayGridPlugin,
            interactionPlugin,
        ],  // 添加日历插件
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth'
        },
        buttonText: {
            today: '今天',
            month: '月視圖',
            week: '週視圖',
            day: '日視圖',
            list: '周列表'
        },
        height: 'auto',
        contentHeight: 500,
        selectable: true,  // 允许点击选择日期
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
        select: this.handleTimeSelect.bind(this),
        events: [],
    };

    // 直接點擊事件
    handleEventClick(clickInfo: EventClickArg) {

        this.calendarService.getEventDataById(Number(clickInfo.event.id)).subscribe(
            (eventData: EventData )=> {
                this.editEvent(eventData);
            }
        );

    }

    // 點擊日期
    handleDateClick(clickInfo: DateClickArg) {
        if (clickInfo.view.type == 'dayGridMonth') {

            this.selectedDate = clickInfo.date; // p-dialog日期

            this.resetSelectedDateEvents();

            this.showDateDialog = true;
        }
    }

    async resetSelectedDateEvents() {

        await this.getEventDataList();

        this.selectedDateEvents = this.eventDataList.slice().filter(event => event.reservationDate == this.service.dateToString(this.selectedDate));

        this.selectedDateEvents.sort((a, b) => Number(a.reservationStartTime) - Number(b.reservationStartTime));

    }

    // 新增事件
    newEvent(selectedDate: Date) {
        this.formMode = '1';
        this.selectedEvent = new EventData(
            this.service.dateToString(selectedDate),
            null,
            null
        );
        this.authService.getCurrentUser().subscribe(
            result => {
                this.selectedEvent.username = result.username;
                this.selectedEvent.consultant = result.username;
            }
        )
        this.showEventFormDialog = true;
    }
    
    editEvent(eventData: EventData) {
        this.formMode = '2';
        this.selectedEvent =  Object.assign({}, eventData);
        console.log(eventData)
        console.log(this.selectedEvent)
        this.showEventFormDialog = true;
    }

    deleteEvent(eventData: EventData) {
        this.swalService.deleteSwal().then(
            swalresult => {
                if (swalresult.isDenied) {
                    this.calendarService.deleteEventData(eventData.eventId).subscribe(
                        () => {
                            this.swalService.successTextSwal('刪除成功');
                            this.resetSelectedDateEvents();
                            this.showEventFormDialog = false;
                        },
                        error => {
                            this.swalService.failSwalText('刪除失敗');
                        }
                    )
                }
            }
        )
    }

    onSubmit() {

        if (!this.selectedEvent?.reservationStartTime) {
            this.swalService.infoSwal('請選擇預約時間');
            return;
        }

        if (!this.selectedEvent?.reservationEndTime) {
            this.swalService.infoSwal('請選擇結束時間');
            return;
        }

        this.swalService.confirmTextSwal('確定送出？', '確定', '取消').then(
            swalResult => {
              if (swalResult.isConfirmed) {
                this.swalService.loadingSwal();
                this.saveEventToDB(this.selectedEvent).then(
                    () => {
                        this.swalService.successSwal();
                        this.showEventFormDialog = false;

                        this.resetSelectedDateEvents();
                    }
                ).catch(
                    () => {
                        this.swalService.failedSwal();
                    }
                );
              }
            },
          )
    }

    // 日期初始化
    initialDateEvents() {
        let startDatetime = new Date();
        let endDatetime = new Date();

        startDatetime.setHours(this.RESERVATION_STARTHOURS, this.RESERVATION_STARTMINUTES, 0); // 起始時間
        endDatetime.setHours(this.RESERVATION_ENDHOURS, this.RESERVATION_ENDMINUTES, 0); // 結束時間

        this.startTimeDropDownList = [];
        
        while (startDatetime < endDatetime) {

            this.startTimeDropDownList.push({
                value: 
                    startDatetime.getHours().toString().padStart(2, '0') +
                    startDatetime.getMinutes().toString().padStart(2, '0') +
                    startDatetime.getSeconds().toString().padStart(2, '0'),
                label: 
                    startDatetime.getHours().toString().padStart(2, '0') + ":" +
                    startDatetime.getMinutes().toString().padStart(2, '0')
                })

            startDatetime.setMinutes(startDatetime.getMinutes() + 30);

        }

        this.endTimeDropDownList = this.startTimeDropDownList.slice();
        this.startTimeDropDownList.pop();

    }

    // 事件初始化
    getEventDataList(): Promise<void> {
        return new Promise<void> ((resolve, reject) => {
            this.calendarService.getEventDatas().subscribe(
                (eventDatas: EventData[]) => {
                    console.log(eventDatas);
    
                    this.eventDataList = eventDatas;
    
                    let calendarApi = this.calendarComponent.getApi();
                    calendarApi.removeAllEvents();
                    for (let event of this.eventDataList) {
    
                        let clientname = event.clientname ? event.clientname : '(未命名客戶)';
                        let treatment = event.treatment ? event.treatment : '(未命名療程)';
    
                        calendarApi.addEvent({
                            id: event.eventId.toString(),
                            title: clientname + ' : ' + treatment,
                            start: this.service.dateTimeToCalendarTime(event.reservationDate, event.reservationStartTime), 
                            end: this.service.dateTimeToCalendarTime(event.reservationDate, event.reservationEndTime),  
                            allDay: false,
                            backgroundColor: event.backgroundColor,
                        })
                    }
                    resolve();
                },
                () => {
                    reject();
                }
            )
        });
    }

    resetDialog() {
        this.selectedDate = new Date();
        this.selectedDateEvents = [];
    }

    // 处理日期选择
    handleTimeSelect(selectInfo: DateSelectArg) {
        if (selectInfo.view.type == 'timeGridDay') {
            console.log(selectInfo);
            
        }
    }

    setEndTime() {
        let hours = Number(this.selectedEvent.reservationStartTime.substring(0, 2));
        let minutes = Number(this.selectedEvent.reservationStartTime.substring(2, 4));
        if (minutes == 30) {
            hours ++;
            minutes = 0;
        } else if (minutes == 0) {
            minutes += 30;
        }
        this.selectedEvent.reservationEndTime = hours.toString().padStart(2, '0') + minutes.toString().padStart(2, '0')  + '00'
    }

    // 模拟保存事件到数据库
    saveEventToDB(eventData: EventData): Promise<void> {
        
        return new Promise<void> ((resolve, reject) => { 
            this.calendarService.saveEventData(eventData).subscribe(
                (result: EventData) => {
                    console.log('事件已保存到数据库:', this.selectedEvent);
                    this.selectedEvent.eventId = result.eventId;
                    resolve();
                },
                error => {
                    reject(error);
                }
            )
        })
            
    }

    

}