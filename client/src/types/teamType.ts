import { MemberType } from "./memberType.ts";
import { SponsorType } from "./sponsorType.ts";

export type TeamType = {
  idRacingTeam: number;
  nom: string;
  classement: number;
  membres: MemberType[];
  sponsors: SponsorType[];
};
