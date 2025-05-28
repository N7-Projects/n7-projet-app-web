import { Card } from "primereact";
import { DataView } from "primereact/dataview";
import { useQueryClient } from "@tanstack/react-query";
import { classNames } from "primereact";
import { Button } from "primereact";
import { memberVehiculeType } from "../../types/memberVehiculeType.ts";
import { useAuth } from "../../middleware/AuthProvider.tsx";

function MemberDashbord() {
  const _queryClient = useQueryClient();

  const userAuthed = useAuth();

  //   const { data, isPending, isError, error } = useQuery({
  //     queryKey: [{ member: "one-member", memberToken: userAuthed?.token }],
  //     queryFn: async () => {
  //       if (userAuthed?.token) {
  //         const response = await fetch("/api/connected", {
  //           headers: {
  //             Authorization: `Bearer ${userAuthed.token}`,
  //           },
  //         });
  //         if (response.ok) {
  //           console.log("Connected fetch");
  //           const data: MemberType = await response.json() as MemberType;
  //           return data;
  //         } else {
  //           localStorage.removeItem("jwt");
  //           return Promise.reject(
  //             new Error("Something went wrong while connected"),
  //           );
  //         }
  //       } else {
  //         return Promise.reject(
  //           new Error("You must be connected to see this page !"),
  //         );
  //       }
  //     },
  //   });

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
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded"
              >
              </Button>
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
              <div className="text-2xl font-bold text-900">
                {team.nom}
              </div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <span className="font-semibold">{team.nom}</span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Button
                icon="pi pi-send"
                className="p-button-rounded"
                onClick={() => {
                  globalThis.location.href = `/teams/${team.idRacingTeam}`;
                }}
              >
              </Button>
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

  const user = userAuthed?.user;

  return (
    <div className="grid m-1">
      <div className="col-12 md:col-6">
        <Card title={`${user.firstName} ${user.name}`}></Card>
      </div>
      <div className="col-12 md:col-6 ">
        <Card title={user.email}></Card>
      </div>
      <div className="col-12 lg:col-6">
        <Card title="Vehicules">
          <DataView
            value={user.vehicules}
            listTemplate={listTemplate}
            paginator
            rows={3}
          />
        </Card>
      </div>
      <div className="col-12 lg:col-6">
        <Card title="Teams">
          <DataView
            value={user.teams}
            listTemplate={listTeamTemplate}
            paginator
            rows={3}
          />
        </Card>
      </div>
    </div>
  );
}

export default MemberDashbord;
