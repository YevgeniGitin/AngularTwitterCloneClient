import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appConfirmation]'
})
export class ConfirmationDirective {
  @Input() appConfirmation:string;
  @Output() confirmation= new EventEmitter<boolean>();
  
  constructor() { }

  @HostListener('click',['$event']) 
  askConfirmation(event: MouseEvent) {
    if(confirm(this.appConfirmation)) {
      this.confirmation.emit(true);
    }else{
      this.confirmation.emit(false);
    }

  }

}
