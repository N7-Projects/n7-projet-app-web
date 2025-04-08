import { MessageType } from "../../types/messageType.ts";
import { Card } from "primereact";

function MessageCard(mes: MessageType) {
  return (
    <div className="card flex justify-content-center col-12">
      <Card className="md:w-80rem">
        <p>
          {new Date(mes.dateOfPublication).toLocaleString()} : {mes.text}
        </p>
      </Card>
    </div>
  );
}

export { MessageCard };
