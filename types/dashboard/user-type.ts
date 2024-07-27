export enum UserRole {
  CUSTOMER = "4",
  MANAGER = "2",
  ADMIN = "1",
  STAFF = "3",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export type IUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  dob: number;
  gender: Gender;
};

export type IAdress = {
  address: string;
  phone: number;
  defaulted?: boolean;
  info_name?: string;
};
