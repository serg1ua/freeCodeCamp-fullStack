import "./style.css";

const flashcard = document.querySelector<HTMLElement>("#flashcard");
const deleteBtn = document.querySelector<HTMLButtonElement>("#delete-btn");
const cardDisplay = document.querySelector<HTMLElement>("#current-card");
const cardButtonsContainer = document.querySelector("#cards-list");
const frontInput = document.querySelector("#front-text") as HTMLInputElement;
const backInput = document.querySelector("#back-text") as HTMLInputElement;
const formEl = document.querySelector("#entry-form") as HTMLFormElement;

interface FlashCard {
  questionText: string;
  questionAnswer: string;
}

let currentCardIndex = -1;
let currentCards: FlashCard[] = [];

class InvalidUserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUserInputError";
  }
}

function refresh() {
  if (currentCards.length === 0 || currentCardIndex < 0) {
    cardDisplay.querySelector(".card-front").textContent = "";
    cardDisplay.querySelector(".card-back").textContent = "";
    return;
  }
  const card = currentCards[currentCardIndex];
  cardDisplay.querySelector(".card-front").textContent = card.questionText;
  cardDisplay.querySelector(".card-back").textContent = card.questionAnswer;
  Array.from(cardButtonsContainer.children).forEach((child, i) => {
    if (i === currentCardIndex) {
      child.classList.add("selected");
    } else {
      child.classList.remove("selected");
    }
  });
}

function createCardButton(questionText: string, index: number) {
  const btn = document.createElement("button");
  btn.innerText = questionText.length > 20 ? questionText.slice(0, 20) + "..." : questionText;
  btn.onclick = () => {
    currentCardIndex = index;
    refresh();
  };
  return btn;
}

function uploadNewCard() {
  try {
    const questionText = frontInput.value.trim();
    const questionAnswer = backInput.value.trim();
    if (!questionText) {
      throw new InvalidUserInputError("Front text cannot be empty.");
    }
    if (!questionAnswer) {
      throw new InvalidUserInputError("Back text cannot be empty.");
    }
    const newCard = {
      questionText,
      questionAnswer,
    };
    currentCards.push(newCard);
    const newIndex = currentCards.length - 1;
    const cardBtn = createCardButton(questionText, newIndex);
    cardButtonsContainer.appendChild(cardBtn);
    currentCardIndex = newIndex;
    refresh();
    frontInput.value = "";
    backInput.value = "";
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

function deleteCard() {
  if (currentCardIndex < 0 || currentCards.length === 0) return;
  currentCards.splice(currentCardIndex, 1);
  const btnToRemove = cardButtonsContainer.children[currentCardIndex];
  if (btnToRemove) {
    cardButtonsContainer.removeChild(btnToRemove);
  }
  if (currentCards.length === 0) {
    currentCardIndex = -1;
    refresh();
    return;
  }
  currentCardIndex = Math.max(0, currentCardIndex - 1);
  Array.from(cardButtonsContainer.children).forEach((child, i) => {
    const button = child as HTMLElement;
    button.onclick = () => {
      currentCardIndex = i;
      refresh();
    };
  });
  refresh();
}

flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

formEl.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  uploadNewCard();
});

deleteBtn.addEventListener("click", deleteCard);

document.addEventListener("DOMContentLoaded", () => {
  frontInput.value = "What is the capital of France?";
  backInput.value = "Paris";
  uploadNewCard();
});
