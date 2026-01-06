import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <button className="nav-btn" onClick={() => navigate(ROUTES.CURRENCY_CONVERTER)}>
        Currency Converter
      </button>
      <button className="nav-btn" onClick={() => navigate(ROUTES.TIC_TAC_TOE)}>
        Tic-Tac-Toe Game
      </button>
    </div>
  );
}

export default Home;
