import { Card } from "primereact";

function MemberDashbord() {
  return (
    <div className="grid m-1">
      <div className="col-12 md:col-6 lg:col-4 ">
        <Card title="Name + Firstname + Avatar"></Card>
      </div>
      <div className="col-12 md:col-6 lg:col-4">
        <Card title="Email"></Card>
      </div>
      <div className="col-12 md:col-6 lg:col-4">
        <Card title=""></Card>
      </div>
    </div>
  );
}

export default MemberDashbord;
