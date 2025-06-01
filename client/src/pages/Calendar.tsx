import { useQuery } from "@tanstack/react-query";
import { EventType } from "../types/eventType.ts";
import "./Calendar.scss";

import { Temporal } from "@js-temporal/polyfill"; // L'objet Duration n'existe pas encore en plain JS

import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Button } from "primereact";
import { Dialog } from "primereact";
import { InputText } from "primereact";
import { Column } from "primereact";
import { DataTable } from "primereact";
import { Calendar as PrimeCalendar } from "primereact/calendar";

import { MemberType } from "../types/memberType.ts";

const localizer = momentLocalizer(moment);

function Calendar() {
  const [visible, setVisible] = useState(false);

  const [titre, setTitre] = useState("");
  const [selectedMembres, setSelectedMembres] = useState<MemberType[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date | null>();

  const { data, isLoading, isError, error } = useQuery<EventType[]>({
    queryKey: [{ members: "all-members", events: "all-events" }],
    queryFn: async () => {
      const routes = ["/api/calendar", "/api/members"];
      const responseEvents = await fetch(routes[0]);
      const responseMembers = await fetch(routes[1]);

      if (!responseEvents.ok) {
        throw new Error(`Failed to fetch events: ${responseEvents.statusText}`);
      }
      if (!responseMembers.ok) {
        throw new Error(
          `Failed to fetch members: ${responseMembers.statusText}`,
        );
      }

      const events = await responseEvents.json() as EventType[];
      const members = await responseMembers.json() as MemberType[];
      // Validation des données
      if (!Array.isArray(events)) {
        throw new Error("Invalid data format: Expected an array of events");
      }

      //   console.log(events);
      //   console.log(members);
      return { events: events, membres: members };
    },
  });

  const getEndDate = (start: Date, duration: string): Date => {
    if (!duration) return start;
    try {
      const dur = Temporal.Duration.from(duration);
      const ms = dur.total({ unit: "millisecond" });
      return new Date(start.getTime() + ms);
    } catch (_) {
      return start;
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return (
      <h3>Error: {error instanceof Error ? error.message : "Unknown error"}</h3>
    );
  }

  const dictMemsEvts = data as { events: EventType[]; membres: MemberType[] };
  const eventsOut = dictMemsEvts.events;

  const events = eventsOut.map((event) => {
    const start = new Date(event.date);
    const end = getEndDate(start, event.duration);

    return {
      id: event.id,
      title: `${event.type} - ${event.name}`,
      name: event.name,
      start,
      end,
      allDay: event.duration === "PT0S" || !event.duration,
      type: event.type,
    };
  });

  const eventStyleGetter = (event: EventType) => {
    const colors: Record<string, string> = {
      Race: "#f39c12",
      Vehicule: "#16a085",
      Circuit: "#2980b9",
      Meeting: "#8e44ad",
      Sponsoring: "#d35400",
      Sponsor: "#7f8c8d",
    };

    return {
      style: {
        backgroundColor: colors[event.type] || "#34495e",
        color: "white",
      },
    };
  };

  const handleEventClick = (event: EventType) => {
    alert(
      `Détails de l'événement:\n\nNom: ${event.name}\nType: ${event.type}`,
    );
  };

  const handleNavigate = (date: Date, view: string) => {
    console.log(`Navigated to date: ${date}, view: ${view}`);
  };

  const handleViewChange = (view: string) => {
    console.log(`View changed to: ${view}`);
  };

  const onSelectionChange = (e: { value: MemberType[] }) => {
    const selection = [...e.value];
    // const isUserSelected = selection.some((m) =>
    //   m.idMembre === auth.user.idMembre
    // );

    // if (!isUserSelected) {
    //   selection.push(auth.user as MemberType); // Re-add user if removed
    // }

    setSelectedMembres(selection);
  };

  const handleSubmit = async () => {
    if (!titre || !startDate) {
      alert("Remplissez titre et date de début");
      return;
    }

    const meetingData = {
      title: titre,
      guests: selectedMembres,
      meetingDate: startDate.toISOString(),
      duration: startDate.toISOString() === endDate?.toISOString()
        ? "PT0S"
        : `PT${(endDate - startDate) / (1000 * 3600)}H`,
    };

    console.log(meetingData);

    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("No token in creation meeting");

    try {
      const response = await fetch("/api/calendar/meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(meetingData),
      });

      if (response.ok) {
        alert("Meeting successfully created !");
        globalThis.location.reload();
      } else {
        alert("Failed to create meeting.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the meeting.");
    }
  };

  const createMeetingFooter = (
    <>
      <Button
        label="Annuler"
        icon="pi pi-times"
        severity="danger"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Ajouter"
        type="submit"
        icon="pi pi-check"
        onClick={handleSubmit}
      />
    </>
  );

  return (
    <>
      <section className="calendar">
        <div className="card flex justify-content-center">
          <Button
            label="Créer un Meeting"
            severity="help"
            outlined
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
          />
          <Dialog
            header="Créer un nouvel événement"
            visible={visible}
            footer={createMeetingFooter}
            style={{ width: "70vw" }}
            contentStyle={{ overflow: "visible" }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <div className="flex flex-column gap-3 mt-3">
              <div className="flex flex-column gap-2">
                <label htmlFor="titre" className="font-bold">Titre</label>
                <InputText
                  id="titre"
                  placeholder="Entrez le titre du meeting"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitre(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="flex flex-column gap-2">
                <label
                  htmlFor="creationDate"
                  className="font-bold block mb-2 mt-3"
                >
                  Date de début
                </label>
                <PrimeCalendar
                  id="creationDate"
                  name="creationDate"
                  dateFormat="yy-mm-dd"
                  appendTo="self"
                  value={startDate}
                  onChange={(e) => setStartDate(e.value)}
                  required
                />

                <label
                  htmlFor="duration"
                  className="font-bold block mb-2 mt-3"
                >
                  Date de fin
                </label>
                <PrimeCalendar
                  id="duration"
                  name="duration"
                  dateFormat="yy-mm-dd"
                  appendTo="self"
                  value={endDate}
                  minDate={startDate}
                  onChange={(e) => setEndDate(e.value)}
                />

                <label
                  htmlFor="membres"
                  className="font-bold block mb-2 mt-3"
                >
                  Ajouter des membres à l'événement
                </label>

                <div className="card" id="membres">
                  <DataTable
                    value={dictMemsEvts.membres}
                    selectionMode="multiple"
                    rows={10}
                    selection={selectedMembres}
                    onSelectionChange={onSelectionChange}
                    dataKey="idMembre"
                    tableStyle={{ minWidth: "50rem" }}
                  >
                    <Column
                      selectionMode="multiple"
                      headerStyle={{ width: "3rem" }}
                    >
                    </Column>
                    <Column field="firstName" header="Prénom"></Column>
                    <Column field="name" header="Nom"></Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </Dialog>
        </div>

        <BigCalendar
          localizer={localizer}
          events={events || []}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
          onNavigate={handleNavigate} // Gestionnaire pour la navigation
          onView={handleViewChange} // Gestionnaire pour le changement de vue
          messages={{
            today: "Aujourd'hui",
            previous: "Précédent",
            next: "Suivant",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            agenda: "Agenda",
          }}
        />
      </section>
    </>
  );
}

export default Calendar;
