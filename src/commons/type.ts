export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  displayName: string;
  email: string;
  password: string;
}

export interface EditUser {
  id: number;
  name: string;
  orientador: number;
  email: string;
  role: string;
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
  name: string;
  email: string;
}

export type SignUpParams = {
  name: string
  username: string
  password: string
  email: string
}

export interface SolicitationAudit {
  id: number;
  changeDate: string;
  newStatus: string;
  solicitation: {
    createdBy: {
      name: string;
    }
    equipament: {
      form: string;
      name: string;
    };
    project: {
      description: string;
      subject: string;
      teacher: {
        name: string;
      }
    }

  }
}

