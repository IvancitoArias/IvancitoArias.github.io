document.addEventListener("DOMContentLoaded", () => {


  // =========================
// GRID INTERACTIVO
// =========================

const grid = document.querySelector(".grid-background");

// Crear celdas
const cellSize = 40;
const cols = Math.ceil(window.innerWidth / cellSize);
const rows = Math.ceil(window.innerHeight / cellSize);

for (let i = 0; i < cols * rows; i++) {
  const cell = document.createElement("div");
  cell.classList.add("grid-cell");
  grid.appendChild(cell);
}

const cells = document.querySelectorAll(".grid-cell");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  cells.forEach(cell => {
    const rect = cell.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance < 80) {
      cell.classList.add("active");

      // inclinación 3D según el mouse
      const rotateX = dy / 90;
      const rotateY = -dx / 90;

      cell.style.transform = `
        translateY(-50px)
        scale(1.06)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    } else {
      cell.classList.remove("active");
      cell.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
    }
  });
});



  // =========================
  // SCROLL SUAVE
  // =========================
  window.scrollToSection = function(id) {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  };

  // =========================
  // TEXTOS TYPING
  // =========================
  const navText = "Iván.dev";
  const heroText = "Hola, soy Iván";
  
  const navElement = document.getElementById("nav-typing");
  const heroElement = document.getElementById("typing");
 

  let heroIndex = 0;
  let navIndex = 0;

  function typeNav() {
    if (!navElement) return; // seguridad

    if (navIndex < navText.length) {
      navElement.textContent += navText.charAt(navIndex);
      navIndex++;
      setTimeout(typeNav, 80);
    } else {
      typeHero();
    }
  }

  function typeHero() {
    if (!heroElement) return; // seguridad

    if (heroIndex < heroText.length) {
      heroElement.textContent += heroText.charAt(heroIndex);
      heroIndex++;
      setTimeout(typeHero, 120);
    }
  }

  typeNav();

  // =========================
  // ANIMACIÓN DE CARDS
  // =========================
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
  });

  window.addEventListener('scroll', () => {
    const trigger = window.innerHeight * 0.85;

    cards.forEach(card => {
      const top = card.getBoundingClientRect().top;
      if (top < trigger) {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }
    });
  });

  // =========================
  // EMAILJS + ANTIBOT
  // =========================
  emailjs.init({ publicKey: "tH9pvIzbTMg9skUSu" });

  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      // ANTIBOT
      if (form.botcheck && form.botcheck.value !== "") {
        return;
      }

      emailjs.sendForm(
        "service_6etge1e",
        "template_kkj7tsl",
        form
      )
      .then(() => {
        const status = document.createElement("p");
        status.textContent = "Mensaje enviado correctamente 🚀";
        status.style.color = "#00ffae";
        status.style.marginTop = "10px";
        form.appendChild(status);

        setTimeout(() => {
          status.remove();
        }, 4000);

        form.reset();
      })
      .catch((error) => {
        console.error("Error EmailJS:", error);
        alert("Error al enviar el mensaje");
      });
    });
  }

});