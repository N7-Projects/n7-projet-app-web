import { Button, Card } from "primereact";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { TeamType } from "../types/teamType.ts";
import { useParams } from "react-router-dom";

import "./OneTeam.scss";

function OneTeam() {
  const { teamId } = useParams();

  const _queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ teams: "one-team", teamId: teamId }],
    queryFn: async () => {
      const route: string = `/api/teams/${teamId}`;
      const response = await fetch(route);

      console.log("Team Getted ! ");
      console.log(response.status);
      const oneTeam = await response.json() as TeamType;

      console.log(oneTeam);

      return oneTeam;
    },
  });

  if (isPending) {
    return <h3>Pending...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  const racingTeam: TeamType = data;

  const header = (
    <img
      alt="Card"
      src="/usercard.png"
    />
  );
  const _footer = (
    <>
      <Button
        label="Créer"
        severity="primary"
        icon="pi pi-send"
        type="submit"
        form="circuitForm"
        // Use Link if its not what do we want
      />
      <Button
        label="Effacer"
        severity="danger"
        icon="pi pi-eraser"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );

  return (
    <div className="circuit-new-card flex justify-content-center">
      <Card
        title={racingTeam.nom}
        subTitle={`Classement : ${racingTeam.classement}`}
        header={header}
        // footer={footer}
        className="w-8"
      >
        <div className="team-section">
          <h4>Membres</h4>
          <ul className="list-none p-0 m-0">
            {racingTeam.membres.map((member, idx) => (
              <li key={idx} className="mb-2">
                <i className="pi pi-user mr-2"></i>
                <strong>{member.firstname}</strong> — {member.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="team-section mt-4">
          <h4>Sponsors</h4>
          <ul className="list-none p-0 m-0">
            {racingTeam.sponsors.map((sponsor, idx) => (
              <li key={idx} className="mb-2">
                <i className="pi pi-star mr-2"></i>
                <strong>{sponsor.name}</strong> —{" "}
                {sponsor.investedCapital.toLocaleString()} €
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default OneTeam;
