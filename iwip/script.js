
const header = document.getElementById('header');
const backtop = document.getElementById('backtop');

window.addEventListener('scroll', () => {
  if(window.scrollY > 50){
    header.classList.add('scrolled');
  }else{
    header.classList.remove('scrolled');
  }

  if(window.scrollY > 400){
    backtop.classList.add('show');
  }else{
    backtop.classList.remove('show');
  }
});

function toggleMenu(){
  document.getElementById('navLinks').classList.toggle('show');
}

function backToTop(){
  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
}

function toggleTheme(){
  document.body.classList.toggle('dark-mode');
}
