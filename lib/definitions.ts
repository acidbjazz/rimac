export interface Login {
  idType: "dni" | "ce";
  idNumber: string;
  cell: string;
  privacy: boolean;
  commercial: boolean;
}

export interface User {
  name: string;
  lastName: string;
  birthDay: string;
}

export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}
