import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { CircuitType } from "../../types/circuitType.ts";

function EditCircuit() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | null>();

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
        icon="pi pi-send"
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const circuitData = {
      name: formData.get("name"),
      place: formData.get("place"),
      creationDate: formData.get("creationDate"),
      spectatorNumber: parseInt(formData.get("spectatorNumber") as string, 10),
      turnNumber: parseInt(formData.get("turnNumber") as string, 10),
      distance: parseFloat(formData.get("distance") as string),
      bestTime: parseFloat(formData.get("bestTime") as string),
    };

    try {
      const response = await fetch(`/api/circuits/${circuit.id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(circuitData),
      });

      if (response.ok) {
        const createdCircuit = await response.json();
        navigate(`/circuits/${createdCircuit.id}`);
      } else {
        alert("Failed to edit circuit.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while editing the circuit.");
    }
  };

  return (
    <div className="circuit-new-card flex justify-content-center">
      <Card
        title="Modifier le circuit"
        subTitle="Rentrer les informations pour modifier le circuit"
        footer={footer}
        header={header}
        className="w-8"
      >
        <form
          id="circuitForm"
          className="flex flex-column"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="font-bold block mb-2">
            Nom du circuit
          </label>
          <InputText
            id="name"
            name="name"
            value={circuit.name}
          />

          <label htmlFor="place" className="font-bold block mb-2 mt-3">
            Pays du circuit
          </label>
          <InputText id="place" name="place" value={circuit.place} />

          <label htmlFor="creationDate" className="font-bold block mb-2 mt-3">
            Date de création
          </label>
          <Calendar
            id="creationDate"
            name="creationDate"
            dateFormat="yy-mm-dd"
            value={date}
            onChange={(e) => setDate(e.value)}
          />

          <label
            htmlFor="spectatorNumber"
            className="font-bold block mb-2 mt-3"
          >
            Capacité de spectateurs
          </label>
          <InputText
            id="spectatorNumber"
            name="spectatorNumber"
            keyfilter="pint"
            value={circuit.spectatorNumber.toString()}
          />

          <label htmlFor="turnNumber" className="font-bold block mb-2 mt-3">
            Nombre de virages
          </label>
          <InputText
            id="turnNumber"
            name="turnNumber"
            keyfilter="pint"
            value={circuit.turnNumber.toString()}
          />

          <label htmlFor="distance" className="font-bold block mb-2 mt-3">
            Distance du circuit
          </label>
          <InputText
            id="distance"
            name="distance"
            keyfilter="pnum"
            value={circuit.distance.toString()}
          />

          <label htmlFor="bestTime" className="font-bold block mb-2 mt-3">
            Meilleur temps
          </label>
          <InputText
            id="bestTime"
            name="bestTime"
            keyfilter="pnum"
            value={circuit.bestTime.toString()}
          />
        </form>
      </Card>
    </div>
  );
}

export default EditCircuit;
