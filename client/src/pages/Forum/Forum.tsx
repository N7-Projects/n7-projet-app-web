import { ForumTopicCard } from "../../components/forum/ForumTopicCard.tsx";
import { forumTopicType } from "../../types/forumTopicType.ts";

import "./Forum.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
      {
        /* <section className="flex flex-row flex wrap align-items-center justify-content-center lg:gap-3">
       */
      }
      <section className="grid">
        {data.map((forum: forumTopicType) => {
          // ...forum --> destructure all of the props of CircuitType inside the Component CorcuitCard
          return <ForumTopicCard key={forum.title} {...forum}></ForumTopicCard>;
        })}

        {/* Transformer avec une boucle pour afficher avec chaque forum (dinosaur en phase de test) */}
      </section>
    </>
  );
}

export default Forum;
