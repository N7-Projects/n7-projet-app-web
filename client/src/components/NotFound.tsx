import { Card } from "primereact";
import { Button } from "primereact";

function NotFound() {
  const header = (
    <img
      alt="Card"
      src="/usercard.png"
    />
  );

  const footer = (
    <div className="flex justify-content-center">
      <Button
        label="Menu"
        severity="info"
        icon="pi pi-home"
        // Use Link if its not what do we want
        onClick={() => {
          globalThis.location.href = "/";
        }}
      />
    </div>
  );

  return (
    <div className="grid">
      <div className="lg:col-6 lg:col-offset-3 sm:col-12 sm:col-offset-0">
        <Card
          title="Page non trouvée"
          header={header}
          footer={footer}
        >
          <p className="m-0">
            La page que vous cherchez à l'adresse : {globalThis.location.href}
            {" "}
            n'existe pas.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default NotFound;
