import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modalInner]'
})
export class ModalInnerDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}
}
