// @ts-types="react"
import { FormEvent, SetStateAction, useRef, useState } from "react";
import { Button, InputText } from "primereact";
import { MessageType } from "../../types/messageType.ts";
import { forumTopicType } from "../../types/forumTopicType.ts";
import { title } from "node:process";

function NewForum() {
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
    <div className="flex justify-content-center">
      <form
        id="messageForm"
        className="flex"
        onSubmit={handleSubmit}
      >
        <InputText
          id="text"
          name="text"
          placeholder="Saisir votre nouveau sujet de dicussion"
          onChange={(e: { target: { value: SetStateAction<string> } }) => {
            if (e.target) {
              setText(e.target.value);
            }
          }}
          ref={textInputRef}
        />
        <Button
          label="Envoyer"
          severity="primary"
          icon="pi pi-send"
          type="submit"
          disabled={text.trim() === ""}
        />
      </form>
    </div>
  );
}

export default NewForum;
