// ==========================
// Typing Effect
// ==========================
const nameText = "Walaa Saeed";
const subText = "FRONT-END DEVELOPER";

let i = 0, j = 0;
const speed = 100;

function typeWriter() {
  if (i < nameText.length) {
    document.getElementById("typed").innerHTML += nameText.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else if (j < subText.length) {
    document.getElementById("typed-sub").innerHTML += subText.charAt(j);
    j++;
    setTimeout(typeWriter, speed);
  } else {
    document.getElementById("cursor").style.display = "none";
    document.getElementById("cursor-sub").style.display = "none";
  }
}

window.onload = typeWriter;

// ==========================
// Stars Background
// ==========================
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const stars = [];
for (let s = 0; s < 120; s++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: 0.05 + Math.random() * 0.1
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ==========================
// Nav Active Scroll
// ==========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navmenu a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ==========================
// Contact Form
// ==========================
document.querySelector(".contact-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Your message has been sent successfully!");
  e.target.reset();
});

// ==========================
// About Text Animation
// ==========================
const aboutText = document.querySelector(".about-text");

function checkAbout() {
  const rect = aboutText.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    aboutText.classList.add("visible");
  }
}

window.addEventListener("scroll", checkAbout);
window.addEventListener("load", checkAbout);

// ==========================
// Projects Carousel
// ==========================
const projectsContainer = document.querySelector(".projects-container");
const leftArrow = document.querySelector(".project-arrow.left");
const rightArrow = document.querySelector(".project-arrow.right");

let position = 0;

function getCardWidth() {
  const card = projectsContainer.querySelector(".project-card");
  const containerStyle = window.getComputedStyle(projectsContainer);
  const gap = parseFloat(containerStyle.columnGap || containerStyle.gap) || 20;
  return card.offsetWidth + gap;
}

function getVisibleCards() {
  return window.innerWidth < 992 ? 1 : 2;
}

function updatePosition() {
  projectsContainer.style.transform = `translateX(${position}px)`;
}

leftArrow.addEventListener("click", () => {
  const cardWidth = getCardWidth();
  const visibleCards = getVisibleCards();
  position = Math.min(position + cardWidth * visibleCards, 0);
  updatePosition();
});

rightArrow.addEventListener("click", () => {
  const cardWidth = getCardWidth();
  const visibleCards = getVisibleCards();
  const totalCards = projectsContainer.children.length;
  const maxTranslate = -(cardWidth * totalCards - projectsContainer.parentElement.offsetWidth);
  position = Math.max(position - cardWidth * visibleCards, maxTranslate);
  updatePosition();
});

window.addEventListener("resize", () => {
  position = 0;
  updatePosition();
});

// ==========================
// Project Card Press Animation
// ==========================
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
  card.addEventListener("mousedown", () => {
    card.style.transform = "translateY(-5px) scale(0.97)";
  });
  card.addEventListener("mouseup", () => {
    card.style.transform = "translateY(-8px) scale(1)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});
