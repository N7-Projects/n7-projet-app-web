import Navbar from "../components/Navbar.tsx";
import { CircuitCard } from "../components/CircuitCard.tsx";
import { CircuitType } from "../types/circuitType.ts";

import "./Circuits.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Should be the page for displaying basic info of the association
function Circuits() {
  const _queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ circuits: "all-circuits" }],
    queryFn: async () => {
      const route: string = "/api/circuits";
      const response = await fetch(route);

      console.log("Getted ! ");
      console.log(response.status);
      const allCircuits = await response.json() as CircuitType[];

      console.log(allCircuits[0].name);

      return allCircuits;
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
      {
        /* <section className="flex flex-row flex wrap align-items-center justify-content-center lg:gap-3">
       */
      }
      <section className="grid">
        {data.map((circuit: CircuitType) => {
          // ...cicuit --> destructure all of the props of CircuitType inside the Component CorcuitCard
          return <CircuitCard key={circuit.name} {...circuit}></CircuitCard>;
        })}

        {/* Transformer avec une boucle pour afficher avec chaque circuit (dinosaur en phase de test) */}
      </section>
    </>
  );
}

export default Circuits;
