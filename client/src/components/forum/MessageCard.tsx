import { MessageType } from "../../types/messageType.ts";
import { Card } from "primereact";

function MessageCard(mes: MessageType) {
  return (
    <>
      <div className="card col-12">
        <Card className="md:w-100rem">
          <p className="m-0">
            {new Date(mes.dateOfPublication).toLocaleString()} :
          </p>
          <div
            className="m-0"
            dangerouslySetInnerHTML={{ __html: mes.text }}
          >
          </div>
        </Card>
      </div>
    </>
  );
}

export { MessageCard };
