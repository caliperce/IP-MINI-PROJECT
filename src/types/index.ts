export interface Student {
  rollNumber: string;
  name: string;
  email: string;
  password?: string;
}

export interface RegisterPayload {
  rollNumber: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  rollNumber: string;
  name: string;
  email: string;
  token?: string;
  message?: string;
}

export interface EventParticipation {
  id?: number;
  studentName: string;
  rollNumber: string;
  eventName: string;
  eventLocation: string;
  eventDate: string;
  eventDescription: string;
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';
