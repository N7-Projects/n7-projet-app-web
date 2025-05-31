import { Button, Card } from "primereact";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { TeamType } from "../../types/teamType.ts";
import { useNavigate, useParams } from "react-router-dom";

import "./OneTeam.scss";
import { useAuth } from "../../middleware/AuthProvider.tsx";
import { isUserInTeam } from "../../middleware/ChecksMiddleware.tsx";
import { confirmDialog } from "primereact";
import { ConfirmDialog } from "primereact";
import { Toast } from "primereact";
import { useRef } from "react";

function OneTeam() {
  const { teamId } = useParams();

  const auth = useAuth();

  const navigate = useNavigate();

  const toast = useRef(null);

  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ teams: "one-team", teamId: teamId }],
    queryFn: async () => {
      const route: string = `/api/teams/${teamId}`;
      const response = await fetch(route);

      if (response.ok) {
        console.log("Team Getted ! ");
        console.log(response.status);
        const oneTeam = await response.json() as TeamType;

        console.log(oneTeam);

        return oneTeam;
      } else {
        console.error("L'équipe n'existe pas");
        queryClient.invalidateQueries({
          queryKey: [{ teams: "one-team", teamId: teamId }],
        });
        navigate("/teams");
      }
    },
  });

  if (isPending) {
    return <h3>Pending...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  const racingTeam: TeamType = data;

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "Circuit supprimé",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "Circuit non supprimé",
      life: 3000,
    });
  };

  const handleSuppress = async () => {
    try {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: "DELETE",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      if (response.ok) {
        accept();
        queryClient.invalidateQueries({
          queryKey: [{ teams: "one-team", teamId: teamId }],
        });
        globalThis.location.href = "/teams";
      } else {
        alert("Failed to delete team.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the team ");
    }
  };

  const suppress = () => {
    confirmDialog({
      message:
        "Vous êtes sûr de vouloir supprimer cette équipe et ses informations ?",
      header: "Confirmation de Suppression",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",

      accept: () => handleSuppress(),
      reject,
    });
  };

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
        onClick={suppress}
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
      <Toast ref={toast} />
      <ConfirmDialog />
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
