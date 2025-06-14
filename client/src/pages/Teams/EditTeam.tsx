import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FormEvent, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { SponsorType } from "../../types/sponsorType.ts";
import { MemberType } from "../../types/memberType.ts";
import { TeamType } from "../../types/teamType.ts";
import { InputNumber } from "primereact";
import { Column } from "primereact";
import { DataTable } from "primereact";
import { Dialog } from "primereact";
import { useAuth } from "../../middleware/AuthProvider.tsx";
import { isUserInTeam } from "../../middleware/ChecksMiddleware.tsx";

function EditTeam() {
  const { teamId } = useParams();

  const userAuthed = useAuth();
  const user = userAuthed?.user;

  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [showAddSponsorDialog, setShowAddSponsorDialog] = useState(false);
  const [newMemberFirstname, setNewMemberFirstname] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [newSponsorName, setNewSponsorName] = useState("");

  const [newSponsorInvestedCapital, setNewSponsorInvestedCapital] = useState<
    number | null
  >(null);
  const [newSponsorFundationDate, setNewSponsorFundationDate] = useState<
    Date | null
  >(null);
  const [newSponsorSponsorshipStart, setNewSponsorSponsorshipStart] = useState<
    Date | null
  >(null);
  const [newSponsorSponsorshipEnd, setNewSponsorSponsorshipEnd] = useState<
    Date | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedMembres, setSelectedMembres] = useState<MemberType[]>([]);
  const [selectedSponsors, setSelectedSponsors] = useState<SponsorType[]>([]);
  const [editClassement, setEditClassement] = useState<number>(0);
  const [editName, setEditName] = useState<string>("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ membres: "all-membres" }],
    queryFn: async () => {
      const routes: string[] = [
        "/api/members",
        "/api/sponsors",
        `/api/teams/${teamId}`,
      ];
      const responseMembres = await fetch(routes[0]);
      const responseSponsors = await fetch(routes[1]);
      const responseTeam = await fetch(routes[2]);

      console.log("Getted ! ");
      console.log("Membres status : ", responseMembres.status);
      console.log("Sponsors status : ", responseSponsors.status);
      console.log("Team status : ", responseTeam.status);

      const allMembres = await responseMembres.json() as MemberType[];
      const allSponsors = await responseSponsors.json() as SponsorType[];
      const team = await responseTeam.json() as TeamType;

      console.log(allMembres[0].name);
      console.log(allSponsors[0].name);
      console.log(team);

      setEditClassement(team.classement);
      setSelectedMembres(team.membres);
      setEditName(team.nom);
      setSelectedSponsors(team.sponsors);

      return { membres: allMembres, sponsors: allSponsors, team: team };
    },
  });

  const handleAddMember = async () => {
    if (!newMemberFirstname || !newMemberName) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/members/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: newMemberFirstname,
          name: newMemberName,
        }),
      });

      if (response.ok) {
        // Reset form fields
        setNewMemberFirstname("");
        setNewMemberName("");
        setShowAddMemberDialog(false);

        // Invalidate and refetch data to update the members list
        queryClient.invalidateQueries({
          queryKey: [{ membres: "all-membres" }],
        });
      } else {
        alert("Échec de l'ajout du membre");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue lors de l'ajout du membre");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSponsor = async () => {
    if (
      !newSponsorName || newSponsorInvestedCapital === null ||
      newSponsorFundationDate === null || newSponsorSponsorshipEnd === null ||
      newSponsorSponsorshipStart === null
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);

    const newSponsorDuration = newSponsorSponsorshipEnd?.getTime() -
      newSponsorSponsorshipStart?.getTime();
    try {
      const response = await fetch("/api/sponsors/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSponsorName,
          duration: newSponsorDuration,
          investedCapital: newSponsorInvestedCapital,
          fundationDate: newSponsorFundationDate.toISOString(),
        }),
      });

      if (response.ok) {
        // Reset form fields
        setNewSponsorName("");
        setNewSponsorSponsorshipStart(null);
        setNewSponsorSponsorshipEnd(null);
        setNewSponsorInvestedCapital(null);
        setNewSponsorFundationDate(null);
        setShowAddSponsorDialog(false);

        // Invalidate and refetch data to update the sponsors list
        queryClient.invalidateQueries({
          queryKey: [{ membres: "all-membres" }],
        });
      } else {
        alert("Échec de l'ajout du sponsor");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue lors de l'ajout du sponsor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const header = <img alt="Card" src="/usercard.png" />;

  const footer = (
    <>
      <Button
        label="Modifier"
        severity="primary"
        icon="pi pi-send"
        type="submit"
        form="teamForm"
      />
      <Button
        label="Annuler"
        severity="warning"
        icon="pi pi-ban"
        style={{ marginLeft: "0.5em" }}
        onClick={() => {
          globalThis.location.href = `/teams/${teamId}`;
        }}
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

    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("No token");
    try {
      const response = await fetch(`/api/teams/${teamId}/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        const createdteam: TeamType = await response.json();
        navigate(`/teams/${createdteam.idRacingTeam}`);
      } else {
        alert("Failed to edit team.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while editing the team.");
    }
  };

  const addMemberDialogFooter = (
    <>
      <Button
        label="Annuler"
        icon="pi pi-times"
        severity="danger"
        onClick={() => setShowAddMemberDialog(false)}
        className="p-button-text"
      />
      <Button
        label="Ajouter"
        icon="pi pi-check"
        onClick={handleAddMember}
        loading={isSubmitting}
      />
    </>
  );

  const addSponsorDialogFooter = (
    <>
      <Button
        label="Annuler"
        icon="pi pi-times"
        severity="danger"
        onClick={() => setShowAddSponsorDialog(false)}
        className="p-button-text"
      />
      <Button
        label="Ajouter"
        icon="pi pi-check"
        onClick={handleAddSponsor}
        loading={isSubmitting}
      />
    </>
  );

  if (isPending) {
    return (
      <h3>
        <i className="pi pi-spin pi-spinner">
        </i>
        Pending...
      </h3>
    );
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (user == null) {
    alert("You must be logged in !");
    return <Navigate to="/login" />;
  }

  if (user && !isUserInTeam(user.idMembre, data.team)) {
    alert("You must be part of the team to edit it !");
    return <Navigate to="/teams" />;
  }

  console.log("IN EDIt");
  console.log(userAuthed);

  return (
    <div className="team-edit-card flex justify-content-center">
      <Card
        title="Modifier l'équipe"
        subTitle="Rentrer les informations pour modifier l'équipe"
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
          <InputText
            id="name"
            name="name"
            value={editName}
            onChange={(e) => setEditName(e.target.value ?? null)}
            required
          />

          <label htmlFor="classement" className="font-bold block mb-2 mt-3">
            Classement de l'équipe
          </label>
          <InputNumber
            id="classement"
            name="classement"
            mode="decimal"
            roundingMode="trunc"
            showButtons
            min={0}
            value={editClassement}
            onValueChange={(e) => setEditClassement(e.value)}
            required
          />

          <label htmlFor="membres" className="font-bold block mb-2 mt-3">
            Ajouter des membres
          </label>
          <div className="card">
            <DataTable
              value={data.membres}
              selectionMode="multiple"
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
              <Column field="firstName" header="Prénom"></Column>
              <Column field="name" header="Nom"></Column>
            </DataTable>

            <div className="flex justify-content-between align-items-center mb-4">
              <Button
                icon="pi pi-plus"
                severity="info"
                rounded
                outlined
                aria-label="Ajouter un membre"
                onClick={(e: { preventDefault: () => void }) => {
                  e.preventDefault(); // Prevent form submission
                  setShowAddMemberDialog(true);
                }}
                tooltip="Ajouter un nouveau membre"
                tooltipOptions={{ position: "top" }}
                type="button" // Explicitly specify it's not a submit button
              />
            </div>
          </div>

          <label htmlFor="sponsors" className="font-bold block mb-2 mt-3">
            Ajouter des sponsors
          </label>
          <div className="card">
            <DataTable
              value={data.sponsors}
              selectionMode="multiple"
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
            <Button
              icon="pi pi-plus"
              severity="info"
              rounded
              outlined
              aria-label="Ajouter un sponsor"
              onClick={(e: { preventDefault: () => void }) => {
                e.preventDefault(); // Prevent form submission
                setShowAddSponsorDialog(true);
              }}
              tooltip="Ajouter un nouveau sponsor"
              tooltipOptions={{ position: "top" }}
              type="button" // Explicitly specify it's not a submit button
            />
          </div>
        </form>
      </Card>

      <Dialog
        header="Ajouter un nouveau membre"
        visible={showAddMemberDialog}
        style={{ width: "30rem" }}
        footer={addMemberDialogFooter}
        onHide={() => setShowAddMemberDialog(false)}
      >
        <div className="flex flex-column gap-3 mt-3">
          <div className="flex flex-column gap-2">
            <label htmlFor="firstName" className="font-bold">Prénom</label>
            <InputText
              id="firstName"
              value={newMemberFirstname}
              onChange={(e) => setNewMemberFirstname(e.target.value)}
              placeholder="Entrez le prénom"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="lastname" className="font-bold">Nom</label>
            <InputText
              id="lastname"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Entrez le nom"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Ajouter un nouveau sponsor"
        visible={showAddSponsorDialog}
        style={{ width: "30rem" }}
        contentStyle={{ overflow: "visible" }}
        footer={addSponsorDialogFooter}
        onHide={() => setShowAddSponsorDialog(false)}
      >
        <div className="flex flex-column gap-3 mt-3">
          <div className="flex flex-column gap-2">
            <label htmlFor="sponsorName" className="font-bold">
              Nom du sponsor
            </label>
            <InputText
              id="sponsorName"
              value={newSponsorName}
              onChange={(e) => setNewSponsorName(e.target.value)}
              placeholder="Entrez le nom du sponsor"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="sponsorDuration" className="font-bold">Durée</label>
            <Calendar
              id="sponsorFundationDate"
              value={newSponsorSponsorshipStart}
              onChange={(e) => setNewSponsorSponsorshipStart(e.value as Date)}
              dateFormat="dd/mm/yy"
              placeholder="Sélectionnez une date de début"
              appendTo="self"
              showIcon
            />
            <Calendar
              id="sponsorFundationDateEnd"
              value={newSponsorSponsorshipEnd}
              onChange={(e) => setNewSponsorSponsorshipEnd(e.value as Date)}
              dateFormat="dd/mm/yy"
              placeholder="Sélectionnez une date de fin"
              appendTo="self"
              showIcon
            />
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="sponsorInvestedCapital" className="font-bold">
              Capital investi
            </label>
            <InputNumber
              id="sponsorInvestedCapital"
              value={newSponsorInvestedCapital}
              onValueChange={(e) =>
                setNewSponsorInvestedCapital(e.value ?? null)}
              placeholder="Montant investi"
              mode="currency"
              currency="EUR"
              locale="fr-FR"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="sponsorFundationDate" className="font-bold">
              Date de création
            </label>
            <Calendar
              id="sponsorFundationDate"
              value={newSponsorFundationDate}
              onChange={(e) => setNewSponsorFundationDate(e.value as Date)}
              dateFormat="dd/mm/yy"
              placeholder="Sélectionnez une date"
              appendTo="self"
              showIcon
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default EditTeam;
