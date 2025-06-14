import { Button } from "primereact";
import { Card } from "primereact";
import { CircuitType } from "../../types/circuitType.ts";

function CircuitCard(circuit: CircuitType) {
  const header = (
    <img
      alt="Card"
      src="/usercard.png"
    />
  );
  const footer = (
    <>
      <Button
        label="View Circuit"
        severity="primary"
        icon="pi pi-search"
        // Use Link if its not what do we want
        onClick={() => {
          globalThis.location.href = `/circuits/${circuit.id}`;
        }}
      />
      <Button
        label="Like"
        severity="secondary"
        icon="pi pi-star"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );

  return (
    <div className="card flex justify-content-center col-4">
      <Card
        title={circuit.name}
        subTitle={circuit.place}
        footer={footer}
        header={header}
        className="md:w-25rem"
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </Card>
    </div>
  );
}

export { CircuitCard };
