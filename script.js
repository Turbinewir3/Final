const identitySteps = [
  {
    label: "Step 1: How old are you?",
    options: ["Young", "Middle-aged", "Older"]
  },
  {
    label: "Step 2: Your education level?",
    options: ["No degree", "High school", "College", "Advanced degree"]
  },
  {
    label: "Step 3: Your view on authority?",
    options: ["Skeptical", "Neutral", "Respectful"]
  }
];

const opposedSteps = [
  {
    label: "Step 4: Who do you feel most opposed to?",
    options: ["The rich", "The poor", "Elites", "Ignorant people", "Religious", "Secular"]
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

  let stepData, storageArray;
  if (currentStep < identitySteps.length) {
    stepData = identitySteps[currentStep];
    storageArray = identitySelections;
  } else if (currentStep < identitySteps.length + opposedSteps.length) {
    stepData = opposedSteps[currentStep - identitySteps.length];
    storageArray = opposedSelections;
  } else {
    finishSelections();
    return;
  }

  const label = document.createElement("h3");
  label.innerText = stepData.label;
  container.appendChild(label);

  stepData.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-button";
    btn.innerText = option;
    btn.onclick = () => {
      storageArray.push(option);
      currentStep++;
      showStep();
    };
    container.appendChild(btn);
  });
}

function finishSelections() {
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <h3>You identified as:</h3>
    <p>${identitySelections.join(", ")}</p>
    <h3>You are opposed to:</h3>
    <p>${opposedSelections.join(", ")}</p>
    <button onclick="startVirtueTest()">Start Virtue Test</button>
  `;
}

function startVirtueTest() {
  const container = document.getElementById("question-container");
  container.innerHTML = `<p>Loading virtue test based on your profile...</p>`;
}

// Load on page ready
window.onload = () => {
  startIdentityInput();
};
