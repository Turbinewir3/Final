const identitySteps = [
  {
    label: "Select your AGE group:",
    options: ["Young", "Middle-aged", "Older"]
  },
  {
    label: "Select your EDUCATION level:",
    options: ["No degree", "High school", "College", "Advanced"]
  },
  {
    label: "Select your view on AUTHORITY:",
    options: ["Skeptical", "Neutral", "Respectful"]
  }
];

const opposedSteps = [
  {
    label: "You feel most opposed to:",
    options: ["Rich elites", "Conspiracy theorists", "The uneducated", "The overly educated", "Boomers", "Zoomers"]
  }
];

let currentStep = 0;
let identitySelections = [];
let opposedSelections = [];

function startIdentityInput() {
  currentStep = 0;
  identitySelections = [];
  opposedSelections = [];
  showStep();
}

function showStep() {
  const container = document.getElementById("question-container");
  container.innerHTML = "";

  let step, group;
  if (currentStep < identitySteps.length) {
    step = identitySteps[currentStep];
    group = identitySelections;
  } else if (currentStep < identitySteps.length + opposedSteps.length) {
    step = opposedSteps[currentStep - identitySteps.length];
    group = opposedSelections;
  } else {
    finishSelections();
    return;
  }

  const label = document.createElement("h3");
  label.innerText = step.label;
  container.appendChild(label);

  step.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.className = "option-button";
    btn.onclick = () => {
      group.push(option);
      currentStep++;
      showStep();
    };
    container.appendChild(btn);
  });
}

function finishSelections() {
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <h3>Your identity:</h3>
    <p>${identitySelections.join(", ")}</p>
    <h3>You're opposed to:</h3>
    <p>${opposedSelections.join(", ")}</p>
    <button onclick="startVirtueTest()">Start Virtue Test</button>
  `;
}

// Placeholder for actual test flow
function startVirtueTest() {
  const container = document.getElementById("question-container");
  container.innerHTML = "<p>Virtue test coming next...</p>";
}

// Start flow on page load
window.onload = () => {
  startIdentityInput();
};
