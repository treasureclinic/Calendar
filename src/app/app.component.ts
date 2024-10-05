import { Component, ViewEncapsulation  } from '@angular/core';

import { AuthService } from '../service/author.service';

import { PrimeNgSharedModule } from './shared.module';
import { AngularSharedModule } from "./shared.module";

import { MenubarComponent } from './menubar/menubar.component';
import { SignInComponent } from './login/sign-in.component';

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
    SignInComponent
  ]
})
export class AppComponent {

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
    
  }

}