export interface Registration {
  id: number;
  registeredUserId: number;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  participantsCount: number;
}
