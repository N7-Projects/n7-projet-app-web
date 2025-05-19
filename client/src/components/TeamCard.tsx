import { Button } from "primereact";
import { Card } from "primereact";
import { TeamType } from "../types/teamType.ts";
import { ToggleButton } from "primereact";
import { useState } from "react";

function TeamCard(team: TeamType) {
  const [checked, setChecked] = useState(false);

  const header = (
    <img
      alt="Card"
      src="/usercard.png"
    />
  );
  const footer = (
    <>
      <Button
        label="View Team"
        severity="primary"
        icon="pi pi-search"
        // Use Link if its not what do we want
        onClick={() => {
          globalThis.location.href = `/teams/${team.idRacingTeam}`;
        }}
      />

      <ToggleButton
        onLabel=""
        offLabel=""
        onIcon="pi pi-star-fill"
        offIcon="pi pi-star"
        checked={checked}
        onChange={(e) => setChecked(e.value)}
        className="ml-2"
      />
    </>
  );

  return (
    <div className="card flex justify-content-center col-4">
      <Card
        title={team.nom}
        subTitle={`Classement : ${team.classement}`}
        footer={footer}
        header={header}
        className="md:w-25rem"
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </Card>
    </div>
  );
}

export { TeamCard };
