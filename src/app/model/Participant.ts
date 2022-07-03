export interface Participant {
  id: string;
  name: string;
  phone: string;
  confirmed: boolean;
  link: string;
  guests: [Guest];
}

export interface Guest {
  id: number;
  name: string;
  isKid: boolean;
}
