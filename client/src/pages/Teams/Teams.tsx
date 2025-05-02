import { TeamCard } from "../../components/TeamCard.tsx";
import { TeamType } from "../../types/teamType.ts";

import "./Teams.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Should be the page for displaying basic info of the association
function Equipes() {
  const _queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ teams: "all-teams" }],
    queryFn: async () => {
      const route: string = "/api/teams";
      const response = await fetch(route);

      console.log("Getted ! ");
      console.log(response.status);
      const allTeams = await response.json() as TeamType[];

      console.log(allTeams[0]);

      return allTeams;
    },
  });

  if (isPending) {
    return <h3>Pending...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <>
      {
        /* <section className="flex flex-row flex wrap align-items-center justify-content-center lg:gap-3">
       */
      }
      <section className="grid">
        {data.map((team: TeamType) => {
          // ...cicuit --> destructure all of the props of CircuitType inside the Component CorcuitCard
          return <TeamCard key={team.nom} {...team}></TeamCard>;
        })}

        {/* Transformer avec une boucle pour afficher avec chaque circuit (dinosaur en phase de test) */}
      </section>
    </>
  );
}

export default Equipes;
