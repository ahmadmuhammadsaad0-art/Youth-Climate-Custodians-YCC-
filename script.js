// Basic UI helpers
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle && menuToggle.addEventListener('click', ()=> {
  if(navLinks.style.display === 'flex') navLinks.style.display = 'none';
  else navLinks.style.display = 'flex';
});

// Volunteer modal
const volBtn = document.getElementById('volBtn');
const volModal = document.getElementById('volModal');
const modalClose = document.getElementById('modalClose');
volBtn && volBtn.addEventListener('click', ()=> volModal.setAttribute('aria-hidden','false'));
modalClose && modalClose.addEventListener('click', ()=> volModal.setAttribute('aria-hidden','true'));

// Volunteer form submission (stores to localStorage)
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
    // Save locally (you can replace with fetch to send to server)
    const stored = JSON.parse(localStorage.getItem('ycc_volunteers') || '[]');
    stored.push(data);
    localStorage.setItem('ycc_volunteers', JSON.stringify(stored));
    document.getElementById('volResponse').textContent = 'Thanks — we saved your volunteer request locally. We will contact you soon.';
    volForm.reset();
    setTimeout(()=> volModal.setAttribute('aria-hidden','true'), 1200);
  });
}

// Image posting
const imageUpload = document.getElementById('imageUpload');
const postImageBtn = document.getElementById('postImageBtn');
const imageGallery = document.getElementById('imageGallery');
postImageBtn && postImageBtn.addEventListener('click', () => {
  if (!imageUpload.files || !imageUpload.files[0]) return alert('Choose an image first');
  const file = imageUpload.files[0];
  const caption = document.getElementById('imageCaption').value.trim();
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  img.alt = caption || 'Community photo';
  const wrapper = document.createElement('div');
  wrapper.className = 'gallery-item';
  if(caption) {
    const c = document.createElement('div'); c.textContent = caption; c.style.textAlign='center'; c.style.marginTop='6px'; c.className='muted';
    wrapper.appendChild(img);
    wrapper.appendChild(c);
  } else wrapper.appendChild(img);
  imageGallery.prepend(wrapper);
  imageUpload.value = ''; document.getElementById('imageCaption').value='';
});

// Video posting
const videoUpload = document.getElementById('videoUpload');
const postVideoBtn = document.getElementById('postVideoBtn');
const videoGallery = document.getElementById('videoGallery');
postVideoBtn && postVideoBtn.addEventListener('click', ()=> {
  if(!videoUpload.files || !videoUpload.files[0]) return alert('Choose a video first');
  const file = videoUpload.files[0];
  const caption = document.getElementById('videoCaption').value.trim();
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);
  video.controls = true;
  video.width = 320;
  const wrapper = document.createElement('div');
  wrapper.className = 'gallery-item';
  wrapper.appendChild(video);
  if(caption){ const c = document.createElement('div'); c.textContent = caption; c.style.marginTop='6px'; c.className='muted'; wrapper.appendChild(c);}
  videoGallery.prepend(wrapper);
  videoUpload.value=''; document.getElementById('videoCaption').value='';
});

// Blog post creation
const createPostBtn = document.getElementById('createPostBtn');
const postsList = document.getElementById('postsList');
createPostBtn && createPostBtn.addEventListener('click', ()=> {
  const title = document.getElementById('postTitle').value.trim();
  const content = document.getElementById('postContent').value.trim();
  const fileInput = document.getElementById('postImage');
  if(!title || !content) return alert('Please add a title and content');
  const postEl = document.createElement('article');
  postEl.className = 'post';
  const h = document.createElement('h3'); h.textContent = title;
  postEl.appendChild(h);
  if(fileInput.files && fileInput.files[0]){
    const img = document.createElement('img');
    img.src = URL.createObjectURL(fileInput.files[0]);
    postEl.appendChild(img);
  }
  const p = document.createElement('p'); p.textContent = content; postEl.appendChild(p);
  postsList.prepend(postEl);
  // reset form
  document.getElementById('postTitle').value=''; document.getElementById('postContent').value=''; fileInput.value='';
});

// Simple helper to allow local demo of donate button (replace link with payment processor)
const donateBtn = document.getElementById('donateBtn');
donateBtn && donateBtn.addEventListener('click', ()=> {
  // default opens link; if you want a modal donation form, implement here
});
