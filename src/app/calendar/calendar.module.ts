import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarUserExecuteComponent } from './components/calendar-user-execute/calendar-user-execute.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarRepositoryService } from './repositories/calendar.repository.service';
import { CalendarService } from './services/calendar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RecordInfoModalComponent } from './components/modals/record-info-modal/record-info-modal.component';
import { ModalModule } from '../common/modal/modal.module';

@NgModule({
  declarations: [
    CalendarUserExecuteComponent,
    RecordInfoModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  exports: [
    CalendarUserExecuteComponent
  ],
  providers: [
    CalendarRepositoryService,
    CalendarService,
    DatePipe,
  ]
})
export class CalendarModule { }
