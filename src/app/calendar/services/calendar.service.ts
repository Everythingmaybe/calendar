import { Injectable } from '@angular/core';
import { RecordType, User, UserResponse } from '../types';
import { CalendarRepositoryService } from '../repositories/calendar.repository.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CalendarService {

  constructor(
    private calendarRepository: CalendarRepositoryService,
  ) { }

  getRecordTypes(): Observable<RecordType[]> {
    return this.calendarRepository.fetchRecordTypes().pipe(map(({ data }) => data))
  }

  getUsers(): Observable<User[]> {
    return this.calendarRepository.fetchUsers().pipe(map(({ data }) => this.mapUsers(data)))
  }

  mapUsers(usersResponse: UserResponse[]): User[] {
    return usersResponse.map(({ id, name }) => ({
      id,
      name
    }))
  }
}
