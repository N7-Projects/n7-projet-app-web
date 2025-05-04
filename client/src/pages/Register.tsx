import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LoginInformation } from "../types/loginInformation.ts";

function Register() {
  const navigate = useNavigate();

  const header = <img alt="Card" src="/usercard.png" />;

  const footer = (
    <>
      <Button
        label="Register"
        severity="primary"
        icon="pi pi-send"
        type="submit"
        form="registerForm"
      />
    </>
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const teamData = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
      firstName: formData.get("firstName"),
    };

    console.log(teamData);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        const data: LoginInformation = await response.json();
        localStorage.setItem("jwt", data.token); // or sessionStorage
        navigate(`/members/${data.memberId}`);
      } else {
        alert("Failed to register.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to register new user.");
    }
  };

  return (
    <div className="team-new-card flex justify-content-center">
      <Card
        title="Créer un compte"
        footer={footer}
        header={header}
        className="w-8"
      >
        <form
          id="registerForm"
          className="flex flex-column"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="font-bold block mb-2">
            Adresse email
          </label>
          <InputText id="email" name="email" />
          <label htmlFor="password" className="font-bold block mb-2">
            Mot de passe
          </label>
          <InputText id="password" name="password" type="password" />
          <label htmlFor="name" className="font-bold block mb-2">
            Nom de famille
          </label>
          <InputText id="name" name="name" />
          <label htmlFor="firstname" className="font-bold block mb-2">
            Prénom
          </label>
          <InputText id="firstName" name="firstName" />
        </form>
      </Card>
    </div>
  );
}

export default Register;
