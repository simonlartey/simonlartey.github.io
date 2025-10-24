// ========== 1. Typing Animation ==========
const typedText = document.getElementById("typed-text");
const phrases = ["Software Engineer", "Frontend Developer", "Designer"];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let typingDelay = 120;
let eraseDelay = 60;
let newWordDelay = 1000;

function type() {
  const currentPhrase = phrases[phraseIndex];
  if (!isDeleting && letterIndex < currentPhrase.length) {
    typedText.textContent = currentPhrase.substring(0, letterIndex + 1);
    letterIndex++;
    setTimeout(type, typingDelay);
  } else if (isDeleting && letterIndex > 0) {
    typedText.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(type, eraseDelay);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(type, newWordDelay);
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, typingDelay);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typedText) setTimeout(type, 500);
});