import "@/App.css";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[rgb(17,17,19)]/95 via-[rgb(17,17,19)]/85 to-[rgb(17,17,19)]" />
      <div className="relative z-[2]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
