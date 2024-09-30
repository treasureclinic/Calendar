import { Component, Input, OnInit } from "@angular/core";
import { SwalService } from "../../service/swal.service";
import { AuthService } from '../../service/author.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { PrimeNgSharedModule } from "../shared.module";
import { AngularSharedModule } from "../shared.module";
import { User } from "../../model/model";


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    standalone: true,
    imports: [
        AngularSharedModule,
        PrimeNgSharedModule
    ]
})
export class SignInComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public swalService: SwalService,
        public authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    loginForm: FormGroup;

    ngOnInit(): void {
        
    }

    username: string;

    errorText: string;
    htmlContent: string = '<i *ngIf="showLoadingIcon" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>';

    showLoadingIcon: boolean = false;
    pwdDialogVisitable: boolean = false;

    checkRememberPwd() {
        this.swalService.loadingSwal();
        this.authService.getUserByUsername(this.username).subscribe(
            (user: User) => {
                console.log(user);
                if (user.rememberPwd == '1') {

                    this.authService.login(user); // 記住密碼直接登入
                    this.router.navigate(['/calendar']);
                } else if (user.rememberPwd == '0') {

                    this.pwdDialogVisitable = true; // 彈出輸入密碼視窗

                }
                this.swalService.closeSwal();
            },
            (error: HttpErrorResponse) => {
                this.swalService.failSwalText('登入失敗：' + error.status);
            }
        )
    }

    onSubmit() {

        this.showLoadingIcon= true;
        this.authService.loginCheckout(this.loginForm).subscribe(
            (user: User) => {

                if (user) {
                    this.errorText = '';
                    this.authService.login(user);
                    this.router.navigate(['/calendar']);
                } else {
                    this.errorText = '登入失敗'
                }
                
                this.showLoadingIcon= false;
            },
            (error: HttpErrorResponse) => {
                this.swalService.failSwalText('登入失敗：' + error.status);
            }
        )
    }


}