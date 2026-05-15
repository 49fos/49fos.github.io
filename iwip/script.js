
const header = document.getElementById("header");
const backtop = document.getElementById("backtop");
const navMenu = document.getElementById("navMenu");
const page = document.body.dataset.page;

window.addEventListener("load", () => {
  setActiveNav();
  revealOnScroll();
  startCounters();
  restoreTheme();
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
  backtop.classList.toggle("show", window.scrollY > 400);
  revealOnScroll();
});

function setActiveNav(){
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });
}

function toggleMenu(){
  navMenu.classList.toggle("show");
}

function backToTop(){
  window.scrollTo({top:0, behavior:"smooth"});
}

function revealOnScroll(){
  document.querySelectorAll(".reveal").forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 70){
      el.classList.add("show");
    }
  });
}

function startCounters(){
  document.querySelectorAll("[data-count]").forEach(counter => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const step = Math.max(1, target / 90);

    const update = () => {
      current += step;
      if(current < target){
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(update);
      }else{
        counter.textContent = target + "+";
      }
    };

    update();
  });
}

function openModal(title, text){
  document.getElementById("modalTitle").textContent = title || "Detail Informasi";
  document.getElementById("modalText").textContent = text || "Konten detail dapat diganti sesuai kebutuhan website.";
  document.getElementById("modal").classList.add("active");
}

function closeModal(){
  document.getElementById("modal").classList.remove("active");
}

function filterItems(category, className, btn){
  document.querySelectorAll("." + className).forEach(item => {
    item.style.display = category === "all" || item.dataset.category === category ? "" : "none";
  });

  btn.parentElement.querySelectorAll(".filter-btn").forEach(button => {
    button.classList.remove("active");
  });

  btn.classList.add("active");
}

function selectJob(position){
  const input = document.getElementById("jobPosition");
  if(input){
    input.value = position;
    input.scrollIntoView({behavior:"smooth", block:"center"});
  }
}

function submitApply(event){
  event.preventDefault();
  alert("Lamaran berhasil dikirim secara simulasi. Untuk upload asli perlu backend/database.");
  event.target.reset();
}

function submitContact(event){
  event.preventDefault();
  alert("Pesan berhasil dikirim secara simulasi. Untuk kirim email asli perlu backend atau layanan form.");
  event.target.reset();
}

function previewImage(src){
  document.getElementById("previewImg").src = src;
  document.getElementById("imagePreview").classList.add("active");
}

function closePreview(){
  document.getElementById("imagePreview").classList.remove("active");
}

const searchData = [
  {title:"Beranda", desc:"Halaman utama website company profile.", url:"index.html"},
  {title:"Tentang IWIP", desc:"Profil perusahaan, visi, misi, dan nilai.", url:"about.html"},
  {title:"Kegiatan Perusahaan", desc:"News, CSR, industri, dan ESG.", url:"news.html"},
  {title:"Karir", desc:"Lowongan kerja dan form lamaran.", url:"career.html"},
  {title:"ESG", desc:"Environment, Social, Governance.", url:"esg.html"},
  {title:"Galeri", desc:"Dokumentasi foto kegiatan.", url:"gallery.html"},
  {title:"Kontak", desc:"Form kontak dan informasi perusahaan.", url:"contact.html"}
];

function openSearch(){
  document.getElementById("searchOverlay").classList.add("active");
  document.getElementById("searchInput").focus();
}

function closeSearch(){
  document.getElementById("searchOverlay").classList.remove("active");
}

function runSearch(){
  const value = document.getElementById("searchInput").value.toLowerCase();
  const box = document.getElementById("searchResults");

  box.innerHTML = "";

  if(value.length < 2) return;

  const results = searchData.filter(item =>
    item.title.toLowerCase().includes(value) ||
    item.desc.toLowerCase().includes(value)
  );

  if(results.length === 0){
    box.innerHTML = '<div class="search-result">Tidak ada hasil ditemukan.</div>';
    return;
  }

  results.forEach(item => {
    box.innerHTML += `
      <div class="search-result">
        <a href="${item.url}">${item.title}</a>
        <p>${item.desc}</p>
      </div>
    `;
  });
}

function toggleTheme(){
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

function restoreTheme(){
  if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
  }
}
