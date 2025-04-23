import { ForumTopicCard } from "../../components/forum/ForumTopicCard.tsx";
import { forumTopicType } from "../../types/forumTopicType.ts";

import "./Forum.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NewForum from "./NewForum.tsx";

function Forum() {
  const _queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ forum: "all-forum" }],
    queryFn: async () => {
      const route: string = "/api/forum";
      const response = await fetch(route);

      console.log("Getted !");
      console.log(response.status);
      const allForum = await response.json() as forumTopicType[];

      console.log(allForum[0].title);

      return allForum;
    },
  });

  if (isPending) {
    return <h3>Pending ...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <>
      <main className="forum">
        <div className="flex justify-content-center flex-column align-items-center hagi-title">
          <h1>Forum</h1>
        </div>
        {
          /* <section className="flex flex-row flex wrap align-items-center justify-content-center lg:gap-3">
        */
        }
        <section className="grid">
          {data.map((forum: forumTopicType) => {
            // ...forum --> destructure all of the props of CircuitType inside the Component CorcuitCard
            return <ForumTopicCard key={forum.idForumTopic} {...forum} />;
          })}

          {/* Transformer avec une boucle pour afficher avec chaque forum (dinosaur en phase de test) */}
        </section>
        <NewForum />
      </main>
    </>
  );
}

export default Forum;
