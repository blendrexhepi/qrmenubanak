import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { RestaurantMenu } from "./pages/RestaurantMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RestaurantMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
