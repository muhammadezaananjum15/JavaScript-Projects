const lengthInput = document.getElementById('length');
const passwordBox = document.getElementById('password');
const msg = document.getElementById('strength-msg');
function updateLength() {
  document.getElementById('len-num').textContent = lengthInput.value;
  generatePassword();
}
function toggleBox(id, checked) {
  document.getElementById(id).classList.toggle('active', checked);
}

document.getElementById('upper').addEventListener('change', function () {
  toggleBox('box-upper', this.checked);
  generatePassword();
});

document.getElementById('lower').addEventListener('change', function () {
  toggleBox('box-lower', this.checked);
  generatePassword();
});

document.getElementById('nums').addEventListener('change', function () {
  toggleBox('box-nums', this.checked);
  generatePassword();
});

document.getElementById('syms').addEventListener('change', function () {
  toggleBox('box-syms', this.checked);
  generatePassword();
});

function updateStrengthBars(level) {
  const fillClass = ['', 'fill-weak', 'fill-ok', 'fill-good', 'fill-good'];
  for (let i = 1; i <= 4; i++) {
    const bar = document.getElementById('bar' + i);
    bar.className = 'strength-bar';
    if (i <= level) bar.classList.add(fillClass[level]);
  }
}
function generatePassword() {
  let chars = '';

  if (document.getElementById('upper').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (document.getElementById('lower').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (document.getElementById('nums').checked) chars += '0123456789';
  if (document.getElementById('syms').checked) chars += '!@#$%^&*()';

  if (chars === '') {
    passwordBox.textContent = 'Select at least one option';
    msg.textContent = '';
    updateStrengthBars(0);
    return;
  }

  const length = parseInt(lengthInput.value, 10);
  let password = '';

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordBox.textContent = password;

  if (length < 8) {
    msg.textContent = 'Too short. Not safe.';
    updateStrengthBars(1);
  } else if (length < 12) {
    msg.textContent = 'Okay. Could be longer.';
    updateStrengthBars(2);
  } else if (length < 20) {
    msg.textContent = 'Good. Hard to crack.';
    updateStrengthBars(3);
  } else {
    msg.textContent = 'Very strong. You are safe.';
    updateStrengthBars(4);
  }
}
function copyPassword() {
  const pwd = passwordBox.textContent;
  if (pwd === 'Select at least one option') return;

  navigator.clipboard.writeText(pwd).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  });
}
generatePassword();
