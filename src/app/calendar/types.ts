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

export type UsersResponse = Response<UserResponse>;
export type RecordTypesResponse = Response<RecordType>

export interface User {
  id: number;
  name: string;
}

export interface RecordType {
  id: number;
  name: string;
  color: string;
}
