import { useState } from "react";
import "./Home.css";

function Home() {
  const [count, setCount] = useState(0);

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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React check</h1>
      <div className="card">
        <button
          type="button"
          onClick={() => setCount((count: number) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Home;
