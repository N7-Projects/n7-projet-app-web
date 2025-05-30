import { Button, Card } from "primereact";
import { MemberType } from "../types/memberType.ts";
import { InputText } from "primereact/inputtext";
import { Navigate } from "react-router-dom";
import { useAuth } from "../middleware/AuthProvider.tsx";

function Register() {
  const auth = useAuth();

  if (auth == null) {
    alert("AUTH IS NULL IN REGISTER");
    return <Navigate to="/" />;
  }
  //   const navigate = useNavigate();
  //   const [step, setStep] = useState("form"); // "form", "homonyms"
  //   const [formData, setFormData] = useState(null);
  //   const [homonyms, setHomonyms] = useState([]);

  const header = <img alt="Card" src="/usercard.png" />;

  // Conditional footer based on current step
  const footer = (
    <>
      {auth.register.step === "form" && (
        <Button
          label="Register"
          severity="primary"
          icon="pi pi-send"
          type="submit"
          form="registerForm"
        />
      )}
      {auth.register.step === "homonyms" && (
        <div className="flex justify-content-between w-full">
          <Button
            label="Back"
            severity="secondary"
            icon="pi pi-arrow-left"
            onClick={() => auth.register.setStep("form")}
          />
          <Button
            label="Create New Account"
            severity="primary"
            icon="pi pi-plus"
            onClick={() => auth.register.completeRegistration()}
          />
        </div>
      )}
    </>
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataObj = new FormData(event.currentTarget);
    const userData = {
      email: formDataObj.get("email"),
      password: formDataObj.get("password"),
      name: formDataObj.get("name"),
      firstName: formDataObj.get("firstName"),
    };

    // Check for homonyms before registration
    await auth.register.checkHomonyms(userData);
  };

  // Form view
  if (auth.register.step === "form") {
    return (
      <div className="flex justify-content-center">
        <Card
          title="Créer un compte"
          footer={footer}
          header={header}
          className="w-8"
        >
          <form
            id="registerForm"
            className="flex flex-column gap-3"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label htmlFor="email" className="font-bold block mb-2">
                Adresse email
              </label>
              <InputText id="email" name="email" className="w-full" required />
            </div>

            <div className="field">
              <label htmlFor="password" className="font-bold block mb-2">
                Mot de passe
              </label>
              <InputText
                id="password"
                name="password"
                type="password"
                className="w-full"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="name" className="font-bold block mb-2">
                Nom de famille
              </label>
              <InputText id="name" name="name" className="w-full" required />
            </div>

            <div className="field">
              <label htmlFor="firstName" className="font-bold block mb-2">
                Prénom
              </label>
              <InputText
                id="firstName"
                name="firstName"
                className="w-full"
                required
              />
            </div>
          </form>
        </Card>
      </div>
    );
  }

  // Homonyms view
  if (auth.register.step === "homonyms") {
    return (
      <div className="flex justify-content-center">
        <Card
          title="Personnes existantes trouvées"
          footer={footer}
          header={header}
          className="w-8"
        >
          <p className="mb-3">
            Nous avons trouvé des personnes avec le même nom. Souhaitez-vous
            associer votre compte à l'une d'entre elles ou créer un nouveau
            compte ?
          </p>

          {auth.register.homonyms.length > 0
            ? (
              <div className="flex flex-column gap-2">
                {auth.register.homonyms.map((homonym: MemberType) => (
                  <Card
                    key={homonym.idMembre}
                    className="p-3 cursor-pointer hover:surface-hover"
                    onClick={() =>
                      auth.register.associateWithHomonym(homonym.idMembre)}
                  >
                    <div className="flex align-items-center gap-2">
                      <i className="pi pi-user text-xl"></i>
                      <div>
                        <div className="font-bold">
                          {homonym.firstName} {homonym.name}
                        </div>
                        <div>
                          {homonym.teams.map((team) => {
                            return (
                              <div key={team.idRacingTeam}>{team.nom}</div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )
            : (
              <div className="text-center p-3">
                <i className="pi pi-info-circle text-xl mb-2"></i>
                <div>Aucun membre existant trouvé avec ce nom</div>
              </div>
            )}
        </Card>
      </div>
    );
  }

  return null;
}

export default Register;
