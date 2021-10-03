import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Record, RecordType, User } from '../../types';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
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

  readonly usersWithRecords$ = combineLatest([
    this.currentDate$,
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.value as { user: number[], type: number[] }))
  ]).pipe(
    switchMap(([date, { user, type }]) => this.calendarService.getRecords(date, user, type)),
    switchMap((records: Record[]) => combineLatest([this.users$, this.types$]).pipe(
      map(([users, types]) => this.calendarService.mapUsersWithRecords(users, records, types))
    ))
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
