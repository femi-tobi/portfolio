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

// Scroll-to-top button logic
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', function() {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = 'flex';
    scrollToTopBtn.style.opacity = '1';
  } else {
    scrollToTopBtn.style.opacity = '0';
    setTimeout(() => {
      if (window.scrollY <= 200) scrollToTopBtn.style.display = 'none';
    }, 300);
  }
});
scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Skill progress bar animation
function setSkillProgressEvents() {
  const skillItems = document.querySelectorAll('.skill-item[data-skill]');
  skillItems.forEach(item => {
    const percent = item.getAttribute('data-skill') + '%';
    item.style.setProperty('--skill-width', percent);
    // Desktop hover
    item.addEventListener('mouseenter', () => {
      item.classList.add('show-progress');
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('show-progress');
    });
    // Mobile tap
    item.addEventListener('touchstart', () => {
      skillItems.forEach(i => i.classList.remove('show-progress'));
      item.classList.add('show-progress');
    });
    document.body.addEventListener('touchstart', (e) => {
      if (!item.contains(e.target)) {
        item.classList.remove('show-progress');
      }
    }, { passive: true });
  });
}
document.addEventListener('DOMContentLoaded', setSkillProgressEvents);

// Testimonials slider logic
function initTestimonialSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const leftBtn = document.querySelector('.testimonial-arrow.left');
  const rightBtn = document.querySelector('.testimonial-arrow.right');
  const dots = document.querySelectorAll('.testimonial-dot');
  let current = 0;
  function show(idx) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }
  function prev() {
    current = (current - 1 + cards.length) % cards.length;
    show(current);
  }
  function next() {
    current = (current + 1) % cards.length;
    show(current);
  }
  if (leftBtn && rightBtn) {
    leftBtn.addEventListener('click', prev);
    rightBtn.addEventListener('click', next);
  }
  // Dots click
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      show(current);
    });
  });
  // Swipe support for mobile
  let startX = null;
  const slider = document.querySelector('.testimonial-cards');
  if (slider) {
    slider.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', e => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 40) prev();
      else if (startX - endX > 40) next();
      startX = null;
    });
  }
  show(current);
}
document.addEventListener('DOMContentLoaded', initTestimonialSlider);

// SheetDB API endpoint for testimonials
const SHEETDB_API = 'https://sheetdb.io/api/v1/i4h5uoi3cpbn1';

function renderTestimonials(testimonials) {
  const cardsContainer = document.querySelector('.testimonial-cards');
  const dotsContainer = document.querySelector('.testimonial-dots');
  if (!cardsContainer || !dotsContainer) return;

  // Remove only .testimonial-card elements, keep arrows
  Array.from(cardsContainer.querySelectorAll('.testimonial-card')).forEach(card => card.remove());
  dotsContainer.innerHTML = '';

  testimonials.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card' + (i === 0 ? ' active' : '');
    card.innerHTML = `
      <div class="testimonial-avatar"><img src="${t.Photo || 'avatar.jpg'}" alt="${t.Name || 'Client'}" /></div>
      <blockquote>"${t.Testimonial || ''}"</blockquote>
      <div class="testimonial-name">${t.Name || ''}</div>
      <div class="testimonial-role">${t.Role || ''}</div>
    `;
    // Insert after left arrow if present, else at start
    const leftArrow = cardsContainer.querySelector('.testimonial-arrow.left');
    if (leftArrow && cardsContainer.children.length > 0) {
      cardsContainer.insertBefore(card, leftArrow.nextSibling);
    } else {
      cardsContainer.appendChild(card);
    }
    const dot = document.createElement('span');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
  });

  // Re-init slider logic
  initTestimonialSlider();
}

function fetchTestimonials() {
  fetch(SHEETDB_API)
    .then(res => res.json())
    .then(data => {
      renderTestimonials(data);
    });
}

document.addEventListener('DOMContentLoaded', fetchTestimonials);

// Handle testimonial form submission
const testimonialForm = document.getElementById('testimonialForm');
// Show/hide testimonial form logic
const showFormBtn = document.getElementById('showTestimonialForm');
if (showFormBtn && testimonialForm) {
  showFormBtn.addEventListener('click', function() {
    testimonialForm.style.display = 'flex';
    showFormBtn.style.display = 'none';
    testimonialForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
// Cloudinary unsigned upload
const CLOUDINARY_CLOUD_NAME = 'dyhj9fvww';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = 'portfolio_unsigned';

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error('Image upload failed');
  }
}

if (testimonialForm) {
  testimonialForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('testimonialName').value.trim();
    const role = document.getElementById('testimonialRole').value.trim();
    const testimonial = document.getElementById('testimonialText').value.trim();
    const photoInput = document.getElementById('testimonialPhoto');
    const msgDiv = document.getElementById('testimonialFormMsg');
    msgDiv.textContent = '';
    if (!name || !testimonial) {
      msgDiv.textContent = 'Please fill in your name and testimonial.';
      return;
    }
    let photoUrl = '';
    if (photoInput && photoInput.files && photoInput.files[0]) {
      msgDiv.textContent = 'Uploading photo...';
      try {
        photoUrl = await uploadToCloudinary(photoInput.files[0]);
      } catch (err) {
        msgDiv.textContent = 'Photo upload failed. Please try again or use a smaller image.';
        return;
      }
    }
    const payload = { Name: name, Role: role, Testimonial: testimonial, Photo: photoUrl };
    fetch(SHEETDB_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        msgDiv.textContent = 'Thank you for your testimonial!';
        testimonialForm.reset();
        testimonialForm.style.display = 'none';
        if (showFormBtn) showFormBtn.style.display = 'block';
        fetchTestimonials();
      })
      .catch(() => {
        msgDiv.textContent = 'There was an error submitting your testimonial.';
      });
  });
}

// Graphics subfilter logic
(function(){
  const filterBtns = document.querySelectorAll('.filter-btn');
  const graphicsSubfilter = document.querySelector('.graphics-subfilter');
  const graphicsSubBtns = document.querySelectorAll('.graphics-subfilter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  function showGraphicsSubfilter(show) {
    if (graphicsSubfilter) graphicsSubfilter.style.display = show ? 'flex' : 'none';
  }

  // Show/hide graphics subfilter on main filter click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (btn.dataset.cat === 'graphics') {
        showGraphicsSubfilter(true);
      } else {
        showGraphicsSubfilter(false);
        // Reset subfilter to 'all' when leaving graphics
        graphicsSubBtns.forEach(b => b.classList.remove('active'));
        graphicsSubBtns[0].classList.add('active');
      }
    });
  });

  // Graphics subfilter click logic
  graphicsSubBtns.forEach(subBtn => {
    subBtn.addEventListener('click', function() {
      graphicsSubBtns.forEach(b => b.classList.remove('active'));
      subBtn.classList.add('active');
      const type = subBtn.dataset.graphicType;
      projectCards.forEach(card => {
        if (card.dataset.cat !== 'graphics') return;
        if (type === 'all' || card.dataset.graphicType === type) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // On page load, hide subfilter unless graphics is active
  const activeMain = document.querySelector('.filter-btn.active');
  showGraphicsSubfilter(activeMain && activeMain.dataset.cat === 'graphics');
})();
