document.getElementById('start-quiz').addEventListener('click', startQuiz);

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Marking Language"],
        answer: 0
    },
    {
        question: "Which HTML element is used for the largest heading?",
        options: ["<heading>", "<h6>", "<head>", "<h1>"],
        answer: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        answer: 2
    },
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        options: ["At the end of the document", "In the <body> section", "In the <head> section", "At the beginning of the document"],
        answer: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<javascript>", "<script>", "<scripting>"],
        answer: 2
    }
];

function startQuiz() {
    document.getElementById('initial-screen').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = questionData.question;
    document.getElementById('label1').innerText = questionData.options[0];
    document.getElementById('label2').innerText = questionData.options[1];
    document.getElementById('label3').innerText = questionData.options[2];
    document.getElementById('label4').innerText = questionData.options[3];
}

document.getElementById('submit-answer').addEventListener('click', checkAnswer);

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        const questionData = questions[currentQuestionIndex];
        if (answerIndex === questionData.answer) {
            score++;
            document.getElementById('feedback').innerText = 'Correct!';
        } else {
            document.getElementById('feedback').innerText = 'Incorrect!';
        }
        document.getElementById('score-display').innerText = `Score: ${score}`;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    } else {
        alert('Please select an answer');
    }
}

function startTimer() {
    timeLeft = 30;
    document.getElementById('time').innerText = timeLeft;
    timer = setInterval(function () {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz-container').innerHTML = `<p>Quiz Over! Your final score is ${score}.</p>`;
}
