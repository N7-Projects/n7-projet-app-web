import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { useState } from "react";

function NewCircuit() {
  const [date, setDate] = useState<Date | null>();

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
    <div className="circuit-new-card flex justify-content-center">
      <Card
        title="Créer le circuit"
        subTitle="Rentrer les informations pour créer le circuit"
        footer={footer}
        header={header}
        className="w-6"
      >
        <form
          action="/api/circuits/new"
          method="post"
          className="flex flex-column"
        >
          <label htmlFor="circuitName" className="font-bold block mb-2">
            Nom du circuit
          </label>
          <InputText
            id="circuitName"
            name="circuit[name]"
            placeholder="Paul Ricard"
          />

          <label htmlFor="circuitCountry" className="font-bold block mb-2 mt-3">
            Pays du circuit
          </label>
          <InputText
            id="circuitCountry"
            name="circuit[place]"
            placeholder="France"
          />

          <label htmlFor="creationDate" className="font-bold block mb-2 mt-3">
            Date de création
          </label>
          <Calendar
            id="creationDate"
            name="circuit[creationDate]"
            dateFormat="dd-mm-yy"
            value={date}
            onChange={(e) => setDate(e.value)}
          />

          <label htmlFor="circuitCapacty" className="font-bold block mb-2 mt-3">
            Capacité de spectateurs
          </label>
          <InputText
            id="circuitCapacity"
            name="circuit[spectatorNumber]"
            keyfilter="pint"
            placeholder="3000"
          />

          <label htmlFor="circuitTurns" className="font-bold block mb-2 mt-3">
            Nombre de virages
          </label>
          <InputText
            id="circuitTurns"
            name="circuit[turnNumber]"
            keyfilter="pint"
            placeholder="15"
          />

          <label
            htmlFor="circuitDistance"
            className="font-bold block mb-2 mt-3"
          >
            Distance du circuit
          </label>
          <InputText
            id="circuitDistance"
            name="circuit[distance]"
            keyfilter="pnum"
            placeholder="5.842"
          />

          <label
            htmlFor="circuitBestTime"
            className="font-bold block mb-2 mt-3"
          >
            Meilleur temps
          </label>
          <InputMask
            id="circuitBestTime"
            name="circuit[bestTime"
            mask="99.99,999"
            placeholder="99.99,999"
          />
        </form>
      </Card>
    </div>
  );
}

export default NewCircuit;
