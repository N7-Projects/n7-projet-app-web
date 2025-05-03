import { Button } from "primereact/button";

import { SplitButton } from "primereact/splitbutton";
import { ButtonGroup } from "primereact/buttongroup";

import "./Navbar.scss";

/* Access path to the logo of Photo7 */
const logoFlagPath: string = "/racing-flags.svg";

export default function Navbar() {
  return (
    <section className="navbar">
      <Button
        severity="secondary"
        outlined
        className="image"
        onClick={() => {
          globalThis.location.href = "/";
        }}
      >
        <img src={logoFlagPath} alt="Race flags logo" />
      </Button>

      <ul className="navbar-desktop">
        <li key="Circuits">
          <SplitButton
            label="Circuits"
            icon="pi pi-car"
            dropdownIcon="pi pi-caret-down"
            outlined
            onClick={() => {
              globalThis.location.href = "/";
            }}
            model={[
              {
                label: "Tous",
                icon: "pi pi-bars",
                command: () => {
                  globalThis.location.href = "/circuits";
                },
              },
              {
                label: "Nouveau",
                icon: "pi pi-plus",
                command: () => {
                  globalThis.location.href = "/circuits/new";
                },
              },
            ]}
          />
        </li>

        <li key="Equipes">
          <Button
            label="Equipes"
            outlined
            onClick={() => {
              globalThis.location.href = "/teams";
            }}
          />
        </li>
        <li key="Calendrier">
          <Button
            label="Calendrier"
            outlined
            onClick={() => {
              globalThis.location.href = "/calendar";
            }}
          />
        </li>
        <li key="Forum">
          <Button
            label="Forum"
            outlined
            onClick={() => {
              globalThis.location.href = "/forum";
            }}
          />
        </li>
        <li key="Newsletter">
          <Button
            label="Newsletter"
            outlined
            onClick={() => {
              globalThis.location.href = "/subscribe";
            }}
          />
        </li>
      </ul>
    </section>
  );
}
