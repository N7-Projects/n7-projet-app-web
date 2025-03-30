import Navbar from "../components/Navbar.tsx";
import { Card } from "primereact/card";
import { Button } from "primereact";

import "./Circuits.scss";

const header = (
  <img
    alt="Card"
    src="./usercard.png"
  />
);
const footer = (
  <>
    <Button label="Save" icon="pi pi-check" />
    <Button
      label="Cancel"
      severity="secondary"
      icon="pi pi-times"
      style={{ marginLeft: "0.5em" }}
    />
  </>
);

// Should be the page for displaying basic info of the association
function Circuits() {
  return (
    <>
      <section className="circuits">
        <Navbar />
      </section>

      <section>
        <div className="card flex justify-content-center">
          <Card
            title="Advanced Card"
            subTitle="Card subtitle"
            footer={footer}
            header={header}
            className="md:w-25rem"
          >
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Circuits;
