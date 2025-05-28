// @ts-types="react"
import { FormEvent, useRef, useState } from "react";
import { Button } from "primereact";
import { forumTopicType } from "../../types/forumTopicType.ts";
import { InputText } from "primereact";
import { useAuth } from "../../middleware/AuthProvider.tsx";

function NewForum() {
  const userAuth = useAuth();

  // State for the text input
  const [text, setText] = useState<string>("");

  // Create a ref to the input element
  const textInputRef = useRef<InputText>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text) {
      console.error("text must not be empty text: ", text);

      alert("Forum question cannot be empty.");
      return;
    }

    const messageData = {
      title: text,
    };

    const route: string = `/api/forum/post`;

    try {
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      console.log(response.status);
      if (response.ok) {
        const _mre = await response.json() as forumTopicType;
        console.log("Posted ! " + _mre.title);

        globalThis.location.reload();
      } else if (text.length > 255) {
        alert("Votre sujet est trop long, il doit être inférieur à 255.");
      } else {
        alert("Failed to post message.");
        console.log("Failed to Post !");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while posting the message.");
    }
  };

  return (
    <>
      <form
        id="messageForm"
        className="flex col-12 justify-content-center"
        onSubmit={handleSubmit}
      >
        <InputText
          id="text"
          name="text"
          style={{ width: "100rem" }}
          placeholder="Saisir votre nouveau sujet de dicussion"
          onChange={(e) => {
            setText(e.target.value);
          }}
          ref={textInputRef}
          invalid={text.length > 255}
        />

        <div className="flex">
          <Button
            label="Envoyer"
            className="send-button"
            severity="primary"
            icon="pi pi-send"
            type="submit"
            disabled={userAuth && !userAuth.user || text.trim() === "" ||
              text.trim().length > 255}
          />
          <Button
            label="Supprimer"
            className="send-button"
            severity="secondary"
            icon="pi pi-trash"
            disabled={userAuth && !userAuth.user || text.trim() === "" ||
              text.trim().length > 255}
            onClick={() => {
              setText("");
              textInputRef.current.value = "";
            }}
          />
        </div>
      </form>
    </>
  );
}

export default NewForum;
