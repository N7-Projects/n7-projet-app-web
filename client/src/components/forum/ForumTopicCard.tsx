import { Button } from "primereact";
import { Card } from "primereact";
import { forumTopicType } from "../../types/forumTopicType.ts";

function ForumTopicCard(forumTopic: forumTopicType) {
  const footer = (
    <>
      <Button
        label="View Topic"
        severity="primary"
        icon="pi pi-arrow-right"
        // use link if its not what do we want
        onClick={() => {
          globalThis.location.href = `/forum/${forumTopic.idForumTopic}`;
        }}
      />
    </>
  );

  return (
    <div className="card flex justify-content-center col-4">
      <Card
        title={forumTopic.title}
        footer={footer}
        className="md:w-25rem"
      >
      </Card>
    </div>
  );
}

export { ForumTopicCard };
