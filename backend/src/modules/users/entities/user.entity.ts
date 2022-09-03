export type UserPreference = {
  canReceivedMessage: boolean;
  language: string;
};
export class User {
  id: string;
  email: string;
  username: string;
  name: string;
  birthdate?: string | Date;
  biograph?: string;
  picture?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  preferences?: UserPreference;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.name = user.name;
    this.birthdate = user.birthdate;
    this.biograph = user.biograph;
    this.picture = user.picture;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.preferences = user.preferences;
  }
}
