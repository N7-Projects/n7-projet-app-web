import { useEffect, useState } from "react";
import { MessageType } from "../../types/messageType.ts";
import { Card } from "primereact";

export const StringToHtml = (text: string) => {
  const [html, setHtml] = useState<string>("");
  useEffect(() => {
    setHtml(text);
  }, [html]);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

function MessageCard(mes: MessageType) {
  return (
    <div className="card col-12">
      <Card className="md:w-100rem">
        <p>
          {new Date(mes.dateOfPublication).toLocaleString()} :
        </p>
        {StringToHtml(mes.text)}
      </Card>
    </div>
  );
}

export { MessageCard };
