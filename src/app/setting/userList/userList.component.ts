import { Component, OnInit } from "@angular/core";

import { Service } from "../../../service/service";
import { SwalService } from "../../../service/swal.service";
import { AuthService } from '../../../service/author.service';
import { CalendarService } from "../../../service/calendar.service";
import { NoSpaceDirective } from "../../../directives/no-space.directive";

import { PasswordValidatorDirective } from "../../../directives/password-validator.directive";

import { PrimeNgSharedModule } from "../../shared.module";
import { AngularSharedModule } from "../../shared.module";
import { User,Type } from "../../../model/model";

@Component({
    selector: 'app-userList',
    templateUrl: './userList.component.html',
    styleUrls: ['./userList.component.css'],
    standalone: true,
    imports: [
        AngularSharedModule,
        PrimeNgSharedModule,
        NoSpaceDirective,
        PasswordValidatorDirective
    ]
})
export class UserListComponent implements OnInit {

    
    constructor(
        public swalService: SwalService,
        public authService: AuthService,
        public calendarService: CalendarService,
        public service: Service
    ) {
        
    }

    user: User = new User(
        null,
        '',
        '',
        null,
        null,
        null,
        null,
        '0'
    );
    userList: User[];

    departmentTypeList: Type[] = [];

    userLevelList: Type[] = [];

    showNewUserDialog: boolean = false;

    oldPasswordCheck: boolean = false;

    async ngOnInit() {

        await new Promise<void> ((resolve, reject) => {
            this.service.getJsonData('departmentType').subscribe(
                (result: Type[]) => {
                    this.departmentTypeList = result;
                    resolve();
                },
                () => {
                    reject();
                }
            );
        })
        
        await new Promise<void> ((resolve, reject) => {
            this.service.getJsonData('userLevel').subscribe(
                (result: Type[]) => {
                    this.userLevelList = result;
                    resolve();
                },
                () => {
                    reject();
                }
            );
        })

        this.authService.getUserList().subscribe(
            result => {
                this.userList = result;
            }
        )
    }

    newUser() {
        this.showNewUserDialog = true;
        this.user = new User(
            null,
            '',
            '',
            null,
            null,
            null,
            null,
            '0'
        );
    }

    save(user: User) {
        console.log(user)
        if (this.checkValid(user)) {
            this.swalService.loadingSwal();
            this.authService.saveUser(user).subscribe(
                (result: boolean) => {
                    if (user.userId) {
                        this.swalService.closeSwal();
                    } else {
                        this.swalService.successSwal();
                        this.ngOnInit();
                    }
                    this.showNewUserDialog = false;
                    
                    console.log(result);
                },
                () => {
                    this.swalService.failedSwal();
                }
            )
        }
    }

    checkUsername(user: User): boolean {
        if (this.authService.allUserList.map(item => item.username).includes(user.username)) {
            this.swalService.infoSwal('使用者名稱已被使用');
            return false;
        }
        return true;
    }

    checkValid(user: User): boolean {
        if (user.username == '' || user.username == null) {
            this.swalService.infoSwal('使用者名稱不可為空白')
            return false;
        }
        if (!user.email.includes('@')) {
            this.swalService.infoSwal('Email不符合格式')
            return false;
        }
        if (!user.department) {
            this.swalService.infoSwal('請選擇部門別')
            return false;
        }
        if (!user.level) {
            this.swalService.infoSwal('請選擇層級')
            return false;
        }
        return true;
    }

    resetPwd(user: User) {

        this.swalService.confirmTextSwal('確定重設？', '確定', '取消').then(
            swalresult => {
                if(swalresult.isConfirmed) {
                    this.swalService.loadingSwal();
                    this.authService.resetPwd(user).subscribe(
                        (result: boolean) => {
                            if (result) {
                                this.swalService.successTextSwal('重設成功，密碼已寄至信箱');
                                this.ngOnInit();
                            } else {
                                this.swalService.failSwalText('重設失敗');
                            }
                        },
                        () => {
                            this.swalService.failSwalText('重設失敗');
                        }
                    )
                }
            }
        )
    }

    changeUserStatus(user: User, status: string) {

        this.swalService.confirmTextSwal(status == '0' ? '確定啟用？' : '確定停用？', '確定', '取消').then(
            swalresult => {
                if(swalresult.isConfirmed) {
                    this.swalService.loadingSwal();
                    this.authService.saveUserData({
                        username: user.username, 
                        param: status, 
                        type: 'status'
                    }).subscribe(
                        (result: boolean) => {
                            if (result) {
                                this.swalService.successTextSwal('更改成功');
                                this.ngOnInit();
                            } else {
                                this.swalService.failSwalText('更改失敗');
                            }
                        },
                        () => {
                            this.swalService.failSwalText('更改失敗');
                        }
                    )
                }
            }
        )
    }

    deleteUser(user: User) {

        this.swalService.confirmTextSwal('確定刪除？', '確定', '取消').then(
            swalresult => {
                if(swalresult.isConfirmed) {
                    this.swalService.loadingSwal();
                    this.authService.deleteUser(user).subscribe(
                        (result: boolean) => {
                            if (result) {
                                this.swalService.successTextSwal('刪除成功');
                                this.ngOnInit();
                            } else {
                                this.swalService.failSwalText('刪除失敗');
                            }
                        },
                        () => {
                            this.swalService.failSwalText('刪除失敗');
                        }
                    )
                }
            }
        )
    }

}