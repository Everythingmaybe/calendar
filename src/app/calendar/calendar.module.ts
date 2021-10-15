import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarUserExecuteComponent } from './components/calendar-user-execute/calendar-user-execute.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RecordInfoModalComponent } from './components/modals/record-info-modal/record-info-modal.component';
import { ModalModule } from '../common/modal/modal.module';
import { CalendarServicesModule } from './calendar-services.module';

@NgModule({
  declarations: [
    CalendarUserExecuteComponent,
    RecordInfoModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule,
    CalendarServicesModule,
  ],
  exports: [
    CalendarUserExecuteComponent
  ],
  providers: [
    DatePipe,
  ]
})
export class CalendarModule { }
