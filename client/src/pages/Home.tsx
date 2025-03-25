import Navbar from "../components/Navbar.tsx";
import "./Home.scss";

function Home() {
  //   const { data, isPending, isError, error } = useQuery({
  //     queryKey: [{ location: pathLoc }],
  //     queryFn: async () => {
  //       const route: string = "/api" + pathLoc;
  //       console.log(route);
  //       const res: Response = await fetch(route);
  //       if (res.status == 302) {
  //         console.warn("REDIRECTED");
  //         const error = new Error("Redirection vers login car pas logged");
  //         (error as any).statusCode = res.status; // Ajoutez le code d'état à l'erreur
  //         throw error;
  //       }
  //       const dossiers: Dossier[] = await res.json() as Dossier[];
  //       return dossiers;
  //     },
  //   });

  return (
    <>
      <section className="home">
        <Navbar />
      </section>
    </>
  );
}

export default Home;
