const selectedDays = [];
const dayButtons = document.getElementsByClassName("btn-check");
const selectionToggle = document.getElementById("selection-toggle");

class DayButton {
  constructor(day) {
    const div = document.createElement("div");
    div.classList.add("form-check", "form-check-inline");

    const input = document.createElement("input");
    input.id = `day-${day}`;
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
  for (let i = 0; i < dayButtons.length; i++) {
    if (selectionToggle.checked == true) {
      dayButtons[i].checked = true;
    } else {
      dayButtons[i].checked = false;
    }
  }
});



console.log(selectedDays);
