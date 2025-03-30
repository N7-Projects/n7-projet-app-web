import { Button } from "primereact/button";
import "./Navbar.scss";

/* Access path to the logo of Photo7 */
const logoFlagPath: string = "../../public/racing-flags.svg";

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
          <Button
            label="Circuits"
            size="large"
            text
            onClick={() => {
              globalThis.location.href = "/circuits";
            }}
          />
        </li>
        <li key="Calendrier">
          <Button
            label="Calendrier"
            text
            onClick={() => {
              globalThis.location.href = "/calendar";
            }}
          />
        </li>
        <li key="Forum">
          <Button
            label="Forum"
            text
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
