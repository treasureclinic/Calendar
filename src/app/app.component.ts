import { Component, ViewEncapsulation  } from '@angular/core';
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';
// import { WebSocketService } from '../service/webSocket.service';
import { AuthService } from '../service/author.service';

import { PrimeNgSharedModule } from './shared.module';
import { AngularSharedModule } from "./shared.module";

import { SignInComponent } from './login/sign-in.component';
import { CalendarComponent } from './calendar/calendar.component';

import { SwalService } from '../service/swal.service';
import { User } from '../model/model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,  // 禁用样式封装
  imports: [
    AngularSharedModule,
    PrimeNgSharedModule,
    // Components
    SignInComponent,
    CalendarComponent
  ]
})
export class AppComponent {

  messages: string[] = [];
  items: MenuItem[] | undefined;

  username: string;

  constructor(
    private router: Router,
    // public webSocketService: WebSocketService,
    public authService: AuthService,
    public swalService: SwalService
  ) { }

  ngOnInit() {

    // this.webSocketService.initializeWebSocketConnection();

    this.items = [
      {
        label: '行事曆',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/calendar'
      },
      {
        label: '設定',
        icon: 'pi pi-fw pi-wrench',
        routerLink: '/'
      },
    ];
    console.log(this.authService.getLoginStatus())
    this.authService.getCurrentUser().subscribe(
      (user: User) => {
        if (user) {
          this.username = user.username;
        }
      },
      () => {
      }
    )
  }

  signOut(): void {
    this.swalService.confirmTextSwal('確定登出？', '確定', '取消').then(
      swalResult => {
        if (swalResult.isConfirmed) {
          this.swalService.loadingSwal();
          this.authService.signOut(this.username).subscribe(
            (result: number) => {
              if (result == 1) {
                this.authService.logout();
                this.swalService.successTextSwal('已登出');
                this.router.navigate(['/']);
              } else {
                this.swalService.failSwalText('登出失敗');
              }
            },
            () => {
              this.swalService.failSwalText('登出失敗');
            }
          )
        }
      },
      
    )
  }

  ngOnDestroy(): void {
    // this.webSocketService.disconnect();
  }

}