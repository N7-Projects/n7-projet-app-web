import Navbar from "../components/Navbar.tsx";
import { useQuery } from "@tanstack/react-query";
import "./Calendar.scss";

function Calendar() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch("/api/calendar");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <>
      <Navbar />
      <section className="calendar">
        <h1>Calendrier des Événements</h1>
        <div className="events-grid">
          {data.map((event: any) => (
            <div key={event.id} className="event-card">
              <h2>{event.name || "Événement"}</h2>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Durée: {event.duration || "Non spécifiée"}</p>
              <p>Type: {event.type || "Général"}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Calendar;
