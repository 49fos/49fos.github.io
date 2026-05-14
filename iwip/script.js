
const header = document.getElementById("header");
const backtop = document.getElementById("backtop");
const preloader = document.getElementById("preloader");

const slides = [
  {
    title: "Membangun Masa Depan Industri Indonesia",
    text: "Website company profile modern untuk menampilkan profil perusahaan, berita, karir, ESG, galeri, dan kontak.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    title: "Industri Modern dan Terintegrasi",
    text: "Menghadirkan ekosistem industri yang modern, profesional, dan berkelanjutan.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
  },
  {
    title: "Komitmen Terhadap ESG",
    text: "Mendukung lingkungan, masyarakat, dan tata kelola perusahaan yang baik.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
  }
];

let currentSlide = 0;

window.addEventListener("load", () => {
  setTimeout(() => {
    if (preloader) preloader.style.display = "none";
  }, 600);

  setActiveMenu();
  revealOnScroll();
  startCounters();
  restoreTheme();
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");

  if (window.scrollY > 400) backtop.classList.add("show");
  else backtop.classList.remove("show");

  revealOnScroll();
});

function setActiveMenu() {
  document.querySelectorAll(".nav-menu a").forEach(link => {
    if (link.dataset.page === window.ACTIVE_PAGE) link.classList.add("active");
    else link.classList.remove("active");
  });
}

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

function changeSlide(index) {
  const hero = document.querySelector(".hero");
  const title = document.getElementById("heroTitle");
  const text = document.getElementById("heroText");

  if (!hero || !title || !text) return;

  currentSlide = index;
  hero.style.backgroundImage =
    `linear-gradient(rgba(25,30,52,.82),rgba(25,30,52,.86)),url('${slides[index].image}')`;
  title.textContent = slides[index].title;
  text.textContent = slides[index].text;
}

setInterval(() => {
  if (!document.querySelector(".hero")) return;
  currentSlide = (currentSlide + 1) % slides.length;
  changeSlide(currentSlide);
}, 5000);

function openModal(title, text) {
  document.getElementById("modalTitle").textContent = title || "Detail Informasi";
  document.getElementById("modalText").textContent = text || "Ini adalah detail informasi. Konten bisa diganti sesuai kebutuhan.";
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function filterCards(category, className, button) {
  document.querySelectorAll("." + className).forEach(card => {
    const show = category === "all" || card.dataset.category === category;
    card.style.display = show ? "" : "none";
  });

  button.parentElement.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

function openApply(position) {
  const input = document.getElementById("applyPosition");
  if (input) {
    input.value = position;
    input.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function submitApplication(event) {
  event.preventDefault();
  alert("Lamaran berhasil disimpan secara simulasi. Untuk upload asli, perlu backend/database.");
  event.target.reset();
}

function sendContact(event) {
  event.preventDefault();
  alert("Pesan berhasil dikirim secara simulasi. Untuk kirim email asli, perlu backend atau layanan form.");
  event.target.reset();
}

function previewImage(src) {
  document.getElementById("previewImg").src = src;
  document.getElementById("imagePreview").classList.add("active");
}

function closePreview() {
  document.getElementById("imagePreview").classList.remove("active");
}

function openSearch() {
  document.getElementById("searchOverlay").classList.add("active");
  document.getElementById("searchInput").focus();
}

function closeSearch() {
  document.getElementById("searchOverlay").classList.remove("active");
}

const searchData = [
  { title: "Profil Perusahaan", url: "about.html", desc: "Tentang IWIP, visi, misi, dan nilai perusahaan." },
  { title: "News Pengembangan Kawasan", url: "news.html", desc: "Berita dan kegiatan industri." },
  { title: "Karir Admin Staff", url: "career.html", desc: "Lowongan kerja dan form apply." },
  { title: "ESG", url: "esg.html", desc: "Environment, Social, Governance." },
  { title: "Galeri", url: "gallery.html", desc: "Dokumentasi kegiatan." },
  { title: "Kontak", url: "contact.html", desc: "Form kontak dan informasi perusahaan." }
];

function runSearch() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const box = document.getElementById("searchResults");
  box.innerHTML = "";

  if (keyword.length < 2) return;

  const results = searchData.filter(item =>
    item.title.toLowerCase().includes(keyword) ||
    item.desc.toLowerCase().includes(keyword)
  );

  if (results.length === 0) {
    box.innerHTML = `<div class="search-item">Tidak ada hasil.</div>`;
    return;
  }

  results.forEach(item => {
    box.innerHTML += `
      <div class="search-item">
        <strong>${item.title}</strong>
        <p>${item.desc}</p>
        <a href="${item.url}">Buka halaman</a>
      </div>
    `;
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

function restoreTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
}

function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add("show");
  });
}

function startCounters() {
  document.querySelectorAll(".counter").forEach(counter => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const step = target / 100;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        setTimeout(update, 15);
      } else {
        counter.textContent = target + "+";
      }
    };

    update();
  });
}
