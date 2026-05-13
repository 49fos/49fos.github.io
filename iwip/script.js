const header = document.getElementById("header");
const backtop = document.getElementById("backtop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (window.scrollY > 400) {
    backtop.classList.add("show");
  } else {
    backtop.classList.remove("show");
  }
});

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

function openModal(title) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

function sendForm(event) {
  event.preventDefault();
  alert("Pesan berhasil dikirim. Ini masih simulasi frontend.");
}

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}