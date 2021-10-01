import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RecordTypesResponse, UsersResponse } from '../types';
import { Observable } from 'rxjs';

@Injectable()
export class CalendarRepositoryService {

  private readonly url: string = environment.calendar_api_url;

  constructor(
    private http: HttpClient
  ) { }

  fetchCalendarData() {
    return this.http.get(this.url)
  }

  fetchUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.url + '/users')
  }

  fetchRecordTypes(): Observable<RecordTypesResponse> {
    return this.http.get<RecordTypesResponse>(this.url + '/types')
  }
}
