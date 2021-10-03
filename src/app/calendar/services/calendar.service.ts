import { Injectable } from '@angular/core';
import { Record, RecordResponse, RecordType, RecordWithType, User, UserResponse, UserWithRecords } from '../types';
import { CalendarRepositoryService } from '../repositories/calendar.repository.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

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
        "user_id":666,
        "type_id":2,
        "description":"Работа",
        "start":"2021-10-02 08:00",
        "end":"2021-10-02 18:00"
      },
      {
        "user_id":666,
        "type_id":2,
        "description":"Работа",
        "start":"2021-10-03 08:00",
        "end":"2021-10-03 18:00"
      },
      {
        "user_id":666,
        "type_id":2,
        "description":"Работа",
        "start":"2021-10-04 08:00",
        "end":"2021-10-04 18:00"
      }
    ];
    // return this.calendarRepository.addRecords(records);
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
      type: recordTypesDict[record.type_id],
    }
  }

  mapUsers(usersResponse: UserResponse[]): User[] {
    return usersResponse.map(({ id, name }) => ({
      id,
      name
    }))
  }

  mapUsersWithRecords(users: User[], records: Record[], recordTypes: RecordType[]): UserWithRecords[] {
    const recordTypesDict = recordTypes.reduce((dict: {[key: number]: RecordType}, type) => {
      dict[type.id] = type;
      return dict;
    }, {})

    const recordsByUserId = records.reduce((dict: {[key: number]: Record[]}, record) => {
      if (!dict[record.user_id]) {
        dict[record.user_id] = []
      }
      dict[record.user_id].push(record);
      return dict;
    }, {})

    return users
      .filter((user) => recordsByUserId[user.id])
      .map((user) => ({
        ...user,
        records: recordsByUserId[user.id]
          .map((record) => this.mapRecordWithType(record, recordTypesDict))
      }))
  }
}
