import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/sonner";
import Cubes from "./components/Cubes";
import CustomCursor from "./components/CustomCursor";
import CanvasCursor from "./components/ui/canvas-cursor";

function App() {
  return (
    <div className="App" style={{ cursor: 'none' }}>
      <Cubes
        gridSize={14}
        maxAngle={25}
        radius={4}
        faceColor="transparent"
        borderStyle="1px solid rgba(218,255,1,0.1)"
        rippleOnClick={true}
        rippleColor="rgba(218,255,1,0.25)"
        autoAnimate={true}
        fullScreen={true}
      />
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[rgb(17,17,19)]/95 via-[rgb(17,17,19)]/85 to-[rgb(17,17,19)]" />
      <div className="relative z-[2]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
      <CustomCursor />
      <CanvasCursor />
      <Toaster />
    </div>
  );
}

export default App;
