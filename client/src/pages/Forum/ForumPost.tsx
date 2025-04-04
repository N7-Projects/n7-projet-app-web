import { useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact";
// @ts-types="react"
import { FormEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function ForumPost(title: string) {
  const date = useState<Date | null>();

  const _queryClient = useQueryClient();

  const url = useParams();
  const topicId = url.topicId;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const messageData = {
      text: formData.get("text"),
      dateOfPublication: date,
      subject: { idForumTopic: topicId, title: title },
    };

    const route: string = "/api/forum/" + topicId + "/new";

    try {
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      console.log(response);

      if (response.ok) {
        alert("Message posted successfully!");
      } else {
        alert("Failed to post message.");
      }

      console.log(response.status);
      console.log("Post !");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while posting the message.");
    }
  };

  return (
    <div className="flex flex-column">
      <form
        id="messageForm"
        className="flex"
        onSubmit={handleSubmit}
      >
        <InputText id="text" name="text" placeholder="Saisir votre message" />

        <Button
          label="Envoyer"
          severity="primary"
          icon="pi pi-send"
          type="submit"
          form="MessageForm"
        />
      </form>
    </div>
  );
}

export default ForumPost;
