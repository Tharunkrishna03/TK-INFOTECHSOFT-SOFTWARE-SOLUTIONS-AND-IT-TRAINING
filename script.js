let start = 0;
let end = 1000;
let speed = 3;

function runCounter() {
  let counter = document.getElementById("counter");
  let interval = setInterval(() => {
    start++;
    counter.textContent = start;

    if (start >= end) {
      clearInterval(interval);
    }
  }, speed);
}
runCounter();

let sta = 0;
let en = 200;
let spee = 10;

function runsCounter() {
  let scounter = document.getElementById("scounter");
  let sinterval = setInterval(() => {
    sta++;
    scounter.textContent = sta;

    if (sta >= en) {
      clearInterval(sinterval);
    }
  }, speed);
}
runsCounter();

(function () {
  emailjs.init("Ou_qu_feu12sSNEkc");
})();

function sendmail() {
  emailjs
    .send("service_tpuqps7", "template_ln9myvv", {
      from_name: document.getElementById("name").value,
      email_id: document.getElementById("mail").value,
      message: document.getElementById("enq").value,
    })
    .then(
      function (response) {
        alert(" Message sent successfully!");
      },
      function (error) {
        alert(" FAILED... " + error.text);
      }
    );
}

function makecall() {
  window.location.href = "tel:+91 9597151915";
}

function makemail() {
  window.location.href = "mailto:dtharunkrishna65@gmail.com";
}
function back() {
  window.location.href = "index.html";
}

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  const scrollPosition = window.scrollY;
  const halfPage = document.body.scrollHeight / 5;

  if (scrollPosition > halfPage) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
// const cursor = document.createElement("div");
// cursor.classList.add("cursor");
// document.body.appendChild(cursor);

// document.addEventListener("mousemove", (e) => {
//   cursor.style.top = `${e.clientY}px`;
//   cursor.style.left = `${e.clientX}px`;
// });

document.addEventListener('mousemove', e => {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  document.body.appendChild(particle);

  const size = Math.random() * 8 + 4; // random particle size
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${e.clientX}px`;
  particle.style.top = `${e.clientY}px`;

  // Random movement for a natural effect
  const xMove = (Math.random() - 0.5) * 100;
  const yMove = (Math.random() - 0.5) * 100;

  particle.animate(
    [
      { transform: `translate(-50%, -50%)`, opacity: 1 },
      { transform: `translate(${xMove}px, ${yMove}px) scale(0)`, opacity: 0 }
    ],
    {
      duration: 1000 + Math.random() * 500,
      easing: 'ease-out',
      fill: 'forwards'
    }
  );

  // Remove element after animation
  setTimeout(() => particle.remove(), 1500);
});

const imageRow = document.querySelector('.image-row');

function animateOnScroll() {
  const triggerBottom = window.innerHeight * 0.8;
  const rowTop = imageRow.getBoundingClientRect().top;
  const rowBottom = imageRow.getBoundingClientRect().bottom;

  // When visible — add "show"
  if (rowTop < triggerBottom && rowBottom > 0) {
    imageRow.classList.add('show');
  } 
  // When not visible — remove "show"
  else {
    imageRow.classList.remove('show');
  }
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // run once on load

const cards = document.querySelectorAll('.card');

function animateCards() {
  const triggerBottom = window.innerHeight * 0.85;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.classList.add('show');
    } else {
      card.classList.remove('show'); // replays animation when scrolling back
    }
  });
}

window.addEventListener('scroll', animateCards);
animateCards(); // Run once on page load
