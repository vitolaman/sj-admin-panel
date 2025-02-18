export interface LoginReqI {
  username: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  role: string;
}

export interface LoginResI {
  access_token: string;
  user: User;
}

export interface CreateBranchReqI {
  email: string;
  name: string;
  operatingAreaId: string;
}

export interface BranchI {
  id: string;
  email: string;
  operatingAreaId: string;
  name: string;
  isOnline: boolean;
}

export interface OperatingAreaI {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
