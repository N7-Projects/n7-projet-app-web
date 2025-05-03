import "./Home.scss";
import { Fieldset } from "primereact/fieldset";

// Should be the page for displaying basic info of the association
function Home() {
  return (
    <>
      <main>
        <div className="flex justify-content-center flex-column align-items-center">
          <h1 className="hagi-title lg:text-8xl">
            HAGI MET TA CEINTURE
          </h1>

          <div className="flex flex-column">
            <Fieldset
              legend="Circuits"
              toggleable
              className="flex justify-content-center mb-3"
            >
              <h2
                className="m-0 cursor-pointer"
                onClick={() => {
                  globalThis.location.href = "/circuits";
                }}
              >
                Pour afficher tous les circuits
              </h2>
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
