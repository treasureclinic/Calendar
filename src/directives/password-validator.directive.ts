import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true
  }],
  standalone: true
})
export class PasswordValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    // 至少含有一個字母和一個數字，且總長度需為8位或以上
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const isValidLength = value.length >= 8;

    if (hasLetter && hasNumber && isValidLength) {
      return null;  // 輸入有效
    }

    return { invalidPassword: true };  // 輸入無效
  }
}
