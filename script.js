// Data
const dietPlans = [
  {
    id: 'lean',
    title: 'Lean & Clean',
    kcal: 1800,
    protein: '120g',
    carbs: '160g',
    fat: '60g',
    description: 'High-protein meals tailored for fat loss and muscle retention.'
  },
  {
    id: 'balance',
    title: 'Balanced Plate',
    kcal: 2200,
    protein: '110g',
    carbs: '240g',
    fat: '70g',
    description: 'Sustainable, balanced macro distribution for overall wellness.'
  },
  {
    id: 'bulk',
    title: 'Lean Bulk',
    kcal: 2800,
    protein: '160g',
    carbs: '320g',
    fat: '80g',
    description: 'Calorie surplus with clean carbs for steady muscle gain.'
  }
];

const trainerPlans = [
  { id: 'basic', name: 'Basic', price: 19, period: 'mo', benefits: ['Gym access', 'Group classes 2x/week'] },
  { id: 'pro', name: 'Pro', price: 39, period: 'mo', benefits: ['Everything in Basic', 'Personal trainer 1x/week', 'Custom diet'] },
  { id: 'elite', name: 'Elite', price: 299, period: 'yr', benefits: ['Annual plan (best value)', 'PT 2x/week', 'Priority slots'] }
];

const timeSlots = [
  '06:00 - 07:00', '07:00 - 08:00', '08:00 - 09:00',
  '09:00 - 10:00', '10:00 - 11:00', '17:00 - 18:00',
  '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'
];

const products = [
  { id: 'tee', title: 'BreathLite Tee', price: 25, color: 'Black', icon: '👕' },
  { id: 'shorts', title: 'FlexFit Shorts', price: 29, color: 'Navy', icon: '🩳' },
  { id: 'leggings', title: 'Aero Leggings', price: 39, color: 'Charcoal', icon: '🧘' },
  { id: 'hoodie', title: 'WarmUp Hoodie', price: 49, color: 'Olive', icon: '🧥' },
  { id: 'bottle', title: 'Hydra Bottle', price: 15, color: 'Teal', icon: '🍼' },
  { id: 'cap', title: 'RunCap', price: 18, color: 'Grey', icon: '🧢' },
  { id: 'gloves', title: 'Grip Gloves', price: 22, color: 'Black', icon: '🧤' },
  { id: 'bag', title: 'Gym Duffle', price: 59, color: 'Black', icon: '🧳' }
];

// Apparel Shop items with images
const apparel = [
  { id: 'a-top', title: 'ColorPop Training Top', price: 32, img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop' },
  { id: 'a-leggings', title: 'Vivid Flex Leggings', price: 44, img: 'https://images.unsplash.com/photo-1593032457860-6a4f0fba69a0?q=80&w=800&auto=format&fit=crop' },
  { id: 'a-shorts', title: 'Neon Sprint Shorts', price: 28, img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
  { id: 'a-hoodie', title: 'Aurora Warm Hoodie', price: 58, img: 'https://images.unsplash.com/photo-1558885544-2c09e873e63f?q=80&w=800&auto=format&fit=crop' },
  { id: 'a-shoes', title: 'PulseRun Trainers', price: 79, img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
  { id: 'a-cap', title: 'GlowCap', price: 20, img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop' }
];

// Helpers
function $(sel) { return document.querySelector(sel); }
function el(tag, cls) { const e = document.createElement(tag); if (cls) e.className = cls; return e; }
function currency(n) { return `$${Number(n).toFixed(2)}`; }

// Navigation toggle (mobile)
const navToggle = $('#navToggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const list = document.getElementById('primaryNav');
    const isOpen = list.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Set current year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

// Render Diet Plans
function renderDietPlans() {
  const wrap = document.getElementById('dietPlans');
  if (!wrap) return;
  wrap.innerHTML = '';
  dietPlans.forEach((p) => {
    const card = el('div', 'card');
    const h = el('h4'); h.textContent = p.title; card.appendChild(h);
    const desc = el('p'); desc.textContent = p.description; card.appendChild(desc);
    const meta = el('div', 'diet-meta');
    meta.innerHTML = `
      <span class="pill">${p.kcal} kcal</span>
      <span class="pill">Protein: ${p.protein}</span>
      <span class="pill">Carbs: ${p.carbs}</span>
      <span class="pill">Fat: ${p.fat}</span>
    `;
    card.appendChild(meta);
    wrap.appendChild(card);
  });
}

// Render Trainer Plans
function renderTrainerPlans() {
  const wrap = document.getElementById('trainerPlans');
  if (!wrap) return;
  wrap.innerHTML = '';
  trainerPlans.forEach((plan) => {
    const card = el('div', 'card');
    const h = el('h4'); h.textContent = plan.name; card.appendChild(h);
    const price = el('div', 'price'); price.innerHTML = `${currency(plan.price)} <small>/${plan.period}</small>`; card.appendChild(price);
    const list = el('ul', 'benefits');
    plan.benefits.forEach((b) => { const li = el('li'); li.textContent = b; list.appendChild(li); });
    card.appendChild(list);
    const btn = el('button', 'btn primary'); btn.textContent = 'Choose Plan';
    btn.addEventListener('click', () => {
      const planSelect = document.getElementById('planSelect');
      if (planSelect) {
        planSelect.value = plan.id;
        planSelect.dispatchEvent(new Event('change'));
        window.location.hash = '#payment';
      }
    });
    card.appendChild(btn);
    wrap.appendChild(card);
  });
}

// Render Booking Slots
function initBooking() {
  const select = document.getElementById('timeSlot');
  if (!select) return;
  timeSlots.forEach((t) => {
    const opt = document.createElement('option'); opt.value = t; opt.textContent = t; select.appendChild(opt);
  });
  const bookingForm = document.getElementById('bookingForm');
  const help = document.getElementById('bookingHelp');
  const list = document.getElementById('bookingList');
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

  function renderBookings() {
    if (!list) return;
    list.innerHTML = '';
    if (bookings.length === 0) {
      const empty = el('li'); empty.textContent = 'No bookings yet.'; list.appendChild(empty); return;
    }
    bookings.forEach((b, i) => {
      const li = el('li');
      li.textContent = `${b.date} • ${b.slot} • ${b.name}`;
      const del = el('button', 'btn ghost'); del.style.marginLeft = '8px'; del.textContent = 'Cancel';
      del.addEventListener('click', () => {
        bookings.splice(i, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        renderBookings();
        if (help) help.textContent = 'Booking cancelled.';
      });
      li.appendChild(del);
      list.appendChild(li);
    });
  }

  renderBookings();

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('memberName').value.trim();
    const date = document.getElementById('bookingDate').value;
    const slot = document.getElementById('timeSlot').value;
    if (!name || !date || !slot) { if (help) help.textContent = 'Please complete all fields.'; return; }

    const clash = bookings.some((b) => b.date === date && b.slot === slot);
    if (clash) { if (help) help.textContent = 'That slot is already booked for this date.'; return; }

    bookings.push({ name, date, slot });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    renderBookings();
    bookingForm.reset();
    if (help) help.textContent = 'Booked! See below for your upcoming bookings.';
  });
}

// Render Products
function renderProducts() {
  const wrap = document.getElementById('products');
  if (!wrap) return;
  wrap.innerHTML = '';
  products.forEach((p) => {
    const card = el('div', 'card product');
    const thumb = el('div', 'thumb'); thumb.textContent = p.icon; card.appendChild(thumb);
    const title = el('div', 'title'); title.textContent = p.title; card.appendChild(title);
    const meta = el('div', 'meta'); meta.textContent = `${p.color} • ${currency(p.price)}`; card.appendChild(meta);
    const btn = el('button', 'btn'); btn.textContent = 'Add to Wishlist';
    btn.addEventListener('click', () => alert(`${p.title} saved to wishlist.`));
    card.appendChild(btn);
    wrap.appendChild(card);
  });
}

// Render Apparel Shop
function renderShop() {
  const wrap = document.getElementById('shopGrid');
  if (!wrap) return;
  wrap.innerHTML = '';
  apparel.forEach((p) => {
    const card = el('div', 'card product');
    const img = document.createElement('img'); img.src = p.img; img.alt = p.title; img.className = 'img'; card.appendChild(img);
    const title = el('div', 'title'); title.textContent = p.title; card.appendChild(title);
    const meta = el('div', 'meta'); meta.textContent = currency(p.price); card.appendChild(meta);
    const btn = el('button', 'btn primary'); btn.textContent = 'Add to Cart';
    btn.addEventListener('click', () => addToCart(p.id));
    card.appendChild(btn);
    wrap.appendChild(card);
  });
}

// Simple Cart
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
function cartCount() { return cart.reduce((n, it) => n + it.qty, 0); }
function cartTotal() { return cart.reduce((sum, it) => sum + it.price * it.qty, 0); }

function addToCart(apparelId) {
  const item = apparel.find((a) => a.id === apparelId);
  if (!item) return;
  const existing = cart.find((c) => c.id === item.id);
  if (existing) existing.qty += 1; else cart.push({ id: item.id, name: item.title, price: item.price, img: item.img, qty: 1 });
  saveCart();
  updateCartUI();
}

function removeFromCart(apparelId) {
  const idx = cart.findIndex((c) => c.id === apparelId);
  if (idx >= 0) {
    cart.splice(idx, 1);
    saveCart();
    updateCartUI();
  }
}

function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = String(cartCount());
  const list = document.getElementById('cartList');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (list) {
    list.innerHTML = '';
    if (cart.length === 0) {
      const empty = el('li'); empty.textContent = 'Your cart is empty.'; list.appendChild(empty);
    } else {
      cart.forEach((it) => {
        const li = el('li'); li.className = 'cart-item';
        const thumb = document.createElement('img'); thumb.src = it.img; thumb.alt = it.name; li.appendChild(thumb);
        const info = el('div');
        const name = el('div', 'name'); name.textContent = `${it.name} × ${it.qty}`; info.appendChild(name);
        const price = el('div', 'price'); price.textContent = currency(it.price * it.qty); info.appendChild(price);
        li.appendChild(info);
        const rm = el('button', 'rm'); rm.textContent = 'Remove'; rm.addEventListener('click', () => removeFromCart(it.id)); li.appendChild(rm);
        list.appendChild(li);
      });
    }
  }
  if (itemsEl) itemsEl.textContent = String(cartCount());
  if (totalEl) totalEl.textContent = currency(cartTotal());
}

function openCart() {
  const overlay = document.getElementById('cartOverlay');
  const panel = document.getElementById('cartPanel');
  if (overlay) overlay.hidden = false;
  if (panel) { panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); }
}

function closeCart() {
  const overlay = document.getElementById('cartOverlay');
  const panel = document.getElementById('cartPanel');
  if (overlay) overlay.hidden = true;
  if (panel) { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); }
}

// Payment & Offers
function initPayment() {
  const planSelect = document.getElementById('planSelect');
  const offerSelect = document.getElementById('offerSelect');
  const subtotalEl = document.getElementById('subtotal');
  const discountEl = document.getElementById('discount');
  const totalEl = document.getElementById('grandTotal');
  const paymentForm = document.getElementById('paymentForm');
  const help = document.getElementById('paymentHelp');

  // Populate plan options
  trainerPlans.forEach((p) => {
    const opt = document.createElement('option'); opt.value = p.id; opt.textContent = `${p.name} - ${currency(p.price)}/${p.period}`; planSelect.appendChild(opt);
  });
  planSelect.value = trainerPlans[0].id;

  function compute() {
    const plan = trainerPlans.find((p) => p.id === planSelect.value);
    const subtotal = plan ? plan.price : 0;
    let discount = 0;
    const offer = offerSelect.value;
    if (offer === 'NEW10') discount = subtotal * 0.10;
    if (offer === 'FIT20' && plan && plan.period === 'yr') discount = subtotal * 0.20;
    subtotalEl.textContent = currency(subtotal);
    discountEl.textContent = `-${currency(discount)}`;
    totalEl.textContent = currency(subtotal - discount);
  }

  planSelect.addEventListener('change', compute);
  offerSelect.addEventListener('change', compute);
  compute();

  // Mask inputs (basic UX)
  const cardNumber = document.getElementById('cardNumber');
  cardNumber.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16);
    v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = v;
  });
  const cardExpiry = document.getElementById('cardExpiry');
  cardExpiry.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    e.target.value = v;
  });
  const cardCVC = document.getElementById('cardCVC');
  cardCVC.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
  });

  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('subscriberName').value.trim();
    const email = document.getElementById('subscriberEmail').value.trim();
    const plan = trainerPlans.find((p) => p.id === planSelect.value);
    if (!name || !email || !plan) { if (help) help.textContent = 'Please complete all fields.'; return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { if (help) help.textContent = 'Please enter a valid email.'; return; }
    // Simple demo checkout
    const total = totalEl.textContent;
    localStorage.setItem('subscription', JSON.stringify({ name, email, plan: plan.id, total }));
    help.textContent = `Success! Subscribed to ${plan.name}. Charged ${total}.`;
    paymentForm.reset();
    planSelect.value = trainerPlans[0].id; offerSelect.value = 'none'; compute();
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderDietPlans();
  renderTrainerPlans();
  initBooking();
  renderProducts();
  renderShop();
  initPayment();
  // Ensure hero background shows even if primary image fails
  initHeroImageFallback();

  // Cart events
  updateCartUI();
  const cartBtn = document.getElementById('cartBtn'); if (cartBtn) cartBtn.addEventListener('click', openCart);
  const closeCartBtn = document.getElementById('closeCart'); if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  const overlay = document.getElementById('cartOverlay'); if (overlay) overlay.addEventListener('click', closeCart);
  const checkoutBtn = document.getElementById('checkoutBtn'); if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) { alert('Your cart is empty.'); return; }
    localStorage.setItem('order', JSON.stringify({ items: cart, total: cartTotal() }));
    alert('Thanks! Your order has been placed.');
    cart = []; saveCart(); updateCartUI(); closeCart();
  });
});


// Fallback for hero background image if remote source blocks/404s
function initHeroImageFallback() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const primaryUrl = 'https://source.unsplash.com/1600x900/?crunches,abs,core,workout,gym';
  const fallbackUrl = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop';
  const test = new Image();
  test.onload = () => {
    // If loads, ensure hero uses primary (already set inline); no action needed
  };
  test.onerror = () => {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${fallbackUrl}')`;
    hero.style.backgroundPosition = 'center bottom';
    hero.style.backgroundRepeat = 'no-repeat';
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundAttachment = 'fixed';
  };
  test.referrerPolicy = 'no-referrer';
  test.src = primaryUrl + `&t=${Date.now()}`; // cache-bust
}
