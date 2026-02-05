import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MenuPage from "./pages/MenuPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
