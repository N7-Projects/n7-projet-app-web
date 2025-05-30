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
import { PrivateRoute, ProtectedEditTeam } from "./middleware/PrivateRoute.tsx";
import NotFound from "./components/NotFound.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/subscribe" element={<Home />} />

            <Route path="/circuits">
              <Route index element={<Circuits />} />
              <Route path=":circuitId" element={<OneCircuit />} />
              <Route element={<PrivateRoute />}>
                <Route path="new" element={<NewCircuit />} />
                <Route path=":circuitId/edit" element={<EditCircuit />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/teams">
              <Route index element={<Equipes />} />
              <Route path=":teamId" element={<OneTeam />} />
              <Route element={<ProtectedEditTeam />}>
                <Route path=":teamId/edit" element={<EditTeam />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="new" element={<NewTeam />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/calendar">
              <Route index element={<Calendar />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/forum">
              <Route index element={<Forum />} />
              <Route path=":topicId" element={<ForumConsult />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/login">
              <Route index element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/register">
              <Route index element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/members">
              <Route element={<PrivateRoute />}>
                <Route index element={<MemberDashbord />} />
              </Route>
              <Route path=":memberId" element={<OneMember />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
