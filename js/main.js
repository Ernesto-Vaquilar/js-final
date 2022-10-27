let selectedDays = [];
const checkboxes = document.getElementsByClassName("btn-check");
const selectionToggle = document.getElementById("selection-toggle");
const randomFlashcardButton = document.getElementById("random-flashcard");

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

for (let i = 0; i <= 11; i++) {
  new DayButton(i);
}

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
      console.log(arr);
      console.log(selectedCard);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  randomDayArray();
}

randomFlashcardButton.addEventListener("click", function () {
  generateFlashcard();
});
