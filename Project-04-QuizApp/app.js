const questions = [
  {
    q: 'What is the National Flower of Pakistan ?',
    opts: ['Rose', 'Jasmine', 'Sunflower', 'Tulip'],
    ans: 1,
  },
  {
    q: 'What is the national bird of Pakistan?',
    opts: ['Peacock', 'Sparrow', 'Eagle', ' Chukar Partridge'],
    ans: 3,
  },
  {
    q: 'Which of the Prime Minister in Pakistan complete his Tenure?',
    opts: ['Imran Khan', 'Nawaz Sharif', 'Benzir Bhutto', 'None of the above'],
    ans: 3,
  },
  {
    q: 'Nishan-e-Pakistan (Pakistan highest civilian award) is given to which of the following person from India ?',
    opts: ['Salman Khan', 'Sania Mirza', 'Virat Kohli', 'Morarji Desai'],
    ans: 3,
  },
  { q: 'In which year did World War II end?', opts: ['1943', '1944', '1945', '1946'], ans: 2 },
  {
    q: 'Which of the following Industry earn 42 billion anuually for Pakistan?',
    opts: ['Textile', 'Freelancing', 'Begger', 'Agriculture'],
    ans: 2,
  },
  {
    q: 'In which year Pakistan become nuclear power?',
    opts: ['1999', '1947', '1989', '1998'],
    ans: 3,
  },
  { q: 'Which of the country produce the most football balls?', opts: ['Portugal', 'Argentina', 'Pakistan', 'Brazil'], ans: 2 },
  {
    q: 'Which of the following city is known as City of Lights?',
    opts: ['New York', 'Makkah', 'Karachi', 'New Delhi'],
    ans: 0,
  },
  {
    q: 'How much percentage of Jews are there in the world?',
    opts: ['0.2%', '0.5%', '1%', '2%'],
    ans: 0,
  },
];

const LABELS = ['A', 'B', 'C', 'D'];
const TIME = 20;

let idx, score, timer, answered;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function startQuiz() {
  idx = 0;
  score = 0;
  loadQuestion();
}

function restartQuiz() {
  showScreen('welcome');
}

function loadQuestion() {
  clearInterval(timer);
  answered = false;

  var q = questions[idx];
  document.getElementById('qNum').textContent = idx + 1;
  document.getElementById('scoreVal').textContent = score;
  document.getElementById('progressFill').style.width = (idx / questions.length) * 100 + '%';
  document.getElementById('questionText').textContent = q.q;
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('nextBtn').className = 'btn-next';

  document.getElementById('optionsContainer').innerHTML = q.opts
    .map(function (opt, i) {
      return (
        '<button class="opt" data-index="' +
        i +
        '">' +
        '<span class="opt-letter">' +
        LABELS[i] +
        '</span>' +
        opt +
        '</button>'
      );
    })
    .join('');

  document.querySelectorAll('.opt').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectAnswer(parseInt(btn.getAttribute('data-index')));
    });
  });

  startTimer();
}

function startTimer() {
  var left = TIME;
  updateTimerUI(left);
  timer = setInterval(function () {
    left--;
    updateTimerUI(left);
    if (left <= 0) {
      clearInterval(timer);
      if (!answered) timeUp();
    }
  }, 1000);
}

function updateTimerUI(left) {
  var danger = left <= 5;
  document.getElementById('timerNum').textContent = left;
  document.getElementById('timerNum').className = 'timer-num' + (danger ? ' danger' : '');
  document.getElementById('timerFill').style.width = (left / TIME) * 100 + '%';
  document.getElementById('timerFill').className = 'timer-bar-fill' + (danger ? ' danger' : '');
}

function selectAnswer(chosen) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  var correct = questions[idx].ans;
  var btns = document.querySelectorAll('.opt');
  btns.forEach(function (b) {
    b.disabled = true;
  });

  if (chosen === correct) {
    score++;
    btns[chosen].classList.add('correct');
    showFeedback(true, '✓ Correct! Great job.');
  } else {
    btns[chosen].classList.add('wrong');
    btns[correct].classList.add('reveal');
    showFeedback(false, '✗ Wrong correct answer: ' + questions[idx].opts[correct]);
  }

  document.getElementById('scoreVal').textContent = score;
  document.getElementById('nextBtn').className = 'btn-next show';
}

function timeUp() {
  answered = true;
  var correct = questions[idx].ans;
  document.querySelectorAll('.opt').forEach(function (b) {
    b.disabled = true;
  });
  document.querySelectorAll('.opt')[correct].classList.add('reveal');
  showFeedback(false, "⏱ Time's up answer: " + questions[idx].opts[correct]);
  document.getElementById('nextBtn').className = 'btn-next show';
}

function showFeedback(ok, msg) {
  var fb = document.getElementById('feedback');
  fb.textContent = msg;
  fb.className = 'feedback show ' + (ok ? 'ok' : 'bad');
}

function nextQuestion() {
  idx++;
  if (idx < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('progressFill').style.width = '100%';
  showScreen('result');

  var pct = Math.round((score / questions.length) * 100);
  var grades = [
    { min: 90, emoji: '🏆', title: 'Legendary!', grade: 'A+ Rank Woowww' },
    { min: 70, emoji: '🎉', title: 'Excellent!', grade: 'A Rank Great Work' },
    { min: 50, emoji: '👍', title: 'Good Job!', grade: 'B Rank Solid Effort' },
    { min: 30, emoji: '📚', title: 'Keep Trying', grade: 'C Rank Chalo kuch tu pata hai apko' },
    { min: 0, emoji: '💪', title: 'Needs Work', grade: 'D Rank Parhlo Bhai thora!' },
  ];
  var g = grades.find(function (g) {
    return pct >= g.min;
  });

  document.getElementById('resultEmoji').textContent = g.emoji;
  document.getElementById('resultHeading').textContent = g.title;
  document.getElementById('resultGrade').textContent = g.grade;
  document.getElementById('scoreNum').textContent = score;
  document.getElementById('resCorrect').textContent = score;
  document.getElementById('resWrong').textContent = questions.length - score;
  document.getElementById('resPct').textContent = pct + '%';
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('startBtn').addEventListener('click', function () {
    showScreen('quiz');
    startQuiz();
  });

  document.getElementById('nextBtn').addEventListener('click', function () {
    nextQuestion();
  });

  document.getElementById('restartBtn').addEventListener('click', function () {
    restartQuiz();
  });
});
