import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarUserExecuteComponent } from './components/calendar-user-execute/calendar-user-execute.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarRepositoryService } from './repositories/calendar.repository.service';
import { CalendarService } from './services/calendar.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CalendarUserExecuteComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
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
