import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { UserSettingComponent } from './setting/userSetting/userSetting.component';
import { UserListComponent } from './setting/userList/userList.component';

export const routes: Routes = [
    { path: 'calendar', component: CalendarComponent},
    { path: 'userSetting', component: UserSettingComponent},
    { path: 'userList', component: UserListComponent},
];
