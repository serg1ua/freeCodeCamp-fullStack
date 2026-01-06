import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Converter from "./pages/Converter/converter";
import Home from "./pages/Home/Home";
import TicTacToe from "./TicTacToe/TicTacToe";
import { ROUTES } from "../routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CURRENCY_CONVERTER} element={<Converter />} />
        <Route path={ROUTES.TIC_TAC_TOE} element={<TicTacToe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
