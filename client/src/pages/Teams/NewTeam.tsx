import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeamType } from "../../types/teamType.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { MemberType } from "../../types/memberType.ts";
import { SponsorType } from "../../types/sponsorType.ts";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact";

function NewTeam() {
  const navigate = useNavigate();
  const _queryClient = useQueryClient();

  const [rowClick, setRowClick] = useState(true);
  const [rowClickSponsors, setRowClickSponsors] = useState(true);

  const [selectedMembres, setSelectedMembres] = useState<MemberType[]>([]);
  const [selectedSponsors, setSelectedSponsors] = useState<SponsorType[]>([]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ membres: "all-membres" }],
    queryFn: async () => {
      const routes: string[] = ["/api/members", "/api/sponsors"];
      const responseMembres = await fetch(routes[0]);
      const responseSponsors = await fetch(routes[1]);

      console.log("Getted ! ");
      console.log("Membres status : ", responseMembres.status);
      console.log("Sponsors status : ", responseSponsors.status);
      const allMembres = await responseMembres.json() as MemberType[];
      const allSponsors = await responseSponsors.json() as SponsorType[];

      console.log(allMembres[0].name);
      console.log(allSponsors[0].name);

      return { membres: allMembres, sponsors: allSponsors };
    },
  });

  const header = (
    <img
      alt="Card"
      src="/usercard.png"
    />
  );
  const footer = (
    <>
      <Button
        label="Créer"
        severity="primary"
        icon="pi pi-send"
        type="submit"
        form="teamForm"
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const teamData = {
      nom: formData.get("name"),
      classement: formData.get("classement"),
      membres: selectedMembres,
      sponsors: selectedSponsors,
    };

    console.log(teamData);

    try {
      const response = await fetch("/api/teams/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        const createdteam: TeamType = await response.json();
        navigate(`/teams/${createdteam.idRacingTeam}`);
      } else {
        alert("Failed to create team.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the team.");
    }
  };

  if (isPending) {
    return <h3>Pending...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <div className="team-new-card flex justify-content-center">
      <Card
        title="Créer l'équipe"
        subTitle="Rentrer les informations pour créer l'équipe"
        footer={footer}
        header={header}
        className="w-8"
      >
        <form
          id="teamForm"
          className="flex flex-column"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="font-bold block mb-2">
            Nom de l'équipe
          </label>
          <InputText id="name" name="name" placeholder="BrownFox Racing" />

          <label htmlFor="classement" className="font-bold block mb-2 mt-3">
            Classement de l'équipe
          </label>
          <InputNumber
            id="classement"
            name="classement"
            placeholder="1"
            mode="decimal"
            roundingMode="trunc"
            showButtons
            min={0}
          />

          <label htmlFor="membres" className="font-bold block mb-2 mt-3">
            Ajouter des membres
          </label>
          <div className="card">
            <div className="flex justify-content-center align-items-center mb-4 gap-2">
              <InputSwitch
                inputId="input-rowclick"
                checked={rowClick}
                onChange={(
                  e: { value: boolean | ((prevState: boolean) => boolean) },
                ) => setRowClick(e.value)}
              />
              <label htmlFor="input-rowclick">
                Selection en cliquant sur la ligne
              </label>
            </div>
            <DataTable
              value={data.membres}
              selectionMode={rowClick ? null : "checkbox"}
              rows={10}
              selection={selectedMembres}
              onSelectionChange={(e: { value: MemberType[] }) => {
                setSelectedMembres(e.value as MemberType[]);
              }}
              dataKey="idMembre"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}>
              </Column>
              <Column field="firstname" header="Prénom"></Column>
              <Column field="name" header="Nom"></Column>
            </DataTable>
          </div>

          <label htmlFor="sponsors" className="font-bold block mb-2 mt-3">
            Ajouter des sponsors
          </label>
          <div className="card">
            <div className="flex justify-content-center align-items-center mb-4 gap-2">
              <InputSwitch
                inputId="input-rowclick-sponsors"
                checked={rowClickSponsors}
                onChange={(
                  e: { value: boolean | ((prevState: boolean) => boolean) },
                ) => setRowClickSponsors(e.value)}
              />
              <label htmlFor="input-rowclick-sponsors">
                Selectionner en cliquant sur la ligne
              </label>
            </div>
            <DataTable
              value={data.sponsors}
              selectionMode={rowClickSponsors ? null : "checkbox"}
              rows={10}
              selection={selectedSponsors}
              onSelectionChange={(e: { value: SponsorType[] }) => {
                setSelectedSponsors(e.value as SponsorType[]);
              }}
              dataKey="id"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}>
              </Column>
              <Column field="name" header="Nom"></Column>
            </DataTable>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default NewTeam;
