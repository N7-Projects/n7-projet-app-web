import { Card } from "primereact";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { MemberType } from "../../types/memberType.ts";

function MemberDashbord() {
  const { memberId } = useParams();

  const _queryClient = useQueryClient();

  const token = localStorage.getItem("jwt");

  const { data, isPending, isError, error } = useQuery({
    queryKey: [{ member: "one-member", memberId: memberId }],
    queryFn: async () => {
      if (!token) {
        return Promise.reject(
          new Error("You must be connected to see this page"),
        );
      }
      const route: string = `/api/members/${memberId}`;
      const response = await fetch(route);

      console.log("member Getted ! ");
      console.log(response.status);
      const member = await response.json() as MemberType;

      console.log(member);

      return member;
    },
  });

  if (isPending) {
    return <h3>Pending...</h3>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <div className="grid m-1">
      <div className="col-12 md:col-6 lg:col-4 ">
        <Card title="Name + Firstname + Avatar"></Card>
      </div>
      <div className="col-12 md:col-6 lg:col-4">
        <Card title="Email"></Card>
      </div>
      <div className="col-12 md:col-6 lg:col-4">
        <Card title="Random info ?"></Card>
      </div>
      <div className="col-12 lg:col-6">
        <Card title="Vehicules"></Card>
      </div>
      <div className="col-12 lg:col-6">
        <Card title="Teams"></Card>
      </div>
    </div>
  );
}

export default MemberDashbord;
