import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Service } from "../../../service/service";
import { SwalService } from "../../../service/swal.service";
import { AuthService } from '../../../service/author.service';
import { CalendarService } from "../../../service/calendar.service";

import { PrimeNgSharedModule } from "../../shared.module";
import { AngularSharedModule } from "../../shared.module";
import { User, Type } from "../../../model/model";

import { NoSpaceDirective } from "../../../directives/no-space.directive";
import { PasswordValidatorDirective } from "../../../directives/password-validator.directive";



@Component({
    selector: 'app-userSetting',
    templateUrl: './userSetting.component.html',
    styleUrls: ['./userSetting.component.css'],
    standalone: true,
    imports: [
        PrimeNgSharedModule,
        AngularSharedModule,
        NoSpaceDirective,
        PasswordValidatorDirective
    ]
})
export class UserSettingComponent implements OnInit {

    
    constructor(
        public swalService: SwalService,
        public authService: AuthService,
        public calendarService: CalendarService,
        public service: Service
    ) {
        
    }

    @ViewChild('username') username: ElementRef;
    @ViewChild('email') email: ElementRef;
    @ViewChild('oldPasswordElement') oldPasswordElement: ElementRef;

    user: User;

    departmentTypeList: Type[] = [];
    departmentTypeMap: Map<string, string>;

    userLevelList: Type[] = [];
    userLevelMap: Map<string, string>;

    showPwdDialog: boolean = false;
    showNewPwdInput: boolean = false;

    oldPasswordCheck: boolean = false;

    usernameTemp: string;
    emailTemp: string;

    oldPassword: string;
    newPassword: string;
    newPasswordCheck: string;

    async ngOnInit() {

        this.service.getJsonData('departmentType').subscribe(
            (result: Type[]) => {
                this.departmentTypeList = result;
                this.departmentTypeMap = new Map(
                    result.map(
                        mapResult => [mapResult.type, mapResult.value]
                    )
                );
            }
        );
        
        this.service.getJsonData('userLevel').subscribe(
            (result: Type[]) => {
                this.userLevelList = result;
                this.userLevelMap = new Map(
                    result.map(
                        mapResult => [mapResult.type, mapResult.value]
                    )
                );
            }
        );


        this.authService.getCurrentUser().subscribe(
            result => {
                this.user = result;
            }
        )

    }

    editPwd() { 
        this.showPwdDialog = true;
        this.showNewPwdInput = false;
        this.oldPassword = '';
        this.newPassword = '';
        this.newPasswordCheck = '';
    }

    checkPwd() {
        if (!this.oldPassword) {
            this.swalService.infoSwal('請輸入密碼')
            return;
        }
        this.swalService.loadingSwal()
        this.authService.checkPwd({
            username: this.user.username,
            password: this.oldPassword
        }).subscribe(
            (result: boolean) => {
                this.swalService.closeSwal();
                if (result) {
                    this.showNewPwdInput = true;
                } else {
                    this.swalService.failSwalText('密碼錯誤');
                    this.oldPassword = '';
                }
            },
            () => {
                this.swalService.closeSwal();
            }
        )
    }

    changePwd() {

        if (!this.newPassword || !this.newPasswordCheck) {
            this.swalService.infoSwal('請輸入新密碼')
        }
        if (this.newPassword != this.newPasswordCheck) {
            this.swalService.failSwalText('輸入錯誤')
        } else {
            this.swalService.loadingSwal()
            this.authService.changePwd({
                username: this.user.username,
                password: this.newPassword
            }).subscribe(
                (result: boolean) => {
                    if (result) {
                        this.swalService.successTextSwal('更改成功')
                        this.showPwdDialog = false;
                    } else {
                        this.swalService.failSwalText('更改失敗')
                    }
                },
                () => {
                    this.swalService.failSwalText('更改失敗')
                }
            )
        }
    }

    save(data: string, type: 'username' | 'email' | 'rememberPwd' | 'sendEmail') {
        
        if (this.checkValid(data, type)) {
            this.swalService.loadingSwal();
            this.authService.saveUserData({
                username: this.usernameTemp ? this.usernameTemp : this.user.username,
                param: data,
                type: type
            }).subscribe(
                (result: boolean) => {
                    this.swalService.closeSwal();
                    if (type == 'username') {
                        this.usernameTemp = this.user.username;
                    } else if (type == 'email') {
                        this.emailTemp = this.user.email;
                    }
                    sessionStorage.setItem('user', JSON.stringify(this.user));
                    console.log(sessionStorage)
                },
                () => {
                    this.swalService.failSwalText('更改失敗');
                }
            )
        } 

    }

    checkValid(data: string, type: string): boolean {

        switch (type) {

            case 'username':
                
                if (data == '' || data == null) {
                    this.swalService.infoSwal('使用者名稱不可為空白')
                    this.user.username = this.usernameTemp;
                    return false;
                }

                break;

            case 'email':

                if (!data.includes('@')) {
                    this.swalService.infoSwal('Email不符合格式')
                    this.user.email = this.emailTemp;
                    return false;
                }

                break;
        }

        return true;
    }

}