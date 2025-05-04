import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home.tsx";
import Circuits from "./pages/Circuits.tsx";
import Calendar from "./pages/Calendar.tsx";
import Navbar from "./components/Navbar.tsx";
import NewCircuit from "./pages/NewCircuit.tsx";
import Forum from "./pages/Forum/Forum.tsx";
import ForumConsult from "./pages/Forum/ForumConsult.tsx";
import Equipes from "./pages/Teams/Teams.tsx";
import OneTeam from "./pages/Teams/OneTeam.tsx";
import NewTeam from "./pages/Teams/NewTeam.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/subscribe" element={<Home />} />

          <Route path="/circuits">
            <Route index element={<Circuits />} />
            <Route path="new" element={<NewCircuit />} />
            <Route path=":circuit" element={<Home />} />
            <Route path=":circuit/edit" element={<Circuits />} />
          </Route>

          <Route path="/teams">
            <Route index element={<Equipes />} />
            <Route path="new" element={<NewTeam />} />
            <Route path=":teamId" element={<OneTeam />} />
            {/* <Route path=":circuit/edit" element={<Circuits />} /> */}
          </Route>

          <Route path="/calendar">
            <Route index element={<Calendar />} />
          </Route>

          <Route path="/forum">
            <Route index element={<Forum />} />
            <Route path=":topicId" element={<ForumConsult />} />
          </Route>
          <Route path="/login">
            <Route index element={<Login />} />
          </Route>
          <Route path="/register">
            <Route index element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
