import { Injectable } from '@angular/core';
import { DayWithRecords, Record, RecordResponse, RecordType, RecordWithType, User, UserResponse } from '../types';
import { CalendarRepositoryService } from '../repositories/calendar.repository.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Day } from '../../common/utils/date';

@Injectable()
export class CalendarService {

  constructor(
    private calendarRepository: CalendarRepositoryService,
    private datePipe: DatePipe
  ) { }

  getRecords(date: Date = new Date(), userIds: number[] = [], typeIds: number[] = []): Observable<Record[]> {
    const formatDate: string = this.datePipe.transform(date, 'YYYY-MM') as string;
    return this.calendarRepository.fetchRecords(formatDate, userIds, typeIds).pipe(
      map(({ data }) => this.mapRecords(data))
    )
  }

  addRecords() {
    const records = [
      {
        "user_id":667,
        "type_id":4,
        "description":"Болезнь",
        "start":"2021-10-06 00:00",
        "end":"2021-10-30 18:00"
      }
    ];
    return this.calendarRepository.addRecords(records);
  }

  getRecordTypes(): Observable<RecordType[]> {
    return this.calendarRepository.fetchRecordTypes().pipe(map(({ data }) => data))
  }

  getUsers(): Observable<User[]> {
    return this.calendarRepository.fetchUsers().pipe(map(({ data }) => this.mapUsers(data)))
  }

  mapRecords(recordsResponse: RecordResponse[]): Record[] {
    return recordsResponse.map((record) => ({
      ...record,
      start_date: new Date(record.start),
      end_date: new Date(record.end)
    }))
  }

  mapRecordWithType(record: Record, recordTypesDict: {[key: number]: RecordType}): RecordWithType {
    return {
      id: record.id,
      description: record.description,
      start: record.start,
      end: record.end,
      start_date: record.start_date,
      end_date: record.end_date,
      user_id: record.user_id,
      type: recordTypesDict[record.type_id],
    }
  }

  mapUsers(usersResponse: UserResponse[]): User[] {
    return usersResponse.map(({ id, name }) => ({
      id,
      name
    }))
  }

  mapDaysWithRecords(days: Day[], records: RecordWithType[]): DayWithRecords[] {
    return days.map((day) => {
      const dayWithRecords: DayWithRecords = {...day, records: {}};
      records.forEach((record) => {
        const recordStartDate = new Date(record.start_date);
        recordStartDate.setHours(0,0,0,0);

        if (day.date.getTime() === recordStartDate.getTime()) {
          if (!dayWithRecords.records[record.user_id]) {
            dayWithRecords.records[record.user_id] = []
          }
          dayWithRecords.records[record.user_id].push(record);
        }
      })
      return dayWithRecords;
    })
  }

  mapRecordTypesAsDict(recordTypes: RecordType[]): {[key: number]: RecordType} {
    return recordTypes.reduce((dict: {[key: number]: RecordType}, type) => {
      dict[type.id] = type;
      return dict;
    }, {})
  }
}
