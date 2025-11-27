// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle && menuToggle.addEventListener('click', () => {
  navLinks.style.display = (navLinks.style.display==='flex') ? 'none' : 'flex';
});

// Volunteer modal
const volBtn = document.getElementById('volBtn');
const volModal = document.getElementById('volModal');
const modalClose = document.getElementById('modalClose');
volBtn && volBtn.addEventListener('click', ()=> volModal.setAttribute('aria-hidden','false'));
modalClose && modalClose.addEventListener('click', ()=> volModal.setAttribute('aria-hidden','true'));

// Volunteer form submission
const volForm = document.getElementById('volForm');
if(volForm){
  volForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = {
      name: document.getElementById('volName').value.trim(),
      email: document.getElementById('volEmail').value.trim(),
      phone: document.getElementById('volPhone').value.trim(),
      msg: document.getElementById('volMsg').value.trim(),
      date: new Date().toISOString()
    };
    const stored = JSON.parse(localStorage.getItem('ycc_volunteers')||'[]');
    stored.push(data);
    localStorage.setItem('ycc_volunteers', JSON.stringify(stored));
    document.getElementById('volResponse').textContent = 'Thanks — we saved your volunteer request locally.';
    volForm.reset();
    setTimeout(()=> volModal.setAttribute('aria-hidden','true'), 1200);
  });
}

// Image posting
const imageUpload = document.getElementById('imageUpload');
const postImageBtn = document.getElementById('postImageBtn');
const imageGallery = document.getElementById('imageGallery');
postImageBtn && postImageBtn.addEventListener('click', () => {
  if(!imageUpload.files[0]) return alert('Choose an image first');
  const file = imageUpload.files[0];
  const caption = document.getElementById('imageCaption').value.trim();
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  img.alt = caption || 'Community photo';
  const wrapper = document.createElement('div');
  wrapper.className='gallery-item';
  if(caption){ const c = document.createElement('div'); c.textContent=caption; c.className='muted'; c.style.marginTop='6px'; wrapper.appendChild(img); wrapper.appendChild(c);}
  else wrapper.appendChild(img);
  imageGallery.prepend(wrapper);
  imageUpload.value=''; document.getElementById('imageCaption').value='';
});

// Video posting
const videoUpload = document.getElementById('videoUpload');
const postVideoBtn = document.getElementById('postVideoBtn');
const videoGallery = document.getElementById('videoGallery');
postVideoBtn && postVideoBtn.addEventListener('click', ()=> {
  if(!videoUpload.files[0]) return alert('Choose a video first');
  const file = videoUpload.files[0];
  const caption = document.getElementById('videoCaption').value.trim();
  const video
