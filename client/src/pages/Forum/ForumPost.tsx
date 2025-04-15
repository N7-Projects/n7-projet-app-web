import { useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
// @ts-types="react"
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "primereact";
import { MessageType } from "../../types/messageType.ts";

function ForumPost() {
  // State for the text input
  const [text, setText] = useState<string>("");

  // Create a ref to the input element
  const editorRef = useRef<Editor>(null);

  // Set focus on the text input when the component mounts
  useEffect(() => {
    editorRef.current?.focus; //inputElement?.focus();
  }, []);

  const url = useParams();
  const topicId = url.topicId;

  const handleErase = async () => {
    const quill = editorRef.current?.getQuill();
    quill.deleteText(0, quill.getLength());
    setText("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text) {
      console.error(text);
      alert("Message cannot be empty.");
      return;
    }

    const messageData = {
      text,
    };

    const route: string = `/api/forum/${topicId}/post`;

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
        const _mre = await response.json() as MessageType;
        console.log("Posted ! ");

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
        className="flex"
        onSubmit={handleSubmit}
      >
        <Editor
          id="text"
          name="text"
          placeholder="Saisir votre message"
          onTextChange={(e) => {
            if (e.htmlValue) {
              setText(e.htmlValue);
            }
          }}
          ref={editorRef}
        />
        <Button
          label="Envoyer"
          severity="primary"
          icon="pi pi-send"
          type="submit"
          className="send-button"
          disabled={text.trim() === ""}
        />
        <Button
          label="Effacer"
          severity="secondary"
          icon="pi pi-trash"
          className="send-button"
          disabled={text.trim() === ""}
          onClick={handleErase}
        />
      </form>
    </>
  );
}

export default ForumPost;
