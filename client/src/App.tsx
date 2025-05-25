import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home.tsx";
import Circuits from "./pages/Circuits/Circuits.tsx";
import Calendar from "./pages/Calendar.tsx";
import Navbar from "./components/Navbar.tsx";
import NewCircuit from "./pages/Circuits/NewCircuit.tsx";
import Forum from "./pages/Forum/Forum.tsx";
import ForumConsult from "./pages/Forum/ForumConsult.tsx";
import Equipes from "./pages/Teams/Teams.tsx";
import OneTeam from "./pages/Teams/OneTeam.tsx";
import NewTeam from "./pages/Teams/NewTeam.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import OneCircuit from "./pages/Circuits/OneCircuit.tsx";
import EditCircuit from "./pages/Circuits/EditCircuit.tsx";
import EditTeam from "./pages/Teams/EditTeam.tsx";
import MemberDashbord from "./pages/Members/MemberDashboard.tsx";
import OneMember from "./pages/Members/OneMember.tsx";
import AuthProvider from "./middleware/AuthProvider.tsx";
import PrivateRoute from "./middleware/PrivateRoute.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/subscribe" element={<Home />} />

            <Route path="/circuits">
              <Route index element={<Circuits />} />
              <Route path="new" element={<NewCircuit />} />
              <Route path=":circuitId" element={<OneCircuit />} />
              <Route path=":circuitId/edit" element={<EditCircuit />} />
            </Route>

            <Route path="/teams">
              <Route index element={<Equipes />} />
              <Route path="new" element={<NewTeam />} />
              <Route path=":teamId" element={<OneTeam />} />
              <Route path=":teamId/edit" element={<EditTeam />} />
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
            <Route path="/members">
              <Route element={<PrivateRoute />}>
                <Route index element={<MemberDashbord />} />
              </Route>
              <Route path=":memberId" element={<OneMember />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
