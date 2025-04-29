import { MemberType } from "./memberType.ts";

export type TeamType = {
  idRacingTeam: number;
  nom: string;
  classement: number;
  membres: MemberType[];
  sponsors: [];
};
