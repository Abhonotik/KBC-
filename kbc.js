let questionsSet1 = [
    {
        question: "What is the only even prime number?",
        options: ["1", "2", "0", "4"],
        correct: 1
    },
    {
        question: "Which of the following countries is the largest producer of coffee in the world?",
        options: ["India", "Colombia", "Brazil", "Vietnam"],
        correct: 2
    },
    {
        question: "In computer science, what does the acronym 'DNS' stand for?",
        options: ["Data Network Service", "Domain Name System", "Digital Network Security", "Dynamic Name Server"],
        correct: 1
    },
    {
        question: "Which mathematical conjecture remains unsolved: every even number greater than 2 is the sum of two primes?",
        options: ["Fermat's Last Theorem", "Goldbach's Conjecture", "Riemann Hypothesis", "Collatz Conjecture"],
        correct: 1
    },
    {
        question: "Which of the following planets has the highest number of moons?",
        options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        correct: 1
    },
    {
        question: "Murgi pehle aayi ki anda?",
        options:["Pata nhi","Murgi","Anda","Saath mein"],
        correct: 3
    },
    {
        question: "What is the theme for Chemtrek-25?",
        options: ["Beyond Bonds & Boundaries","Pata nhi","Within the Chem-Mystery","Chhod Yaar"],
        correct: 0
    },
    {
        question: "Who is the CP of Chemtrek-25?",
        options: ["Uzair","Bhoomika","Veena","Ronit"],
        correct: 2
    },
    {
        question: "How many will be conducted on D-days?",
        options: ["4","8","3","5"],
        correct: 1
    },
    {
        question:"Who are the Heads of Department CFA?",
        options: ["Dhruvi & Manali","Anshu & Nikita","Uzair & Veena","Somraj & Nishant"],
        correct:1
    }
    // Add more questions as needed to reach 10
];

let questions = shuffleArray([...questionsSet1]);
let timerElement = document.getElementById('timer');
let questionElement = document.getElementById('question');
let optionsElement = document.getElementById('options');
let submitButton = document.getElementById('submit-btn');

let timeLeft = 30;
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let timerInterval = null;

window.onload = function () {
    loadQuestion();
};

// Shuffle questions array for randomness
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    if (currentQuestionIndex < 10) { // Adjusted to show 10 questions
        optionsElement.innerHTML = "";
        questionElement.textContent = questions[currentQuestionIndex].question;
        submitButton.disabled = true;
        selectedOptionIndex = null;

        questions[currentQuestionIndex].options.forEach((option, index) => {
            let optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
            optionDiv.onclick = () => selectOption(optionDiv, index);
            optionsElement.appendChild(optionDiv);
        });

        resetTimer();
    } else {
        redirectToThankYouPage();
    }
}

function selectOption(optionDiv, index) {
    Array.from(optionsElement.children).forEach(option => {
        option.classList.remove('selected');
    });
    optionDiv.classList.add('selected');
    selectedOptionIndex = index;
    submitButton.disabled = false;
}

submitButton.addEventListener('click', function () {
    submitButton.disabled = true;
    clearInterval(timerInterval);

    if (selectedOptionIndex !== null) {
        const correctIndex = questions[currentQuestionIndex].correct;
        Array.from(optionsElement.children).forEach((option, index) => {
            option.onclick = null;
            if (index === correctIndex) {
                option.classList.add('correct');
            } else if (index === selectedOptionIndex) {
                option.classList.add('wrong');
            }
        });

        if (selectedOptionIndex === correctIndex) {
            score += 5;
        } else {
            score -= 1;
        }

        setTimeout(() => {
            currentQuestionIndex++;
            resetButton();
            loadQuestion();
        }, 1000);
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    startTimer();
}

function handleTimeOut() {
    currentQuestionIndex++;
    resetButton();
    loadQuestion();
}

function resetButton() {
    submitButton.disabled = true;
    selectedOptionIndex = null;
}

function redirectToThankYouPage() {
    localStorage.setItem('score', score);
    const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
    updateLeaderboard(userId, score); // Update leaderboard with userId and score
    window.location.href = "thankyou.html";
}

function updateLeaderboard(userId, score) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Add the new score to the leaderboard
    leaderboard.push({ userId, score });

    // Sort leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // Limit the leaderboard to the top 15 players
    if (leaderboard.length > 15) {
        leaderboard = leaderboard.slice(0, 15);
    }

    // Save the updated leaderboard back to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}
