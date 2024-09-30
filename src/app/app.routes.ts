import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { UserSettingComponent } from './setting/userSetting/userSetting.component';

export const routes: Routes = [
    { path: 'calendar', component: CalendarComponent},
    { path: 'userSetting', component: UserSettingComponent}
];
