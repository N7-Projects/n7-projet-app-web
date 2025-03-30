import Navbar from "../components/Navbar.tsx";
import { CircuitCard } from "../components/CircuitCard.tsx";

import "./Circuits.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Only useful for Guillaume now in dev
type Dino = { name: string; description: string };

// Should be the page for displaying basic info of the association
function Circuits() {
  const _queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ circuits: "all-circuits" }],
    queryFn: async () => {
      const route: string = "/api/dinosaurs";
      const response = await fetch(route);

      console.log("Getted ! ");
      console.log(response.status);
      const allDinosaurs = await response.json() as Dino[];

      console.log(allDinosaurs[0].name);

      return allDinosaurs;
    },
  });

  if (isPending) {
    return <h3>Pending...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <>
      <section className="circuits">
        <Navbar />
      </section>

      {
        /* <section className="flex flex-row flex wrap align-items-center justify-content-center lg:gap-3">
       */
      }
      <section className="grid">
        {data.map((dino: Dino) => {
          return <CircuitCard key={dino.name}></CircuitCard>;
        })}

        {/* Transformer avec une boucle pour afficher avec chaque circuit (dinosaur en phase de test) */}
      </section>
    </>
  );
}

export default Circuits;
