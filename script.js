const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('open', !open);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// Gentle pointer parallax gives the hero object depth without a 3D library.
const visual = document.querySelector('.hero-visual');
const core = document.querySelector('.core-wrap');
if (visual && core && window.matchMedia('(pointer:fine)').matches) {
  visual.addEventListener('pointermove', (event) => {
    const bounds = visual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    core.style.setProperty('--tilt-x', `${-12 - y * 11}deg`);
    core.style.setProperty('--tilt-y', `${18 + x * 14}deg`);
  });
  visual.addEventListener('pointerleave', () => {
    core.style.setProperty('--tilt-x', '-12deg');
    core.style.setProperty('--tilt-y', '18deg');
  });
}

// Keep the inquiry on the user's device and open a prefilled Telegram draft.
const leadForm = document.querySelector('#leadForm');
const formStatus = document.querySelector('#formStatus');
leadForm?.addEventListener('submit', () => {
  const field = (name) => leadForm.querySelector(`[data-field=\"${name}\"]`)?.value?.trim() ?? '';
  const message = [
    'Заявка з сайту LIDAN',
    `Ім’я: ${field('name')}`,
    `Компанія: ${field('company')}`,
    `Контакт: ${field('contact')}`,
    `Послуга: ${field('service')}`,
  ].join('\n');
  leadForm.querySelector('[name=\"text\"]').value = message;
  if (formStatus) formStatus.textContent = 'Telegram відкриється в новій вкладці з чернеткою. Перевірте її та надішліть менеджеру.';
});
