const dialog = document.querySelector('#bouquet-dialog');
const title = document.querySelector('#selection-title');
const description = document.querySelector('#selection-description');
const size = document.querySelector('#size');
const occasion = document.querySelector('#occasion');
let selected = 'The Florist’s Pick';
let basePrice = 85;
function updatePrice() {
  description.textContent = `A hand-tied seasonal arrangement, from $${basePrice + Number(size.value)}. Tell us a little about your moment and we’ll take it from there.`;
}
function openInquiry(name, price, moment = 'Just because') {
  selected = name;
  basePrice = price;
  title.textContent = name;
  size.value = '0';
  occasion.value = moment;
  updatePrice();
  dialog.showModal();
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-bouquet]').forEach(button => {
  button.addEventListener('click', () => openInquiry(button.dataset.bouquet, Number(button.dataset.price)));
});
document.querySelectorAll('[data-occasion]').forEach(button => {
  button.addEventListener('click', () => openInquiry('The Florist’s Pick', 85, button.dataset.occasion));
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
size.addEventListener('change', updatePrice);
document.querySelector('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const subject = `Flower inquiry: ${selected}`;
  const body = `Hello Petal & Stem!\n\nI’m interested in ${selected}.\nSize: ${size.selectedOptions[0].textContent}\nStarting price: $${basePrice + Number(size.value)}\nOccasion: ${occasion.value}\n\n${document.querySelector('#message').value}\n\nPlease let me know about availability and delivery. Thank you!`;
  window.location.href = `mailto:hello@petalandstem.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
document.querySelector('#year').textContent = new Date().getFullYear();
