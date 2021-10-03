import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NewRecord, RecordResponse, RecordsResponse, RecordTypesResponse, UsersResponse } from '../types';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const records: RecordResponse[] = [
  {
    "id":1,
    "user_id":666,
    "type_id":2,
    "description":"смена 1",
    "start":"2021-10-01 08:00",
    "end":"2021-10-01 18:00"
  },
  {
    "id":2,
    "user_id":666,
    "type_id":2,
    "description":"смена 1",
    "start":"2021-10-04 08:00",
    "end":"2021-10-04 18:00"
  },
  {
    "id":3,
    "user_id":681,
    "type_id":2,
    "description":"смена 2",
    "start":"2021-10-30 08:00",
    "end":"2021-10-30 18:00"
  },
  {
    "id":4,
    "user_id":681,
    "type_id":2,
    "description":"смена 2",
    "start":"2021-10-02 08:00",
    "end":"2021-10-02 18:00"
  }
]


@Injectable()
export class CalendarRepositoryService {

  private readonly url: string = environment.calendar_api_url;

  constructor(
    private http: HttpClient
  ) { }

  fetchRecords(date: string, userIds: number[], typeIds: number[]): Observable<RecordsResponse> {
    const params = new HttpParams({ fromObject: {
      date,
      'user_id[]': userIds,
      'type_id[]': typeIds,
    }});
    return this.http.get<RecordsResponse>(this.url, { params })
    // .pipe(mapTo({ data: records, success: 1 }))
  }

  addRecords(records: NewRecord[]) {
    return this.http.post(this.url, records);
  }

  fetchUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.url + '/users')
  }

  fetchRecordTypes(): Observable<RecordTypesResponse> {
    return this.http.get<RecordTypesResponse>(this.url + '/types')
  }
}
