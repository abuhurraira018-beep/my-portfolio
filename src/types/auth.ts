export type AccountType = "corporate" | "individual";

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  accountType: AccountType;
  role: "client" | "admin";
  memberSince: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  accountType?: AccountType;
}

export interface RegisterData {
  name: string;
  email: string;
  password?: string;
  company?: string;
  accountType: AccountType;
}
