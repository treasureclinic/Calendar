import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';

import { SwalService } from "../../service/swal.service";
import { AuthService } from '../../service/author.service';

import { PrimeNgSharedModule } from "../shared.module";
import { AngularSharedModule } from "../shared.module";
import { User } from "../../model/model";


@Component({
    selector: 'app-menubar',
    templateUrl: './menubar.component.html',
    styleUrls: ['./menubar.component.css'],
    standalone: true,
    imports: [
        AngularSharedModule,
        PrimeNgSharedModule
    ]
})
export class MenubarComponent implements OnInit {

    constructor(
        private router: Router,
        public swalService: SwalService,
        public authService: AuthService
    ) {

    }
    items: MenuItem[] | undefined;
    username: string;

    ngOnInit(): void {

        this.authService.getCurrentUser().subscribe(
            (user: User) => {
                if (user) {
                    this.username = user.username;
                    this.items = [
                        {
                            label: '行事曆',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: '/calendar',
                        },
                        {
                            label: '設定',
                            icon: 'pi pi-fw pi-wrench',
                            items: [
                                {
                                  label: '個人資料',
                                  icon: 'pi pi-fw pi-id-card',
                                  routerLink: '/userSetting'
                                },
                              ]
                        },
                    ];

                    if (user.level == '1' && user.department == 'ADM') {
                        this.items[1].items.push({
                            label: '使用者管理',
                            icon: 'pi pi-fw pi-users',
                            routerLink: '/userList'
                        });
                    }
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
                                window.location.reload();
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

        

}