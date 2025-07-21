const display = document.getElementById('display');
let currentInput = '';

function updateDisplay(value) {
  display.textContent = value || '0';
}

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');

    if (action === 'clear') {
      currentInput = '';
    } else if (action === 'delete') {
      currentInput = currentInput.slice(0, -1);
    } else if (action === '=') {
      try {
        currentInput = eval(currentInput).toString();
      } catch {
        currentInput = 'Error';
      }
    } else {
      if (currentInput === 'Error') currentInput = '';
      currentInput += action;
    }

    updateDisplay(currentInput);
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const validKeys = '0123456789+-*/.=';
  if (validKeys.includes(e.key)) {
    if (currentInput === 'Error') currentInput = '';
    if (e.key === '=') {
      try {
        currentInput = eval(currentInput).toString();
      } catch {
        currentInput = 'Error';
      }
    } else {
      currentInput += e.key;
    }
    updateDisplay(currentInput);
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (e.key === 'Escape') {
    currentInput = '';
    updateDisplay(currentInput);
  }
});
