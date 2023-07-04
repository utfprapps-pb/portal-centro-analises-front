export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  displayName: string;
  email: string;
  password: string;
  role: string;
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
  id: number;
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
  dropdown: boolean;
  solicitation: {
    changeDate: string;
    solicitation: any;
    id: number;
    newStatus: string;
    createdBy: {
      name: string;
    }
    equipment: {
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
    value: number;
    fileUrl: string;

  }
}

export type LabelValue = {
  label: string,
  value: string
}
