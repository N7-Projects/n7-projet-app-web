import Navbar from "../components/Navbar.tsx";
import "./Home.scss";

// Should be the page for displaying basic info of the association
function Home() {
  return (
    <>
      <main>
        <div className="flex justify-content-center flex-column align-items-center">
          <h1 className="hagi-title lg:text-8xl">
            HAGI MET TA CEINTURE
          </h1>
        </div>
      </main>
    </>
  );
}

export default Home;
