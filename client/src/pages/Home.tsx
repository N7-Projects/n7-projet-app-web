import "./Home.scss";
import { Fieldset } from "primereact/fieldset";
import { useQuery } from "@tanstack/react-query";
import { CircuitCard } from "../components/circuit/CircuitCard";
import { CircuitType } from "../types/circuitType";

function Home() {
  const { data: circuits, isPending, isError, error } = useQuery({
    queryKey: ["circuits"],
    queryFn: async () => {
      const response = await fetch("/api/circuits");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des circuits");
      }
      return (await response.json()) as CircuitType[];
    },
  });

  return (
    <>
      <main>
        <div className="flex justify-content-center flex-column align-items-center">
          <h1 className="hagi-title lg:text-8xl">HAGI MET TA CEINTURE</h1>

          <div className="flex flex-column">
            <Fieldset
              legend="Circuits"
              toggleable
              className="flex justify-content-center mb-3"
            >
              {isPending && (
                <h3>
                  <i className="pi pi-spin pi-spinner"></i> Chargement...
                </h3>
              )}
              {isError && <h3>{error.message}</h3>}
              {!isPending && circuits && (
                <section className="grid">
                  {circuits.map((circuit: CircuitType) => (
                    <CircuitCard key={circuit.id} {...circuit} />
                  ))}
                </section>
              )}
            </Fieldset>
            <Fieldset
              legend="Equipes"
              toggleable
              className="flex justify-content-center mb-3"
            >
              <h2
                className="m-0 cursor-pointer"
                onClick={() => {
                  globalThis.location.href = "/teams";
                }}
              >
                Pour afficher toutes les équipes et leur classement
              </h2>
            </Fieldset>
            <Fieldset
              legend="Calendrier"
              toggleable
              className="flex justify-content-center mb-3"
            >
              <h2
                className="m-0 cursor-pointer"
                onClick={() => {
                  globalThis.location.href = "/calendar";
                }}
              >
                Pour afficher le calendrier des prochaines événements
              </h2>
            </Fieldset>
            <Fieldset
              legend="Forum"
              toggleable
              className="flex justify-content-center mb-3"
            >
              <h3
                className="m-0 cursor-pointer"
                onClick={() => {
                  globalThis.location.href = "/forum";
                }}
              >
                Si tu te poses des questions ? Tu recherches des informations ?
                Alors rend toi sur le forum et échanges avec d'autres membres
              </h3>
            </Fieldset>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
