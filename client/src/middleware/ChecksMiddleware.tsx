import { MemberType } from "../types/memberType.ts";
import { TeamType } from "../types/teamType.ts";

const isUserInTeam = (
  userId: number | string,
  team: TeamType,
): boolean => {
  const id = Number(userId);

  let ok = false;
  team.membres.forEach((membre: MemberType) => {
    if (membre.idMembre == id) {
      ok = !ok;
      return;
    }
  });

  console.log("user is in team ? : ", ok);
  return ok;
};

export { isUserInTeam };
