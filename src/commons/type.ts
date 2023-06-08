export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  displayName: string;
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  user: AuthenticatedUser;
}

export interface AuthenticatedUser {
  displayName: string;
  email: string;
  role: string;
}

export interface Authorities {
  authority: string;
}

export interface Project {
  id: number;
  description: string;
  subject: string;
}

export interface Teacher {
  id: number;
  nome: string;
  email: string;
}

export type SignUpParams = {
  name: string
  username: string
  password: string
  email: string
}

