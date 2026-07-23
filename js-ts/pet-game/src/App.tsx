import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const STAT_UPDATE_INTERVAL = 30000;

  const STAT_DECREASE_RATES = {
    hunger: 10,
    happiness: 5,
    energy: 5,
  };

  interface Pet {
    name: string;
    happiness: number;
    hunger: number;
    energy: number;
    species: "Cat";
  }

  enum PetMood {
    HAPPY,
    EXCITED,
    CONTENT,
    SAD,
    TIRED,
    SICK,
    HUNGRY,
  }

  const moodEmojiMap: Record<PetMood, string> = {
    [PetMood.HAPPY]: "😺",
    [PetMood.EXCITED]: "😻",
    [PetMood.CONTENT]: "😸",
    [PetMood.SAD]: "😿",
    [PetMood.TIRED]: "😽",
    [PetMood.SICK]: "🙀",
    [PetMood.HUNGRY]: "😹",
  };

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [petFact, setPetFact] = useState<string>("");
  const [pet, setPet] = useState<Pet>({
    name: "",
    happiness: 100,
    hunger: 0,
    energy: 100,
    species: "Cat",
  });

  const calculatePetMood = () => {
    const { hunger, happiness, energy } = pet;
    if (hunger > 70) return PetMood.HUNGRY;
    if (energy < 30) return PetMood.TIRED;
    if (happiness < 30) return PetMood.SAD;
    if (happiness > 80 && energy > 70) return PetMood.EXCITED;
    if (happiness > 60) return PetMood.HAPPY;
    return PetMood.CONTENT;
  };

  const getStat = (value: number) => {
    if (value >= 70) return "high";
    if (value >= 40) return "medium";
    return "low";
  };

  const getStatValue = (value: number, reverse = false) => getStat(!reverse ? value : 100 - value);

  const submitPetName = () => {
    // stupid, but using controlled input or ref cannot pass tests on freeCodeCamp
    const petName = (document.getElementById("pet-name") as HTMLInputElement).value;
    if (!petName) {
      return;
    }
    setPet((prev) => ({ ...prev, name: petName }));
    setIsGameStarted(true);
  };

  const playPet = () => {
    setPet((prev) => ({
      ...prev,
      energy: Math.max(pet.energy - STAT_DECREASE_RATES.energy, 0),
      happiness: Math.min(pet.happiness + STAT_DECREASE_RATES.happiness, 100),
    }));
  };

  const sleepPet = () => {
    setPet((pet) => ({
      ...pet,
      hunger: Math.min(pet.hunger + STAT_DECREASE_RATES.hunger, 100),
      energy: Math.min(pet.energy + STAT_DECREASE_RATES.energy, 100),
    }));
  };

  const feedPet = () => {
    setPet((pet) => ({
      ...pet,
      hunger: Math.max(pet.hunger - STAT_DECREASE_RATES.hunger, 0),
      energy: Math.min(pet.energy + STAT_DECREASE_RATES.energy, 100),
    }));
  };

  useEffect(() => {
    fetch("https://cat-facts-api.freecodecamp.rocks/api/catfacts/random")
      .then((res) => res.json())
      .then((fact) => setPetFact(fact))
      .catch(() => {
        setPetFact("Sorry, we're not able to retrieve your cat fact right now!");
      });
  }, []);

  useEffect(() => {
    if (!isGameStarted) return;
    const interval = setInterval(() => {
      setPet((pet) => ({
        ...pet,
        happiness: Math.max(pet.happiness - 5, 0),
        hunger: Math.min(pet.hunger + 5, 100),
      }));
    }, STAT_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [isGameStarted]);

  return (
    <main>
      <header>
        <h1>Digital Pet Game</h1>
        <p>Take care of your virtual companion!</p>
      </header>
      {isGameStarted && (
        <>
          <section className="base-container game-container">
            <div className="pet-screen">
              <div className="pet-sprite">{moodEmojiMap[calculatePetMood()]}</div>
              <h2 className="pet-name">{pet.name}</h2>
            </div>
            <div className="pet-buttons">
              <button className="pet-button pet-buttons-left" id="eat-action" onClick={feedPet}>
                EAT
              </button>
              <button className="pet-button pet-buttons-center" id="play-action" onClick={playPet}>
                PLAY
              </button>
              <button className="pet-button pet-buttons-right" id="sleep-action" onClick={sleepPet}>
                SLEEP
              </button>
            </div>
          </section>
          <section className="stats-grid">
            <div className="stat-bar stat">
              <div className="stat-header">
                <div className="stat-label">
                  <span className="stat-icon">🍽️</span>
                  <span className="stat-name">Hunger</span>
                </div>
                <span className="stat-value">{Math.round(pet.hunger)}%</span>
              </div>
              <div className="stat-progress">
                <div
                  className={`stat-fill ${getStatValue(pet.hunger, true)}`}
                  style={{ width: `${pet.hunger}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-bar stat">
              <div className="stat-header">
                <div className="stat-label">
                  <span className="stat-icon">😊</span>
                  <span className="stat-name">Happiness</span>
                </div>
                <span className="stat-value">{Math.round(pet.happiness)}%</span>
              </div>
              <div className="stat-progress">
                <div
                  className={`stat-fill ${getStatValue(pet.happiness)}`}
                  style={{ width: `${pet.happiness}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-bar stat">
              <div className="stat-header">
                <div className="stat-label">
                  <span className="stat-icon">⚡</span>
                  <span className="stat-name">Energy</span>
                </div>
                <span className="stat-value">{Math.round(pet.energy)}%</span>
              </div>
              <div className="stat-progress">
                <div
                  className={`stat-fill ${getStatValue(pet.energy)}`}
                  style={{ width: `${pet.energy}%` }}
                ></div>
              </div>
            </div>
          </section>
        </>
      )}
      <section className="base-container info-panel">
        {!isGameStarted ? (
          <form className="start-questions">
            <label htmlFor="pet-name">What is your pet's name?</label>
            <input id="pet-name" name="pet-name" required pattern="[A-Za-z0-9]{1,20}" />
            <button id="set-name-btn" onClick={submitPetName}>
              Start Game
            </button>
          </form>
        ) : (
          <div id="hud">
            <p id="pet-species">Species: {pet.species}</p>
            <p id="pet-fact">
              <b>Pet Fact:</b> {petFact}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
