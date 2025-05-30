import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { useAuth } from "../middleware/AuthProvider.tsx";

function Login() {
  const auth = useAuth();

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (data.email !== "" && data.password !== "") {
      console.log("LOGIN OK");
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
