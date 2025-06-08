const identitySelections = [];
const opposedSelections = [];

const identityOptions = [
  "Old", "Young", "Educated", "Uneducated", "Religious", "Secular"
];

const opposedOptions = [
  "Old", "Young", "Educated", "Uneducated", "Religious", "Secular"
];

function startIdentityInput() {
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <h2>Select Your Identity</h2>
    <p>I am:</p>
  `;

  identityOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      identitySelections.push(option);
      btn.disabled = true;
    };
    container.appendChild(btn);
  });

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.onclick = () => askOpposedInput();
  container.appendChild(document.createElement("br"));
  container.appendChild(nextBtn);
}

function askOpposedInput() {
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <h2>Who Are You Opposed To?</h2>
    <p>Opposed to:</p>
  `;

  opposedOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      opposedSelections.push(option);
      btn.disabled = true;
    };
    container.appendChild(btn);
  });

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.onclick = () => finishSelections();
  container.appendChild(document.createElement("br"));
  container.appendChild(nextBtn);
}

function finishSelections() {
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <h2>Your Selected Identity</h2>
    <p><strong>I am:</strong> ${identitySelections.join(", ")}</p>
    <p><strong>Opposed to:</strong> ${opposedSelections.join(", ")}</p>
    <button onclick="startVirtueTest()">Start Virtue Test</button>
  `;
}

function startVirtueTest() {
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <h2>Virtue Test Begins</h2>
    <p>Question 1: If someone from the group you're opposed to needed help, would you help them?</p>
    <button onclick="showResult('yes')">Yes</button>
    <button onclick="showResult('no')">No</button>
  `;
}

function showResult(answer) {
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <h2>Result</h2>
    <p>You answered: ${answer.toUpperCase()}</p>
    <p>This is just the beginning. More virtue challenges coming soon!</p>
  `;
}

window.onload = () => {
  startIdentityInput();
};
