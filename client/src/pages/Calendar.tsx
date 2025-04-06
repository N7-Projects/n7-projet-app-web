import { useQuery } from "@tanstack/react-query";
import { EventType } from "../types/eventType.ts";
import "./Calendar.scss";

import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function Calendar() {
  const { data, isLoading, isError, error } = useQuery<EventType[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch("/api/calendar");
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }
      const events = await response.json();
      // Validation des données
      if (!Array.isArray(events)) {
        throw new Error("Invalid data format: Expected an array of events");
      }
      return events;
    },
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return (
      <h3>Error: {error instanceof Error ? error.message : "Unknown error"}</h3>
    );
  }

  const events = data?.map((event) => ({
    id: event.id,
    title: event.name || "Événement",
    start: new Date(event.date),
    end: new Date(
      event.duration
        ? new Date(event.date).getTime() + Number(event.duration) * 60000
        : new Date(event.date).getTime(),
    ),
    allDay: Number(event.duration) === 0,
    type: event.type || "Général",
  }));

  const eventStyleGetter = (event: EventType) => {
    if (event.allDay) {
      return {
        style: {
          backgroundColor: "#ffcccb", // Light red for zero-duration events
          color: "black",
          border: "1px solid #ff0000",
        },
      };
    }
    return {
      style: {
        backgroundColor: "#3174ad", // Default blue for other events
        color: "white",
      },
    };
  };

  const handleEventClick = (event: EventType) => {
    alert(
      `Détails de l'événement:\n\nNom: ${event.name}\nType: ${event.type}\nLieu: ${event.location}`,
    );
  };
  const handleNavigate = (date: Date, view: string) => {
    console.log(`Navigated to date: ${date}, view: ${view}`);
  };

  const handleViewChange = (view: string) => {
    console.log(`View changed to: ${view}`);
  };

  return (
    <>
      <section className="calendar">
        <h1>Calendrier des Événements</h1>
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
