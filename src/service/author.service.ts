import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/model';
import { VerifyData } from '../model/model';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User>(null);

  signUpForm: FormGroup;
  verifyRecordId: string;

  constructor(
    private http: HttpClient,
    private service: Service
  ) { 
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      this.isLoggedIn.next(true);
      this.currentUser.next(user);
    }
    this.getUserList().subscribe(
      (userList: User[]) => {
        this.adminList = userList.slice().filter(user => user.department == 'ADM');
        this.consultantList = userList.slice().filter(user => user.department == 'COS');
        this.doctorList = userList.slice().filter(user => user.department == 'DOC');
        this.nurseList = userList.slice().filter(user => user.department == 'NUR');

      },
      error => {

      }
    )
  }

  public adminList: User[] = [];
  public consultantList: User[] = [];
  public doctorList: User[] = [];
  public nurseList: User[] = [];


  // 登入用戶
  login(user: User) {
    this.isLoggedIn.next(true);
    this.currentUser.next(user);
    // 可以在這裡添加更多的邏輯，例如保存 token 到 localStorage
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  
  // 登出用戶
  logout() {
    this.isLoggedIn.next(false);
    this.currentUser.next(null);
    sessionStorage.setItem('user', null);
    // 清除 localStorage 中的 token 等
  }

  // 獲取登入狀態
  getLoginStatus(): boolean {
    return this.isLoggedIn.value;
  }

  // 獲取當前用戶
  getCurrentUser() {
      return this.currentUser.asObservable();
      
  }

  public getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.service.url + '/getUserList');
  }

  public getUserNameList(): Observable<string[]> {
    return this.http.get<string[]>(this.service.url + '/getUserNameList');
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.post<User>(this.service.url + '/getUserByUsername', username);
  }

  public loginCheckout(loginForm: FormGroup): Observable<User> {
    return this.http.post<User>(this.service.url + '/loginCheckout', loginForm.value);
  }

  public signOut(userId: string): Observable<number> {
    return this.http.post<number>(this.service.url + '/signOut', userId);
  }

  public signUpCheckEmail(signUpForm: FormGroup): Observable<boolean> {
    return this.http.post<boolean>(this.service.url + '/signUpCheckEmail', signUpForm.value);
  }

  public signUp(signUpForm: FormGroup): Observable<boolean> {
    return this.http.post<boolean>(this.service.url + '/signUp', signUpForm.value);
  }

  public toSendEmail(user: User):Observable<string> {
    return this.http.post(
      this.service.url + '/toSendEmail',
      JSON.stringify(user),
      {
        responseType: 'text'
      }
    );
  }

  public verifyEmail(verifyData: VerifyData):Observable<string> {
    return this.http.post(
      this.service.url + '/verifyEmail',
      JSON.stringify(verifyData),
      { 
          responseType: 'text' 
      }
  );
  }

}
