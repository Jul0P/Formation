export interface IUser {
  id?: number;
  username: string;
  password: string;
  role: 'user' | 'admin';
  created_at?: Date;
}

export interface IUserPayload {
  id: number;
  username: string;
  role: 'user' | 'admin';
}
