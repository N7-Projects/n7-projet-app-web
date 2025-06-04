import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeamType } from "../../types/teamType.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { MemberType } from "../../types/memberType.ts";
import { SponsorType } from "../../types/sponsorType.ts";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { useAuth } from "../../middleware/AuthProvider.tsx";

function NewTeam() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const auth = useAuth();

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

  // Ensure auth.user is always selected
  useEffect(() => {
    setSelectedMembres([auth.user]); // Ensure the user is selected initially
  }, [auth.user]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ membresAndSponsors: "all-membres-sponsors" }],
    queryFn: async () => {
      const routes: string[] = ["/api/members", "/api/sponsors"];
      const responseMembres = await fetch(routes[0]);
      const responseSponsors = await fetch(routes[1]);

      console.log("Getted ! ");
      console.log("Membres status : ", responseMembres.status);
      console.log("Sponsors status : ", responseSponsors.status);
      const allMembres = await responseMembres.json() as MemberType[];
      const allSponsors = await responseSponsors.json() as SponsorType[];

      return { membres: allMembres, sponsors: allSponsors };
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

        // Invalidate and refetch data to update the sponsors list
        queryClient.invalidateQueries({
          queryKey: [{ membresAndSponsors: "all-membres-sponsors" }],
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
          queryKey: [{ membresAndSponsors: "all-membres-sponsors" }],
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
        label="Créer"
        severity="primary"
        icon="pi pi-send"
        type="submit"
        form="teamForm"
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
          Authorization: `Bearer ${auth.token}`,
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

  if (!auth) {
    return <h1>SHOULD NOT HAPPEN</h1>;
  }

  if (auth && auth.user == null) {
    return <h1>SHOULD NOT HAPPEN 2</h1>;
  }

  // Check to disable the row corresponding to auth.user
  const isSelectable = (member: MemberType) =>
    member.idMembre != auth.user?.idMembre;

  const isRowSelectable = (
    event,
  ) => (event.data ? isSelectable(event.data) : true);

  // Ensure the user is always in the selection
  const onSelectionChange = (e: { value: MemberType[] }) => {
    const selection = [...e.value];
    const isUserSelected = selection.some((m) =>
      m.idMembre === auth.user.idMembre
    );

    if (!isUserSelected) {
      selection.push(auth.user as MemberType); // Re-add user if removed
    }

    setSelectedMembres(selection);
  };

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
          <InputText
            id="name"
            name="name"
            placeholder="BrownFox Racing"
            required
          />

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
            required
          />

          <label htmlFor="membres" className="font-bold block mb-2 mt-3">
            Ajouter des membres
          </label>
          <div className="card" id="membres">
            <DataTable
              value={data.membres}
              selectionMode="multiple"
              rows={10}
              selection={selectedMembres}
              onSelectionChange={onSelectionChange}
              dataKey="idMembre"
              tableStyle={{ minWidth: "50rem" }}
              isDataSelectable={isRowSelectable}
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              >
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
          <div className="card" id="sponsors">
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
              showIcon
            />
            <Calendar
              id="sponsorFundationDate"
              value={newSponsorSponsorshipEnd}
              onChange={(e) => setNewSponsorSponsorshipEnd(e.value as Date)}
              dateFormat="dd/mm/yy"
              placeholder="Sélectionnez une date de fin"
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
              showIcon
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default NewTeam;
