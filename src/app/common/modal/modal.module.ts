import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalInnerDirective } from './modal-inner.directive';



@NgModule({
  declarations: [
    ModalComponent,
    ModalInnerDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
