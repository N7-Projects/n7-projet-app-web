import { MemberType } from "../types/memberType.ts";

const isUserInTeam = (
  user: MemberType,
  teamId: number | string,
): boolean => {
  const id = Number(teamId);

  let ok = false;
  user.teams.forEach((team) => {
    if (team.idRacingTeam == id) {
      ok = !ok;
      return;
    }
  });

  console.log("user is in team ? : ", ok);
  return ok;
};

export { isUserInTeam };
