import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageType } from "../../types/messageType.ts";
import { MessageCard } from "../../components/forum/MessageCard.tsx";
import { useParams } from "react-router-dom";
import ForumPost from "./ForumPost.tsx";
import { Button } from "primereact";

function ForumConsult() {
  const url = useParams();

  const topicId = url.topicId;

  const _queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ messages: "all-message-on-topicId" }],
    queryFn: async () => {
      const routeTitle: string = "/api/forum/" + topicId + "/consult";
      const title = await fetch(routeTitle);

      const route: string = "/api/forum/" + topicId;
      const response = await fetch(route);

      const allMessageOnTopic = await response.json() as MessageType[];
      console.log(response.status);

      const tite = await title.text() as string;
      console.log(title.status);

      console.log("Both Getted ! ");

      if (allMessageOnTopic.length > 0) {
        console.log(allMessageOnTopic[0].text);
      }

      if (tite.length > 0) {
        console.log(tite);
      }

      return { allMessageOnTopic, tite };
    },
  });

  if (isPending) {
    return <h3>Pending ...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (data.allMessageOnTopic.length > 0 && data.tite.length > 0) {
    return (
      <>
        <div className="flex justify-content-center flex-column align-items-center">
          <h1>{data.tite}</h1>
        </div>
        {
          /* <section className="flex flex-row flex wrap align-items-center justify-content-center lg:gap-3">
         */
        }-
        <section className="grid">
          {data.allMessageOnTopic.map((message: MessageType) => {
            // ...message --> destructure all of the props of MessageType inside the Component
            // Message Card;
            return <MessageCard key={message.id} {...message}></MessageCard>;
          })}

          {/* Transformer avec une boucle pour afficher avec chaque message (dinosaur en phase de test) */}
        </section>
        <div className="flex justify-content-center col-12 md:w-80rem">
          <ForumPost />
        </div>
      </>
    );
  } else if (data.tite.length > 0) {
    return (
      <>
        <div className="flex justify-content-center col-12">
          <h1>{data.tite}</h1>
        </div>
        <div className="flex justify-content-center col-12">
          <h2>
            Ce forum ne contient pas de messages.
          </h2>
        </div>
        <div className="flex justify-content-center col-12">
          <ForumPost />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-content-center col-12">
          <h1>Erreur lors du chargement du Forum : Forum inconnue</h1>
        </div>
        <div className="flex justify-content-center col-12">
          <h2>
            Revenir vers l'ensemble des Forum
          </h2>
        </div>
        <div className="flex justify-content-center col-12">
          <Button
            label="Retour au Forum"
            icon="pi pi-arrow-left"
            severity="primary"
            onClick={() => globalThis.location.href = "/forum"}
          />
        </div>
      </>
    );
  }
}

export default ForumConsult;
