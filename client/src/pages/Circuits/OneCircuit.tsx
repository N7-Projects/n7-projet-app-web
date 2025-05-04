import { Button, Card } from "primereact";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import "./OneCircuit.scss";
import { CircuitType } from "../../types/circuitType.ts";

function OneCircuit() {
  const { circuitId } = useParams();

  const _queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ circuits: "one-circuit", circuitId: circuitId }],
    queryFn: async () => {
      const route: string = `/api/circuits/${circuitId}`;
      const response = await fetch(route);

      console.log("Circuit Getted ! ");
      console.log(response.status);
      const oneCircuit = await response.json() as CircuitType;

      console.log(oneCircuit);

      return oneCircuit;
    },
  });

  if (isPending) {
    return <h3>Pending...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  const circuit: CircuitType = data;

  const header = (
    <img
      alt="Card"
      src="/usercard.png"
    />
  );
  const footer = (
    <>
      <Button
        label="Modifier"
        severity="primary"
        icon="pi pi-pencil"
        type="submit"
        form="circuitForm"
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

  return (
    <div className="one-team-card flex justify-content-center">
      <Card
        title={circuit.name}
        subTitle={circuit.place}
        footer={footer}
        header={header}
        className="w-8"
      >
        <div className="team-section">
          <h4>Création</h4>
          <p>{new Date(circuit.creationDate).toDateString()}</p>
        </div>

        <div className="team-section mt-4">
          <h4>Informations</h4>
          <p>
            Le circuit de {circuit.name} possède une capacité d'accueil de
            {` ${circuit.spectatorNumber}`} spectateurs. Ses{" "}
            {circuit.turnNumber} virages ont été réalisé en {circuit.bestTime}
            {" "}
            minutes pour le record.
          </p>
        </div>

        {
          /* <div className="team-section mt-4">
          <h4>Sponsors</h4>
          <ul className="list-none p-0 m-0">
            {racingTeam.sponsors.map((sponsor, idx) => (
              <li key={idx} className="mb-2">
                <i className="pi pi-star mr-2"></i>
                <strong>{sponsor.name}</strong> —{" "}
                {sponsor.investedCapital.toLocaleString()} €
              </li>
            ))}
          </ul>
        </div> */
        }
      </Card>
    </div>
  );
}

export default OneCircuit;
