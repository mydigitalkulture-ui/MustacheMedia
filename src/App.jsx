import "@/App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/sonner";

const CustomCursor = lazy(() => import("./components/CustomCursor"));

function App() {
  const [enableEnhancedEffects, setEnableEnhancedEffects] = useState(false);

  useEffect(() => {
    const canUseEffects =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setEnableEnhancedEffects(canUseEffects);
  }, []);

  return (
    <div className="App" style={{ cursor: enableEnhancedEffects ? "none" : "auto" }}>
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[rgb(17,17,19)]/95 via-[rgb(17,17,19)]/85 to-[rgb(17,17,19)]" />
      <div className="relative z-[2]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
      {enableEnhancedEffects ? (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      ) : null}
      <Toaster />
    </div>
  );
}

export default App;
