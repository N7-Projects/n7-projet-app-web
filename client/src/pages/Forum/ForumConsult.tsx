import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageType } from "../../types/messageType.ts";
import { MessageCard } from "../../components/forum/MessageCard.tsx";
import { useParams } from "react-router-dom";
import ForumPost from "./ForumPost.tsx";
import { Button } from "primereact";
import "./ForumConsult.scss";

type dataT = {
  allMessageOnTopic: MessageType[];
  title: string;
};

function titleF(data: dataT) {
  if (data.title.length > 0) {
    return (
      <>
        <div className="flex justify-content-center flex-column align-items-center">
          <h1>{data.title}</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-content-center col-12">
          <h1>Erreur lors du chargement du Forum : Forum inconnue</h1>
        </div>
      </>
    );
  }
}

function handleMessage(data: dataT) {
  if (data.allMessageOnTopic.length > 0) {
    return (
      <>
        <section className="grid">
          {data.allMessageOnTopic.map((message: MessageType) => {
            // ...message --> destructure all of the props of MessageType inside the Component
            // Message Card;

            // console.log("messageid = ", message.idMessage);
            return <MessageCard key={message.idMessage} {...message} />;
          })}

          {/* Transformer avec une boucle pour afficher avec chaque message (dinosaur en phase de test) */}
        </section>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-content-center">
          <h2>
            Ce forum ne contient pas de messages.
          </h2>
        </div>
      </>
    );
  }
}

function ForumConsult() {
  const url = useParams();

  const topicId = url.topicId;

  const _queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ messages: "all-message-on-topicId" }],
    queryFn: async () => {
      const routeTitle: string = "/api/forum/" + topicId + "/consult";
      const tite = await fetch(routeTitle);

      const route: string = "/api/forum/" + topicId;
      const response = await fetch(route);

      const allMessageOnTopic = await response.json() as MessageType[];
      console.log(response.status);

      const title = await tite.text() as string;
      console.log(tite.status);

      console.log("Both Getted ! ");

      return { allMessageOnTopic, title };
    },
  });

  if (isPending) {
    return (
      <h3>
        <i className="pi pi-spin pi-spinner">
        </i>
        Pending ...
      </h3>
    );
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (data.title.length > 0) {
    return (
      <>
        {titleF(data)}

        <div className="grid">
          <div className="block justify-content-center col-6">
            {handleMessage(data)}
          </div>
          <div className="flex justify-content-center col-6">
            <ForumPost />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-error">
          {titleF(data)}
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
        </div>
      </>
    );
  }
}

export default ForumConsult;
