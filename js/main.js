// Управление фото
const photoInput = document.getElementById('photo-input');
const avatar = document.getElementById('avatar');
const trigger = document.getElementById('upload-trigger');

trigger.addEventListener('click', () => photoInput.click());

photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            avatar.src = ev.target.result;
            localStorage.setItem('cv-photo', ev.target.result);
        };
        reader.readAsDataURL(file);
    }
});

const savedPhoto = localStorage.getItem('cv-photo');
if (savedPhoto) avatar.src = savedPhoto;

// Автосохранение текста
const fields = document.querySelectorAll('[contenteditable="true"]');
fields.forEach((field, index) => {
    const id = `field-${index}`;
    const saved = localStorage.getItem(id);
    if (saved) field.innerHTML = saved;
    
    field.addEventListener('input', () => {
        localStorage.setItem(id, field.innerHTML);
    });

    // Предотвратить редактирование при клике на ссылки
    field.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.stopPropagation();
        }
    });
});

// Material Wave
document.addEventListener('mousedown', (e) => {
    const target = e.target.closest('.btn-neon, .exp-item, [contenteditable="true"]');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const wave = document.createElement('span');
    wave.className = 'wave';
    
    const size = Math.max(rect.width, rect.height);
    wave.style.width = wave.style.height = `${size}px`;
    wave.style.left = `${e.clientX - rect.left - size/2}px`;
    wave.style.top = `${e.clientY - rect.top - size/2}px`;

    target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(wave);

    setTimeout(() => wave.remove(), 600);
});

// PDF
document.getElementById('download-btn').addEventListener('click', () => {
    const element = document.getElementById('resume-page');
    const opt = {
        margin: 0,
        filename: 'syrovar_frontend_cv.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#050505' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});