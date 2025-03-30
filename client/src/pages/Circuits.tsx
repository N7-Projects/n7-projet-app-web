import Navbar from "../components/Navbar.tsx";
import { CircuitCard } from "../components/CircuitCard.tsx";

import "./Circuits.scss";

// Should be the page for displaying basic info of the association
function Circuits() {
  return (
    <>
      <section className="circuits">
        <Navbar />
      </section>

      {
        /* <section className="flex flex-row flex wrap align-items-center justify-content-center lg:gap-3">
       */
      }
      <section className="grid">
        <CircuitCard></CircuitCard>
        <CircuitCard></CircuitCard>
        <CircuitCard></CircuitCard>
        <CircuitCard></CircuitCard>
        <CircuitCard></CircuitCard>
      </section>
    </>
  );
}

export default Circuits;
