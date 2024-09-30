import { Component, ViewEncapsulation  } from '@angular/core';
import { Router } from "@angular/router";

// import { WebSocketService } from '../service/webSocket.service';
import { AuthService } from '../service/author.service';

import { PrimeNgSharedModule } from './shared.module';
import { AngularSharedModule } from "./shared.module";

import { MenubarComponent } from './menubar/menubar.component';
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
    // Components,
    MenubarComponent,
    SignInComponent,
    CalendarComponent
  ]
})
export class AppComponent {

  messages: string[] = [];
  


  constructor(
    private router: Router,
    // public webSocketService: WebSocketService,
    public authService: AuthService,
    public swalService: SwalService
  ) { }

  ngOnInit() {

    // this.webSocketService.initializeWebSocketConnection();

    
  }

  

  ngOnDestroy(): void {
    // this.webSocketService.disconnect();
  }

}