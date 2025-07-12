// Section reveal
const observer=new IntersectionObserver(entries=>{entries.forEach(ent=>{if(ent.isIntersecting){ent.target.classList.add('show');}})},{threshold:0.2});
document.querySelectorAll('.section').forEach(sec=>observer.observe(sec));

// Theme toggle
const themeToggle=document.getElementById('themeToggle');
function setTheme(t){document.documentElement.setAttribute('data-theme',t);localStorage.setItem('theme',t);themeToggle.textContent=t==='dark'?'🌞':'🌙';}
const savedTheme=localStorage.getItem('theme')||'dark';setTheme(savedTheme);
themeToggle.addEventListener('click',()=>{setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark');});

// Filter projects
const filterBtns=document.querySelectorAll('.filter-btn');
const projectCards=document.querySelectorAll('.project-card');
filterBtns.forEach(btn=>btn.addEventListener('click',()=>{filterBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const cat=btn.dataset.cat;projectCards.forEach(card=>{card.style.display=(cat==='all'||card.dataset.cat===cat)?'block':'none';});}));

// Project modal
const modal=document.getElementById('projectModal');
const modalTitle=document.getElementById('modalTitle');
const modalDesc=document.getElementById('modalDesc');
const modalLink=document.getElementById('modalLink');
projectCards.forEach(card=>card.addEventListener('click',()=>{modalTitle.textContent=card.dataset.title;modalDesc.textContent=card.dataset.desc;modalLink.href=card.dataset.link;modal.style.display='flex';}));
document.querySelector('.modal .close').addEventListener('click',()=>modal.style.display='none');
window.addEventListener('click',e=>{if(e.target===modal)modal.style.display='none';});

// Responsive nav hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.style.display = 'flex';
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// Cursor icon follow and section-based switching
const cursorIcons = document.querySelector('.cursor-icons');
const figmaIcon = document.querySelector('.cursor-figma');
const flutterIcon = document.querySelector('.cursor-flutter');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
let rotation = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const nav = document.querySelector('nav');

function isCursorOverNav() {
  if (!nav) return false;
  const navRect = nav.getBoundingClientRect();
  return (
    mouseX >= navRect.left &&
    mouseX <= navRect.right &&
    mouseY >= navRect.top &&
    mouseY <= navRect.bottom
  );
}

function animateCursorIcon() {
  currentX += (mouseX - currentX) * 0.18;
  currentY += (mouseY - currentY) * 0.18;
  rotation += 1.5; // degrees per frame
  cursorIcons.style.transform = `translate(${currentX - 24}px, ${currentY - 24}px) rotate(${rotation}deg)`;
  // Hide cursor icon if it overlaps nav
  if (isCursorOverNav() && (figmaIcon.style.display === 'block' || flutterIcon.style.display === 'block')) {
    cursorIcons.classList.add('cursor-hidden');
  } else {
    cursorIcons.classList.remove('cursor-hidden');
  }
  requestAnimationFrame(animateCursorIcon);
}
animateCursorIcon();

// Section detection and icon switching
const sections = [
  {id: 'hero', icon: figmaIcon},
  {id: 'services', icon: flutterIcon},
  {id: 'projects', icon: figmaIcon},
  {id: 'experience', icon: flutterIcon},
  {id: 'contact', icon: figmaIcon}
];

function updateCursorIcon() {
  let found = false;
  for (const section of sections) {
    const el = document.querySelector(`#${section.id}`);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
        figmaIcon.style.display = 'none';
        flutterIcon.style.display = 'none';
        section.icon.style.display = 'block';
        found = true;
        break;
      }
    }
  }
  if (!found) {
    figmaIcon.style.display = 'block';
    flutterIcon.style.display = 'none';
  }
}
window.addEventListener('scroll', updateCursorIcon);
window.addEventListener('resize', updateCursorIcon);
document.addEventListener('DOMContentLoaded', updateCursorIcon);

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  const splashName = document.querySelector('.splash-name');
  if (splashName) {
    const name = splashName.textContent.trim();
    splashName.innerHTML = '';
    for (let i = 0; i < name.length; i++) {
      const span = document.createElement('span');
      span.textContent = name[i];
      span.className = 'splash-letter';
      splashName.appendChild(span);
    }
  }
  if (splash) {
    setTimeout(() => {
      splash.classList.add('splash-hide');
      setTimeout(() => splash.remove(), 800);
    }, 1700);
  }
});
