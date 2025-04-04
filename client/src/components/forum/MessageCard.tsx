import { MessageType } from "../../types/messageType.ts";
import { Card } from "primereact";

function MessageCard(mes: MessageType) {
  return (
    <div>
      <Card>
        <p>
          {mes.text}
        </p>
      </Card>
    </div>
  );
}

export { MessageCard };
