import { Card } from "primereact";
import { DataView } from "primereact/dataview";
import { useQuery } from "@tanstack/react-query";
import { MemberType } from "../../types/memberType.ts";
import { classNames } from "primereact/utils";
import { memberVehiculeType } from "../../types/memberVehiculeType.ts";
import { useParams } from "react-router-dom";
import { Button } from "primereact";

function MemberDashboard() {
  const { memberId } = useParams();

  const connectedMemberQuery = useQuery({
    queryKey: ["connected-member"],
    queryFn: async () => {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("No token");

      const response = await fetch("/api/connected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Not authenticated");
      return (await response.json()) as MemberType;
    },
    retry: false,
  });

  const memberQuery = useQuery({
    queryKey: ["member-data", memberId],
    queryFn: async () => {
      const connected = connectedMemberQuery.data;
      if (
        connected &&
        connected.idMembre.toString() === memberId
      ) {
        return connected;
      }

      const response = await fetch(`/api/members/${memberId}`);
      if (!response.ok) {
        throw new Error("Unable to fetch member");
      }

      return (await response.json()) as MemberType;
    },
    enabled: !!memberId && !connectedMemberQuery.isPending,
  });
  if (memberQuery.isPending || connectedMemberQuery.isPending) {
    return <h3>Chargement...</h3>;
  }

  if (memberQuery.isError) {
    return <h3>Erreur : {memberQuery.error.message}</h3>;
  }

  const data = memberQuery.data;

  const itemTemplate = (vehicule: memberVehiculeType, index: number) => (
    <div className="col-12" key={vehicule.id}>
      <div
        className={classNames(
          "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
          { "border-top-1 surface-border": index !== 0 },
        )}
      >
        <img
          className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
          src="/usercard.png"
        />
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-3">
            <div className="text-2xl font-bold text-900">
              {vehicule.model}
            </div>
            <div className="flex align-items-center gap-3">
              <span className="flex align-items-center gap-2">
                <span className="font-semibold">{vehicule.licensePlate}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const listTemplate = (items: memberVehiculeType[]) =>
    items?.length
      ? (
        <div className="grid grid-nogutter">
          {items.map(itemTemplate)}
        </div>
      )
      : null;

  const listTeamTemplate = (
    items: { idRacingTeam: number; nom: string }[],
  ) =>
    items?.length
      ? (
        <div className="grid grid-nogutter">
          {items.map((team, index) => (
            <div className="col-12" key={team.idRacingTeam}>
              <div
                className={classNames(
                  "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
                  { "border-top-1 surface-border": index !== 0 },
                )}
              >
                <img
                  className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                  src="/usercard.png"
                />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                  <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                    <div
                      className="text-2xl font-bold text-900"
                      onClick={() => (globalThis.location.href =
                        `/teams/${team.idRacingTeam}`)}
                    >
                      {team.nom}
                    </div>
                  </div>
                  <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                    <Button
                      icon="pi pi-send"
                      className="p-button-rounded"
                      tooltip="Voir l'équipe"
                      tooltipOptions={{ position: "bottom" }}
                      outlined
                      severity="info"
                      onClick={() => {
                        globalThis.location.href =
                          `/teams/${team.idRacingTeam}`;
                      }}
                    >
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
      : null;

  return (
    <div className="grid m-1">
      <div
        className={`col-12 ${
          connectedMemberQuery.data?.idMembre === data.idMembre
            ? "md:col-6"
            : ""
        }`}
      >
        <Card title={`${data.firstName} ${data.name}`}></Card>
      </div>

      {connectedMemberQuery.data?.idMembre === data.idMembre && (
        <div className="col-12 md:col-6">
          <Card title={data.email}></Card>
        </div>
      )}{" "}
      <div className="col-12 lg:col-6">
        <Card title="Vehicules">
          <DataView
            value={data.vehicules}
            listTemplate={listTemplate}
            paginator
            rows={3}
          />
        </Card>
      </div>
      <div className="col-12 lg:col-6">
        <Card title="Teams">
          <DataView
            value={data.teams}
            listTemplate={listTeamTemplate}
            paginator
            rows={3}
          />
        </Card>
      </div>
    </div>
  );
}

export default MemberDashboard;
