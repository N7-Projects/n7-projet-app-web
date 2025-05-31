import { useQuery } from "@tanstack/react-query";
import { EventType } from "../types/eventType.ts";
import "./Calendar.scss";

import { Temporal } from "@js-temporal/polyfill"; // L'objet Duration n'existe pas encore en plain JS

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

  const events = data?.map((event) => {
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
