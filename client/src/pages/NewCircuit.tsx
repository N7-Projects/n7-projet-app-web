import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";

function NewCircuit() {
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
          <InputText id="circuitName" placeholder="Paul Ricard" />

          <label htmlFor="circuitCountry" className="font-bold block mb-2">
            Pays du circuit
          </label>
          <InputText id="circuitCountry" placeholder="France" />

          <label htmlFor="creationDate" className="font-bold block mb-2">
            Date de création
          </label>
          <InputMask
            id="creationDate"
            mask="99.99,999"
            placeholder="99.99,999"
          />

          <label htmlFor="circuitCapacty" className="font-bold block mb-2">
            Capacité de spectateurs
          </label>
          <InputText id="circuitCapacity" keyfilter="pint" placeholder="3000" />

          <label htmlFor="circuitTurns" className="font-bold block mb-2">
            Nombre de virages
          </label>
          <InputText
            id="circuitTurns"
            keyfilter="pint"
            placeholder="15"
          />

          <label htmlFor="circuitDistance" className="font-bold block mb-2">
            Distance du circuit
          </label>
          <InputText
            id="circuitDistance"
            keyfilter="pnum"
            placeholder="5.842"
          />

          <label htmlFor="circuitTurns" className="font-bold block mb-2">
            Meilleur temps
          </label>
          <InputMask
            id="circuitTurns"
            mask="99.99,999"
            placeholder="99.99,999"
          />
        </form>
      </Card>
    </div>
  );
}

export default NewCircuit;
