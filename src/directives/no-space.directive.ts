import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNoSpace]',
  standalone: true  // 設置為standalone
})
export class NoSpaceDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();  // 阻止輸入空白
    }
  }
}
