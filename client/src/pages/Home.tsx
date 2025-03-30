import Navbar from "../components/Navbar.tsx";
import "./Home.scss";

// Should be the page for displaying basic info of the association
function Home() {
  return (
    <>
      <section className="home">
        <Navbar />
      </section>
    </>
  );
}

export default Home;
