import { Button, Card } from "primereact";
import { MemberType } from "../types/memberType.ts";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState("form"); // "form", "homonyms"
  const [formData, setFormData] = useState(null);
  const [homonyms, setHomonyms] = useState([]);

  const header = <img alt="Card" src="/usercard.png" />;

  // Conditional footer based on current step
  const footer = (
    <>
      {step === "form" && (
        <Button
          label="Register"
          severity="primary"
          icon="pi pi-send"
          type="submit"
          form="registerForm"
        />
      )}
      {step === "homonyms" && (
        <div className="flex justify-content-between w-full">
          <Button
            label="Back"
            severity="secondary"
            icon="pi pi-arrow-left"
            onClick={() => setStep("form")}
          />
          <Button
            label="Create New Account"
            severity="primary"
            icon="pi pi-plus"
            onClick={() => completeRegistration()}
          />
        </div>
      )}
    </>
  );

  // Check for homonyms
  const checkHomonyms = async (userData) => {
    try {
      const response = await fetch(
        `/api/register/homonyms/${userData.name}/${userData.firstName}`,
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setHomonyms(data);
          setFormData(userData);
          setStep("homonyms");
        } else {
          // No homonyms found - proceed with registration
          userData = { ...userData, hasId: false };
          await registerUser(userData);
        }
      } else {
        // API error - proceed with registration
        await registerUser(userData);
      }
    } catch (error) {
      console.error("Error checking homonyms:", error);
      alert(
        "Une erreur s'est produite lors de la vérification des membres existants.",
      );
    }
  };

  // Associate with existing homonym
  const associateWithHomonym = async (homonymId) => {
    if (!formData) return;

    try {
      // Create a new object with all the registration data plus the ID field
      const registrationData = {
        ...formData,
        idMembre: homonymId, // This needs to be wrapped in OptionalLong on the server
        hasId: true,
      };

      await registerUser(registrationData);
    } catch (error) {
      console.error("Error associating with homonym:", error);
      alert(
        "Une erreur s'est produite lors de l'association avec un membre existant.",
      );
    }
  };

  // Complete registration without association
  const completeRegistration = async () => {
    if (!formData) return;

    await registerUser(formData);
  };

  // Register user
  const registerUser = async (userData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwt", data.token);
        navigate(`/members/${data.memberId}`);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Échec de l'inscription.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Une erreur s'est produite lors de l'inscription de l'utilisateur.",
      );
    }
  };

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
    await checkHomonyms(userData);
  };

  // Form view
  if (step === "form") {
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
  if (step === "homonyms") {
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

          {homonyms.length > 0
            ? (
              <div className="flex flex-column gap-2">
                {homonyms.map((homonym: MemberType) => (
                  <Card
                    key={homonym.idMembre}
                    className="p-3 cursor-pointer hover:surface-hover"
                    onClick={() => associateWithHomonym(homonym.idMembre)}
                  >
                    <div className="flex align-items-center gap-2">
                      <i className="pi pi-user text-xl"></i>
                      <div>
                        <div className="font-bold">
                          {homonym.firstname || homonym.firstname}{" "}
                          {homonym.name}
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
