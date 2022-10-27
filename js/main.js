let selectedDays = [];
const checkboxes = document.getElementsByClassName("btn-check");
const selectionToggle = document.getElementById("selection-toggle");
const randomFlashcardButton = document.getElementById("random-flashcard");
const flashcard = document.getElementById("flashcard");

// Flips the Flashcard
flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("isFlipped");
});

class DayButton {
  constructor(day) {
    const div = document.createElement("div");
    div.classList.add("form-check", "form-check-inline");

    const input = document.createElement("input");
    input.id = `day-${day}`;
    input.value = day;
    input.type = "checkbox";
    input.checked = true;
    input.classList.add("btn-check");

    const label = document.createElement("label");
    label.innerText = `Day ${day + 1}`;
    label.setAttribute("for", `day-${day}`);
    label.classList.add("btn", "btn-outline-primary", "my-1");

    div.append(input, label);
    document.getElementById("day-buttons-container").append(div);
  }
}

// Creates Buttons for the 12 Days
for (let i = 0; i <= 11; i++) {
  new DayButton(i);
}

// Connects switch to all the day buttons to toggle on/off
selectionToggle.addEventListener("click", function () {
  for (let i = 0; i < checkboxes.length; i++) {
    if (selectionToggle.checked == true) {
      checkboxes[i].checked = true;
    } else {
      checkboxes[i].checked = false;
    }
  }
});

function generateFlashcard() {
  selectedDays = [];
  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      selectedDays.splice(
        parseInt(checkbox.value),
        0,
        parseInt(checkbox.value)
      );
    }
  }

  const randomDay =
    selectedDays[Math.floor(Math.random() * selectedDays.length)];

  const randomDayArray = async () => {
    try {
      const response = await fetch("./json/flashcard-api.json");
      const data = await response.json();
      const arr = data[randomDay];
      const selectedCard = arr[Math.floor(Math.random() * arr.length)];

      document.getElementById("flashcard-title").innerHTML = `Day ${
        randomDay + 1
      }:`;

      document.getElementById(
        "question"
      ).innerHTML = `${selectedCard.question}`;

      document.getElementById("answer").innerHTML = `${selectedCard.answer}`;
    } catch (e) {
      console.log("Error:", e);
      document.getElementById("flashcard-title").innerHTML = `Error:`;
      document.getElementById("question").innerHTML =
        "Please make a selection above";
      document.getElementById("answer").innerHTML =
        "Please make a selection above";
    }
  };
  randomDayArray();
}

randomFlashcardButton.addEventListener("click", function () {
  flashcard.classList.remove("isFlipped");
  generateFlashcard();
});
