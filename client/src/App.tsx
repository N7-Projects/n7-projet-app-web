import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home.tsx";
import Circuits from "./pages/Circuits.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/subscribe" element={<Home />} />

          <Route path="/circuits">
            <Route index element={<Circuits />} />
            <Route path=":circuit" element={<Home />} />
            <Route path=":circuit/edit" element={<Circuits />} />
          </Route>

          <Route path="/calendar">
            <Route index element={<Home />} />
            <Route path="edit" element={<Home />} />
          </Route>

          <Route path="/forum">
            <Route index element={<Home />} />
            <Route path=":topicId" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
