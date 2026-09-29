const WILAYAS = [
  'Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','M’Sila','Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane','Timimoun','Bordj Badji Mokhtar','Ouled Djellal','Béni Abbès','In Salah','In Guezzam','Touggourt','Djanet','El M’Ghaïer','El Meniaa'
];
const PRICE = 8500;
const form = document.querySelector('#order-form');
const quantityInput = document.querySelector('#quantity');
const feedback = document.querySelector('#form-feedback');
const addressInput = document.querySelector('#address');
const money = amount => `${new Intl.NumberFormat('fr-FR').format(amount)} DA`;
const productPhoto = document.querySelector('#product-photo');
document.querySelectorAll('.gallery-thumb').forEach(button => button.addEventListener('click', () => {
  productPhoto.src = button.dataset.image;
  productPhoto.alt = button.dataset.alt;
  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    const selected = thumb === button;
    thumb.classList.toggle('is-active', selected);
    thumb.setAttribute('aria-pressed', String(selected));
  });
}));

WILAYAS.forEach((wilaya, index) => {
  const option = document.createElement('option');
  option.value = wilaya;
  option.textContent = `${String(index + 1).padStart(2, '0')} - ${wilaya}`;
  document.querySelector('#wilaya').append(option);
});

function getQuantity() {
  return Math.min(20, Math.max(1, Number.parseInt(quantityInput.value, 10) || 1));
}
function updatePrice() {
  const quantity = getQuantity();
  quantityInput.value = quantity;
  document.querySelector('#summary-quantity').textContent = quantity;
  document.querySelector('#subtotal').textContent = money(quantity * PRICE);
  document.querySelector('#total').textContent = money(quantity * PRICE);
  document.querySelector('#button-total').textContent = money(quantity * PRICE);
}
document.querySelector('#quantity-minus').addEventListener('click', () => { quantityInput.value = getQuantity() - 1; updatePrice(); });
document.querySelector('#quantity-plus').addEventListener('click', () => { quantityInput.value = getQuantity() + 1; updatePrice(); });
quantityInput.addEventListener('change', updatePrice);
quantityInput.addEventListener('input', updatePrice);

form.addEventListener('submit', async event => {
  event.preventDefault();
  feedback.className = 'form-feedback';
  feedback.textContent = '';
  updatePrice();
  if (!form.reportValidity()) return;

  const key = window.CROCODRILO_CONFIG?.web3formsAccessKey?.trim();
  if (!key) {
    feedback.textContent = 'La réception des commandes doit encore être configurée. Votre commande n’a pas été envoyée. / لم يتم إرسال طلبك بعد، يجب إعداد استقبال الطلبات.';
    return;
  }

  const submitButton = form.querySelector('[type="submit"]');
  submitButton.disabled = true;
  feedback.textContent = 'Envoi en cours… / جار إرسال الطلب…';
  const data = new FormData(form);
  data.append('access_key', key);
  data.append('subject', 'Nouvelle commande Crocodrilo Clothing');
  data.append('from_name', 'Crocodrilo Clothing');
  data.append('Produit', 'Ensemble Lacoste 3 pièces');
  data.append('Prix unitaire', money(PRICE));
  data.append('Frais de livraison', '0 DA');
  data.append('Total commande', money(getQuantity() * PRICE));
  data.append('redirect', new URL(window.CROCODRILO_CONFIG?.thankYouPage || 'merci.html', window.location.href).href);
  // Envoi en arrière-plan : l'utilisateur est redirigé immédiatement sans attendre la réponse distante.
  const sent = navigator.sendBeacon?.('https://api.web3forms.com/submit', data);
  if (sent) {
    window.location.assign(window.CROCODRILO_CONFIG?.thankYouPage || 'merci.html');
    return;
  }

  // Repli pour les navigateurs qui ne permettent pas sendBeacon.
  void fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, keepalive: true });
  window.location.assign(window.CROCODRILO_CONFIG?.thankYouPage || 'merci.html');
});

document.querySelector('#year').textContent = new Date().getFullYear();
updatePrice();
