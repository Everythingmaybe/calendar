import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { RecordType, User } from '../../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { Day, getMonthDays, getMonthName } from '../../../common/utils/date';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'calendar-user-execute',
  templateUrl: './calendar-user-execute.component.html',
  styleUrls: ['./calendar-user-execute.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarUserExecuteComponent implements OnInit {

  private readonly currentDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  readonly filterForm = this.formBuilder.group({
    type: [[]],
    user: [[]]
  })

  readonly users$: Observable<User[]> = this.calendarService.getUsers().pipe(
    shareReplay(1)
  );

  readonly types$: Observable<RecordType[]> = this.calendarService.getRecordTypes().pipe(
    shareReplay(1)
  )

  readonly days$: Observable<Day[]> = this.currentDate$.pipe(
    map((date) => getMonthDays(date)),
    shareReplay(1)
  )

  readonly monthName$: Observable<string> = this.currentDate$.pipe(
    map((date) => getMonthName(date)),
    distinctUntilChanged()
  )

  readonly year$: Observable<number> = this.currentDate$.pipe(
    map((date) => date.getFullYear()),
    distinctUntilChanged()
  )

  constructor(
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

  }

  changeMonth(prev: boolean = false): void {
    const currentDate = this.currentDate$.value;
    const step = prev ? -1 : 1;
    currentDate.setMonth(currentDate.getMonth() + step);
    this.currentDate$.next(currentDate);
  }
}
