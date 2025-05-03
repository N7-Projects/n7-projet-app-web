import { Button } from "primereact/button";

import { SplitButton } from "primereact/splitbutton";

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
              globalThis.location.href = "/circuits";
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
          <SplitButton
            label="Equipes"
            icon="pi pi-users"
            dropdownIcon="pi pi-caret-down"
            outlined
            onClick={() => {
              globalThis.location.href = "/teams";
            }}
            model={[
              {
                label: "Tous",
                icon: "pi pi-bars",
                command: () => {
                  globalThis.location.href = "/teams";
                },
              },
              {
                label: "Nouveau",
                icon: "pi pi-plus",
                command: () => {
                  globalThis.location.href = "/teams/new";
                },
              },
            ]}
          />
        </li>

        <li key="Calendrier">
          <Button
            className="nav-button"
            label="Calendrier"
            icon="pi pi-calendar"
            outlined
            onClick={() => {
              globalThis.location.href = "/calendar";
            }}
          />
        </li>
        <li key="Forum">
          <Button
            className="nav-button"
            label="Forum"
            icon="pi pi-comments"
            outlined
            onClick={() => {
              globalThis.location.href = "/forum";
            }}
          />
        </li>
        <li key="Newsletter">
          <Button
            className="nav-button"
            label="Newsletter"
            icon="pi pi-send"
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
