const display = document.getElementById('display');

function addToInput(val) {
  display.value += val;
}

function clearInput() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function calculate() {
  let input = display.value;

  input = input.replace(/sin\(([^)]+)\)/g, 'sin_deg($1)');
  input = input.replace(/cos\(([^)]+)\)/g, 'cos_deg($1)');
  input = input.replace(/tan\(([^)]+)\)/g, 'tan_deg($1)');

  input = input.replace(/exp\(/g, 'exp(');
  input = input.replace(/log10\(/g, 'log10(');
  input = input.replace(/ln\(/g, 'log(');
  input = input.replace(/sqrt\(/g, 'sqrt(');
  input = input.replace(/pi/g, 'pi');
  input = input.replace(/e/g, 'e');

  try {
    display.value = math.evaluate(input, {
      sin_deg: (x) => Math.sin(degToRad(x)),
      cos_deg: (x) => Math.cos(degToRad(x)),
      tan_deg: (x) => Math.tan(degToRad(x)),
      exp: Math.exp,
      log10: Math.log10,
      log: Math.log,
      sqrt: Math.sqrt,
      pi: Math.PI,
      e: Math.E
    });
  } catch (error) {
    display.value = "Error";
    setTimeout(() => display.value = "", 2000);
  }
}
