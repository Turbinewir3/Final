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

  const label = document.createElement("h2");
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
    <h2>Your Selected Identity</h2>
    <p><strong>I am:</strong> ${identitySelections.join(", ")}</p>
    <p><strong>Opposed to:</strong> ${opposedSelections.join(", ")}</p>
    <button onclick="startVirtueTest()">Start Virtue Test</button>
  `;
}

function startVirtueTest() {
  const testQuestions = [
    {
      question: "Should people respect elders even if the elders hold outdated or offensive views?",
      answers: [
        { text: "Yes, respect is important regardless", virtue: 1 },
        { text: "No, outdated views should be challenged", virtue: 0 },
        { text: "Depends on context", virtue: 0.5 }
      ]
    },
    {
      question: "Is it okay to mock someone for not having a college degree if they hold political power?",
      answers: [
        { text: "Yes, it's fair criticism", virtue: 0 },
        { text: "No, education doesn't equal wisdom", virtue: 1 },
        { text: "Only if they weaponize their ignorance", virtue: 0.5 }
      ]
    },
    {
      question: "Should you trust data or lived experience more?",
      answers: [
        { text: "Data", virtue: 1 },
        { text: "Lived experience", virtue: 0 },
        { text: "Both must be weighed", virtue: 0.5 }
      ]
    }
  ];

  let currentQuestion = 0;
  let portrayedScore = 0;

  function showVirtueQuestion() {
    const q = testQuestions[currentQuestion];
    const container = document.getElementById("question-container");
    container.innerHTML = `<h2>${q.question}</h2>`;

    q.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.className = "option-button";
      btn.innerText = answer.text;
      btn.onclick = () => {
        portrayedScore += answer.virtue;
        currentQuestion++;
        if (currentQuestion < testQuestions.length) {
          showVirtueQuestion();
        } else {
          showResults();
        }
      };
      container.appendChild(btn);
    });
  }

  function showResults() {
    const maxScore = testQuestions.length;
    const portrayed = (portrayedScore / maxScore) * 100;

    const revealedPenalty = (identitySelections.includes("Young") && opposedSelections.includes("Old")) ? 0.9 :
                            (identitySelections.includes("Pro-authority") && opposedSelections.includes("High school")) ? 0.85 : 1;

    const revealed = Math.round(portrayed * revealedPenalty);

    const container = document.getElementById("question-container");
    container.innerHTML = `
      <h2>Your Results</h2>
      <p><strong>Portrayed Virtue Score:</strong> ${Math.round(portrayed)}%</p>
      <p><strong>Revealed Virtue Score:</strong> ${revealed}%</p>
      <h3>Reflection Prompt:</h3>
      <p>How do your beliefs shift when identity enters the equation? Would your answers stay the same if you were the person you oppose?</p>
      <button onclick="startIdentityInput()">Restart</button>
    `;
  }

  showVirtueQuestion();
}
