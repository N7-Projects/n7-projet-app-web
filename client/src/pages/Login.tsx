import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { useAuth } from "../middleware/AuthProvider.tsx";

function Login() {

  const header = <img alt="Card" src="/usercard.png" />;

  const footer = (
    <>
      <Button
        label="Login"
        severity="primary"
        icon="pi pi-send"
        type="submit"
        form="loginForm"
      />
    </>
  );

  const auth = useAuth();

  const handleSubmit =  (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(data);

    // try {
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     const data: LoginInformation = await response.json();
    //     localStorage.setItem("jwt", data.token); // or sessionStorage
    //     navigate(`/members`);
    //   } else {
    //     alert("Failed to login.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("An error occurred while trying to log in.");
    // }

    if (data.email !== "" && data.password !== "") {
      auth?.loginAction(data);
      return;
    } else {
      alert("Provide valid input");
    }
  };

  return (
    <div className="team-new-card flex justify-content-center">
      <Card
        title="Se connecter"
        footer={footer}
        header={header}
        className="w-8"
      >
        <form
          id="loginForm"
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
        </form>
      </Card>
    </div>
  );
}

export default Login;
