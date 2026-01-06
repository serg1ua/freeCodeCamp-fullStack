const powerControlEl = document.querySelector(".power-control");
const padBankEl = document.getElementById("pad-bank");
const displayEl = document.getElementById("display");
const volumeEl = document.querySelector('input[type="range"]');

let volume = volumeEl.value;
let power = true;

const audioTracks = [
  {
    id: "Q",
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-1.mp3",
  },
  {
    id: "W",
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-2.mp3",
  },
  {
    id: "E",
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-3.mp3",
  },
  {
    id: "A",
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-4_1.mp3",
  },
  {
    id: "S",
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3",
  },
  {
    id: "D",
    src: "https://cdn.freecodecamp.org/curriculum/drum/Dsc_Oh.mp3",
  },
  {
    id: "Z",
    src: "https://cdn.freecodecamp.org/curriculum/drum/Kick_n_Hat.mp3",
  },
  {
    id: "X",
    src: "https://cdn.freecodecamp.org/curriculum/drum/RP4_KICK_1.mp3",
  },
  {
    id: "C",
    src: "https://cdn.freecodecamp.org/curriculum/drum/Cev_H2.mp3",
  },
];

padBankEl.innerHTML = audioTracks.reduce((acc, curr) => {
  const { id, src } = curr;
  acc += `<div class="drum-pad">${id}<audio id="${id}" class="clip" src="${src}"></audio></div>`;
  return acc;
}, "");

function playAudio(audio) {
  if (!navigator.onLine) {
    displayEl.innerHTML = "<span style='color: red;'>You're offline!</span>";
    return;
  }
  audio.volume = volume;
  audio.parentElement.classList.add("active");
  audio.play();

  audio.addEventListener("ended", () => {
    audio.parentElement.classList.remove("active");
  });
  const audioName = audio.src
    .split("/")
    [audio.src.split("/").length - 1].split(".")[0]
    .replace(/[-_]/g, " ");
  displayEl.textContent = audioName;
}

document.querySelectorAll(".drum-pad").forEach((key) => {
  key.addEventListener("click", (e) => {
    const audio = key.querySelector(".clip");
    if (audio && power) {
      playAudio(audio);
    }
  });
});

document.addEventListener("keydown", (e) => {
  const audio = document.getElementById(e.key.toUpperCase());
  if (audio && power) {
    playAudio(audio);
  }
});

powerControlEl.addEventListener("click", (e) => {
  power = !power;
  powerControlEl.childNodes[0].classList.toggle("power-on");
});

volumeEl.addEventListener("change", (e) => {
  volume = volumeEl.value;
});
