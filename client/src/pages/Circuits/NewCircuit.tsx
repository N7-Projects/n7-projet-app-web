import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod/v4";

function NewCircuit() {
  const [date, setDate] = useState<Date | null>();
  const navigate = useNavigate();

  const header = (
    <img
      alt="Card"
      src="/usercard.png"
    />
  );
  const footer = (
    <>
      <Button
        label="Créer"
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

  const Circuits = z.object({
    name: z.string(),
    place: z.string(),
    creationDate: z.date(),
    spectatorNumber: z.number(),
    turnNumber: z.number(),
    distance: z.number(),
    bestTime: z.number(),
  });

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

    const result = Circuits.safeParse(circuitData);
    if (!result.success) {
      alert(result.error); // ZodError instance
    } else {
      console.log("CIRCUIT VALIDATED");
    }

    try {
      const response = await fetch("/api/circuits/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(circuitData),
      });

      if (response.ok) {
        const createdCircuit = await response.json();
        navigate(`/circuits/${createdCircuit.id}`);
      } else {
        alert("Failed to create circuit.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the circuit.");
    }
  };

  return (
    <div className="circuit-new-card flex justify-content-center">
      <Card
        title="Créer le circuit"
        subTitle="Rentrer les informations pour créer le circuit"
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
          <InputText id="name" name="name" placeholder="Paul Ricard" required />

          <label htmlFor="place" className="font-bold block mb-2 mt-3">
            Pays du circuit
          </label>
          <InputText id="place" name="place" placeholder="France" required />

          <label htmlFor="creationDate" className="font-bold block mb-2 mt-3">
            Date de création
          </label>
          <Calendar
            id="creationDate"
            name="creationDate"
            dateFormat="yy-mm-dd"
            value={date}
            onChange={(e) => setDate(e.value)}
            required
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
            placeholder="3000"
            required
          />

          <label htmlFor="turnNumber" className="font-bold block mb-2 mt-3">
            Nombre de virages
          </label>
          <InputText
            id="turnNumber"
            name="turnNumber"
            keyfilter="pint"
            placeholder="15"
            required
          />

          <label htmlFor="distance" className="font-bold block mb-2 mt-3">
            Distance du circuit
          </label>
          <InputText
            id="distance"
            name="distance"
            keyfilter="pnum"
            placeholder="5.842"
            required
          />

          <label htmlFor="bestTime" className="font-bold block mb-2 mt-3">
            Meilleur temps
          </label>
          <InputText
            id="bestTime"
            name="bestTime"
            keyfilter="pnum"
            placeholder="99.99"
            required
          />
        </form>
      </Card>
    </div>
  );
}

export default NewCircuit;
