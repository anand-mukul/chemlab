export interface Chemical {
  _id: string;
  name: string;
  formula: string;
  icon: string;
  color: string;
}

export interface Instrument {
  _id: string;
  name: string;
  icon: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  dob?: Date;
  language?: string;
  timezone?: string;
  urls?: { value: string }[];
  oauth: boolean;
  isVerified: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
