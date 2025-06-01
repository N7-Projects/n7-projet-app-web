import { Button, Card } from "primereact";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import "./OneCircuit.scss";
import { CircuitType } from "../../types/circuitType.ts";
import { useAuth } from "../../middleware/AuthProvider.tsx";
import { useRef } from "react";
import { Toast } from "primereact";
import { confirmDialog } from "primereact";
import { ConfirmDialog } from "primereact";

function OneCircuit() {
  const { circuitId } = useParams();

  const auth = useAuth();

  const navigate = useNavigate();

  const toast = useRef(null);

  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ circuits: "one-circuit", circuitId: circuitId }],
    queryFn: async () => {
      const route: string = `/api/circuits/${circuitId}`;
      const response = await fetch(route);

      console.log(response.status);

      if (response.ok) {
        console.log("Circuit Getted ! ");
        const oneCircuit = await response.json() as CircuitType;
        console.log(oneCircuit);
        return oneCircuit;
      } else {
        console.error("Le circuit n'existe pas");

        queryClient.invalidateQueries({
          queryKey: [{ circuits: "one-circuit", circuitId: circuitId }],
        });

        navigate("/circuits");
      }
    },
  });

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

  if (auth == null) {
    return <h1>AUTH IS NULL IN ONECIRCUIT</h1>;
  }

  const circuit: CircuitType = data;

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "Circuit supprimé",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "Circuit non supprimé",
      life: 3000,
    });
  };

  const handleSuppress = async () => {
    try {
      const response = await fetch(`/api/circuits/${circuitId}`, {
        method: "DELETE",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      if (response.ok) {
        accept();
        queryClient.invalidateQueries({
          queryKey: [{ circuits: "one-circuit", circuitId: circuitId }],
        });
        globalThis.location.href = "/circuits";
      } else {
        alert("Failed to delete circuit.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the circuit : ");
    }
  };

  const suppress = () => {
    confirmDialog({
      message:
        "Vous êtes sûr de vouloir supprimer ce circuit et ses informations ?",
      header: "Confirmation de Suppression",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-info p-button-outlined",

      accept: () => handleSuppress(),
      reject,
    });
  };

  const header = (
    <img
      alt="Card"
      src="/usercard.png"
    />
  );
  const footerEnabled = (
    <>
      <Button
        label="Modifier"
        severity="primary"
        icon="pi pi-pencil"
        type="submit"
        form="circuitForm"
        onClick={() => {
          globalThis.location.href = `/circuits/${circuit.id}/edit`;
        }}
      />
      <Button
        label="Supprimer"
        severity="danger"
        icon="pi pi-eraser"
        style={{ marginLeft: "0.5em" }}
        onClick={suppress}
      />
    </>
  );

  const footerDisabled = (
    <>
      <Button
        label="Modifier"
        severity="primary"
        icon="pi pi-pencil"
        disabled
      />
      <Button
        label="Supprimer"
        severity="danger"
        icon="pi pi-eraser"
        style={{ marginLeft: "0.5em" }}
        disabled
      />
    </>
  );

  const footer = auth && auth.user ? footerEnabled : footerDisabled;

  return (
    <div className="one-team-card flex justify-content-center">
      <Toast ref={toast} />
      <ConfirmDialog />
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
            {circuit.turnNumber} virages et{" "}
            {circuit.distance}km ont été réalisé en {circuit.bestTime}{" "}
            minutes pour le record.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default OneCircuit;
