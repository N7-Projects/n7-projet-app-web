import { Button, Card } from "primereact";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { TeamType } from "../../types/teamType.ts";
import { useParams } from "react-router-dom";

import "./OneTeam.scss";
import { useAuth } from "../../middleware/AuthProvider.tsx";
import { isUserInTeam } from "../../middleware/ChecksMiddleware.tsx";

function OneTeam() {
  const { teamId } = useParams();

  const auth = useAuth();

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
  const footerEnabled = (
    <>
      <Button
        label="Modifier"
        severity="primary"
        icon="pi pi-pencil"
        type="submit"
        form="circuitForm"
        onClick={() => {
          globalThis.location.href = `/teams/${teamId}/edit`;
        }}
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

  const footerDisabled = (
    <>
      <Button
        label="Modifier"
        severity="primary"
        icon="pi pi-pencil"
        disabled
        // Use Link if its not what do we want
      />
      <Button
        label="Effacer"
        severity="danger"
        icon="pi pi-eraser"
        style={{ marginLeft: "0.5em" }}
        disabled
      />
    </>
  );

  const footer = auth && auth.user && teamId && isUserInTeam(auth.user, teamId)
    ? footerEnabled
    : footerDisabled;

  return (
    <div className="one-team-card flex justify-content-center">
      <Card
        title={racingTeam.nom}
        subTitle={`Classement : ${racingTeam.classement}`}
        header={header}
        footer={footer}
        className="w-8"
      >
        <div className="team-section">
          <h4>Membres</h4>
          <ul className="list-none p-0 m-0">
            {racingTeam.membres.map((member, idx) => (
              <li
                key={idx}
                className="mb-2"
                onClick={() => {
                  globalThis.location.href = `/members/${member.idMembre}`;
                }}
              >
                <i className="pi pi-user mr-2"></i>
                <strong>{member.firstName}</strong> — {member.name}
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
