// @ts-types="react"
import { FormEvent, SetStateAction, useRef, useState } from "react";
import { Button, InputText } from "primereact";
import { forumTopicType } from "../../types/forumTopicType.ts";
import { Editor } from "primereact";
import { EditorTextChangeEvent } from "primereact";

function NewForum() {
  // State for the text input
  const [text, setText] = useState<string>("");

  // Create a ref to the input element
  const textInputRef = useRef<Editor>(null);

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
    <>
      <form
        id="messageForm"
        className="flex col-12 justify-content-center"
        onSubmit={handleSubmit}
      >
        <Editor
          id="text"
          name="text"
          placeholder="Saisir votre nouveau sujet de dicussion"
          onTextChange={(e: EditorTextChangeEvent) => {
            if (e.textValue) {
              setText(e.textValue);
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
    </>
  );
}

export default NewForum;
