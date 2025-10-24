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



// ========== 2. Directional Scroll Reveal Animation ==========
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// ========== 3. Dark Mode Toggle ==========
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}


// ========== 4. Smooth Scroll Enhancement ==========
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: "smooth"
      });
    }
  });
});


// ========== 5. Animate Skill Bars ==========
const skillSections = document.querySelectorAll(".skill");

function animateSkills() {
  const triggerBottom = window.innerHeight * 0.85;
  let delay = 0;

  skillSections.forEach((skill, index) => {
    const rect = skill.getBoundingClientRect();
    if (rect.top < triggerBottom && !skill.classList.contains("visible")) {
      skill.classList.add("visible");
      const fill = skill.querySelector(".fill");
      const percent = skill.dataset.skill;
      const percentText = skill.querySelector(".skill-percent");

      // Animate the bar and count up
      setTimeout(() => {
        fill.style.width = percent + "%";
        let current = 0;
        const count = setInterval(() => {
          if (current < percent) {
            current++;
            percentText.textContent = current + "%";
          } else {
            clearInterval(count);
          }
        }, 20);
      }, delay);

      delay += 150; // staggered start for each skill
    }
  });
}

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);



