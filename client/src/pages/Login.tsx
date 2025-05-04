import { Button, Card } from "primereact";
import { InputText } from "primereact/inputtext";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MemberType } from "../types/memberType.ts";
import React from "react";

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const teamData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(teamData);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        const member: MemberType = await response.json();
        navigate(`/members/${member.idMembre}`);
      } else {
        alert("Failed to login.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to log in.");
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
