import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import "./Navbar.scss";
import { useAuth } from "../middleware/AuthProvider.tsx";

const logoFlagPath: string = "/racing-flags.svg";

export default function Navbar() {
  const userAuthed = useAuth();

  return (
    <section className="flex
  justify-content-between
  align-items-center
  static
  h-3rem
  my-3
  mx-0 ">
      <Button
        severity="secondary"
        outlined
        className="image"
        onClick={() => {
          globalThis.location.href = "/";
        }}
      >
        <img
          src={logoFlagPath}
          alt="Race flags logo"
          style={{ width: "4rem", margin: "1%" }}
        />
      </Button>

      <div className="navbar-desktop">
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

        <Button
          className="nav-button"
          label="Calendrier"
          icon="pi pi-calendar"
          outlined
          onClick={() => {
            globalThis.location.href = "/calendar";
          }}
        />

        <Button
          className="nav-button"
          label="Forum"
          icon="pi pi-comments"
          outlined
          onClick={() => {
            globalThis.location.href = "/forum";
          }}
        />

        <Button
          className="nav-button"
          label="Newsletter"
          icon="pi pi-send"
          outlined
          onClick={() => {
            globalThis.location.href = "/subscribe";
          }}
        />

        {userAuthed && userAuthed.user
          ? (
            <SplitButton
              severity="info"
              label={userAuthed.user.name}
              icon="pi pi-user"
              dropdownIcon="pi pi-caret-down"
              outlined
              onClick={() => {
                globalThis.location.href = "/members/" +
                  userAuthed.user?.idMembre;
              }}
              model={[
                {
                  label: "Profile",
                  icon: "pi pi-user",
                  command: () => {
                    globalThis.location.href = "/members/" +
                      userAuthed.user?.idMembre;
                  },
                },
                {
                  label: "Se déconnecter",
                  icon: "pi pi-sign-out",
                  command: () => {
                    userAuthed.logOut();
                  },
                },
              ]}
            />
          )
          : (
            <>
              <Button
                className="nav-button"
                severity="info"
                label="Se connecter"
                icon="pi pi-sign-in"
                outlined
                onClick={() => {
                  globalThis.location.href = "/login";
                }}
              />

              <Button
                className="nav-button"
                severity="info"
                label="Créer un compte"
                icon="pi pi-user-plus"
                outlined
                onClick={() => {
                  globalThis.location.href = "/register";
                }}
              />
            </>
          )}
      </div>

      <div className="navbar-medium">
      </div>
    </section>
  );
}
