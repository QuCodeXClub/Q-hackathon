import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sponsors from "./pages/Sponsors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;