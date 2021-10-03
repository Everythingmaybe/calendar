export interface Response<Type> {
  success: number;
  data: Type[];
}

export interface UserResponse {
  avatar_mini: string;
  id: number;
  name: string;
  position: string;
  url: string;
}

export interface RecordResponse {
  id: number;
  user_id: number;
  type_id: number;
  description: string;
  start: string;
  end: string
}

export interface NewRecord extends Omit<RecordResponse, 'id'>{}

export interface User {
  id: number;
  name: string;
}

export interface RecordType {
  id: number;
  name: string;
  color: string;
}

export interface Record {
  id: number;
  user_id: number;
  type_id: number;
  description: string;
  start: string;
  end: string;
  start_date: Date;
  end_date: Date;
}

export interface UserWithRecords extends User {
  records: RecordWithType[]
}

export type RecordWithType = {
  type: RecordType
} & Omit<Record, 'type_id' | 'user_id'>

export type UsersResponse = Response<UserResponse>;
export type RecordTypesResponse = Response<RecordType>
export type RecordsResponse = Response<RecordResponse>
