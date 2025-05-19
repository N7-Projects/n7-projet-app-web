import { memberVehiculeType } from "./memberVehiculeType.ts";

export type MemberType = {
  idMembre: number;
  name: string;
  firstName: string;
  vehicules: memberVehiculeType[];
  email: string;
  subscriber: boolean;
};
