import { Card } from "primereact";
import { DataView } from "primereact/dataview";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { MemberType } from "../../types/memberType.ts";
import { classNames } from "primereact";
import { memberVehiculeType } from "../../types/memberVehiculeType.ts";
import { useParams } from "react-router-dom";
import { useAuth } from "../../middleware/AuthProvider.tsx";

function OneMember() {
  const _queryClient = useQueryClient();

  const { memberId } = useParams();

  const userAuth = useAuth();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ member: "one-member", memberToken: userAuth?.token }],
    queryFn: async () => {
      const route: string = `/api/members/${memberId}`;
      const response = await fetch(route);

      console.log(response.status);
      if (response.ok) {
        console.log("Not connected fetch");

        const member = await response.json() as MemberType;
        console.log(member);
        return member;
      } else {
        console.log("ONE MEMBER REMOVE JWT");
        localStorage.removeItem("jwt");
        return Promise.reject(
          new Error("Something went wrong while not connected"),
        );
      }
    },
  });

  if (isPending) {
    return <h3>Pending...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  const itemTemplate = (vehicule: memberVehiculeType, index: number) => {
    return (
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
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (items: memberVehiculeType[]) => {
    if (!items || items.length === 0) return null;

    const list = items.map((vehicule, index) => {
      return itemTemplate(vehicule, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  const itemTeamTemplate = (
    team: { idRacingTeam: number; nom: string },
    index: number,
  ) => {
    return (
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
                onClick={() => {
                  globalThis.location.href = `/teams/${team.idRacingTeam}`;
                }}
              >
                {team.nom}
              </div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <span className="font-semibold">{team.nom}</span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTeamTemplate = (items: { idRacingTeam: number; nom: string }[]) => {
    if (!items || items.length === 0) return null;

    const list = items.map((team, index) => {
      return itemTeamTemplate(team, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <div className="grid m-1">
      <div className="col-12 ">
        <Card
          title={`${data.firstName} ${data.name}`}
          className="flex justify-content-center"
        >
        </Card>
      </div>
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

export default OneMember;
