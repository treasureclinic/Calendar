import { Injectable } from "@angular/core";
import { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'  // 全局可用的服务
})
export class SwalService {

  public successSwal() {
    return Swal.fire({
      title: '儲存成功',
      icon: 'success',
    });
  }

  public successTextSwal(text: string) {
    return Swal.fire({
      title: text,
      icon: 'success',
    });
  }

  public successTextSwalNoDismiss(text: string) {
    return Swal.fire({
      title: text,
      icon: 'success',
      allowOutsideClick: false,
      showConfirmButton: false,
      showDenyButton: false,
      showCancelButton: false,
    });
  }

  public failedSwal() {
    return Swal.fire({
      title: "儲存失敗",
      icon: "error",
    });
  }

  public failSwalText(text: string) {
    return Swal.fire({
      title: text,
      icon: "error",
    })
  }

  public failSwalTextNoDismiss(text: string) {
    return Swal.fire({
      title: text,
      icon: "error",
      allowOutsideClick: false,
      showConfirmButton: false,
      showDenyButton: false,
      showCancelButton: false,
    })
  }
  
  public savingSwal() {
    return Swal.fire({
      title: "儲存中...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })
  }

  public loadingSwal() {
    return Swal.fire({
      title: "讀取中...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })
  }

  public loadingTextSwal(text: string) {
    return Swal.fire({
      title: text,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })
  }

  public loadingFailSwal() {
    return Swal.fire({
      title: "讀取失敗",
      icon: "error",
    });
  }


  public closeSwal() {
    return Swal.close();
  }

  public infoSwal(text: string) {
    return Swal.fire({
      title: text,
      icon: "info",
    });
  }

  public deleteSwal(): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: '確定刪除？',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `刪除`,
      cancelButtonText: `取消`
    });
  }

  public confirmTextSwal(question: string, confirm: string, cancel: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: question,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: confirm,
      cancelButtonText: cancel
    });
  }
  
}