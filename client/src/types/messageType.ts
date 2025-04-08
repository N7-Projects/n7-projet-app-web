import { forumTopicType } from "./forumTopicType.ts";

export type MessageType = {
  idMessage: number;
  dateOfPublication: Date;
  subject: forumTopicType;
  text: string;
};
