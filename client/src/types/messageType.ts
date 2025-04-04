import { forumTopicType } from "./forumTopicType.ts";

export type MessageType = {
  id: number;
  dateOfPublication: Date;
  subject: forumTopicType;
  text: string;
};
