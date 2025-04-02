import { Button, Card } from "primereact";

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
        label="Create"
        severity="primary"
        icon="pi pi-send"
        // Use Link if its not what do we want
      />
      <Button
        label="Clear"
        severity="danger"
        icon="pi pi-eraser"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );

  return (
    <div className="circuit-new-card flex justify-content-center">
      <Card
        title="Create new circuit"
        subTitle="Give the info"
        footer={footer}
        header={header}
        className="w-6"
      >
      </Card>
    </div>
  );
}

export default NewCircuit;
