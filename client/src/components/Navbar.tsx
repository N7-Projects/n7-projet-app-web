import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { useEffect, useState } from "react";
import { MemberType } from "../types/memberType.ts";
import "./Navbar.scss";

const logoFlagPath: string = "/racing-flags.svg";

const useUser = () => {
  const [user, setUser] = useState<MemberType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      fetch("/api/connected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (res.ok) {
            const data: MemberType = await res.json();
            setUser(data);
          } else {
            localStorage.removeItem("jwt");
            setUser(null);
          }
        })
        .catch((err) => {
          console.error("API call failed:", err);
          localStorage.removeItem("jwt");
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  return { user };
};

export default function Navbar() {
  const { user } = useUser();

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

        {user
          ? (
            <li key="Login">
              <SplitButton
                severity="info"
                label={user.name}
                icon="pi pi-user"
                dropdownIcon="pi pi-caret-down"
                outlined
                onClick={() => {
                  globalThis.location.href = "/members/" + user.idMembre;
                }}
                model={[
                  {
                    label: "Profile",
                    icon: "pi pi-user",
                    command: () => {
                      globalThis.location.href = "/members/" + user.idMembre;
                    },
                  },
                  {
                    label: "Se déconnecter",
                    icon: "pi pi-sign-out",
                    command: () => {
                      localStorage.removeItem("jwt");
                      globalThis.location.reload();
                    },
                  },
                ]}
              />
            </li>
          )
          : (
            <>
              <li key="Login">
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
              </li>
              <li key="Register">
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
              </li>
            </>
          )}
      </ul>
    </section>
  );
}
