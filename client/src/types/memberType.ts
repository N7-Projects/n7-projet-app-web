import { memberVehiculeType } from "./memberVehiculeType.ts";

export type MemberType = {
  idMembre: number;
  name: string;
  firstname: string;
  vehicules: memberVehiculeType[];
  subscriber: boolean;
};
