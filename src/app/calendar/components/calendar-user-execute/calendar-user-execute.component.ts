import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { DayWithRecords, RecordType, RecordWithType, User } from '../../types';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Day, getMonthDays, getMonthName, getTimePercentPerDay } from '../../../common/utils/date';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../common/modal/modal.service';
import { RecordInfoModalComponent } from '../modals/record-info-modal/record-info-modal.component';

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

  readonly usersWithRecords$: Observable<User[]> = this.users$.pipe(
    switchMap((users) => this.records$.pipe(
      map((records) => users
      .filter((user) => records
        .find((record) => record.user_id === user.id)))
    )),
  )

  readonly records$ = combineLatest([
    this.currentDate$,
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.value as { user: number[], type: number[] }))
  ]).pipe(
    switchMap(([date, { user, type }]) => this.calendarService.getRecords(date, user, type)),
    shareReplay(1)
  )

  readonly daysWithRecords$: Observable<DayWithRecords[]> = this.days$.pipe(
    switchMap((days) => this.records$.pipe(
      switchMap((records) => this.types$.pipe(
        map((types) => this.calendarService.mapRecordTypesAsDict(types)),
        map((typesDict) => records.map((record) => this.calendarService.mapRecordWithType(record, typesDict))),
      )),
      map((records: RecordWithType[]) => this.calendarService.mapDaysWithRecords(days, records))
    ))
  )

  constructor(
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    // this.calendarService.addRecords().subscribe()
  }

  open() {
    this.modalService.open(RecordInfoModalComponent);
  }

  changeMonth(prev: boolean = false): void {
    const currentDate = this.currentDate$.value;
    const step = prev ? -1 : 1;
    currentDate.setMonth(currentDate.getMonth() + step);
    this.currentDate$.next(currentDate);
  }

  getRecordStyle({ start_date: start, end_date: end, type: { color } }: RecordWithType): {[key: string]: string} {
    const startDayDate = new Date(start);
    startDayDate.setHours(0,0,0,0);
    return {
      width: getTimePercentPerDay(end.getTime() - start.getTime()) + '%',
      left: getTimePercentPerDay(start.getTime() - startDayDate.getTime()) + '%',
      backgroundColor: color,
    }
  }
}
