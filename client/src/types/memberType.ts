import { memberVehiculeType } from "./memberVehiculeType.ts";

export type MemberType = {
  idMembre: number;
  name: string;
  firstName: string;
  vehicules: memberVehiculeType[];
  teams: {
    idRacingTeam: number;
    nom: string;
  }[];
  email: string;
  subscriber: boolean;
};
