// ============================================================
// ИНИЦИАЛИЗАЦИЯ TELEGRAM
// ============================================================
const tg = window.Telegram?.WebApp;

window.addEventListener("DOMContentLoaded", () => {
  if (tg) {
    tg.ready();
    try { tg.expand(); } catch(e) {}
    try { if (typeof tg.requestFullscreen === "function") tg.requestFullscreen(); } catch(e) {}
    try { if (typeof tg.disableVerticalSwipes === "function") tg.disableVerticalSwipes(); } catch(e) {}
    if (tg.BackButton) tg.BackButton.hide();

    // Профиль пользователя
    const user = tg.initDataUnsafe?.user;
    if (user) {
      const nameEl = document.getElementById("profile-name");
      const usernameEl = document.getElementById("profile-username");
      const avatarEl = document.getElementById("profile-avatar");
      if (nameEl) nameEl.textContent = [user.first_name, user.last_name].filter(Boolean).join(" ");
      if (usernameEl && user.username) usernameEl.textContent = "@" + user.username;
      if (avatarEl && user.photo_url) {
        avatarEl.innerHTML = `<img src="${user.photo_url}" alt="">`;
      }
    }

    // Модал выхода
    const exitModal = document.getElementById("exitModal");
    const exitBackdrop = document.getElementById("exitBackdrop");
    const exitCancel = document.getElementById("exitCancel");
    const exitConfirm = document.getElementById("exitConfirm");

    tg.onEvent("close", () => exitModal.classList.add("open"));
    exitBackdrop?.addEventListener("click", () => exitModal.classList.remove("open"));
    exitCancel?.addEventListener("click", () => exitModal.classList.remove("open"));
    exitConfirm?.addEventListener("click", () => tg.close());
  }

  initCatalog();
  initFeatured();
  initFilters();
});

// ============================================================
// СОСТОЯНИЕ
// ============================================================
let currentPage = "catalog";
let currentCategory = "all";
let selectedService = null;
let selectedPlan = null;
let mySubscriptions = [];
let featuredIndex = 0;
let featuredInterval = null;

const FEATURED_IDS = ["spotify", "netflix", "chatgpt"];

// ============================================================
// НАВИГАЦИЯ
// ============================================================
function navigate(page) {
  // Скрываем все страницы
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  // Показываем нужную
  document.getElementById("page-" + page)?.classList.add("active");

  // Обновляем nav
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });

  // BackButton
  if (tg?.BackButton) {
    if (page === "service") {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate("catalog"));
    } else {
      tg.BackButton.hide();
    }
  }

  currentPage = page;
  haptic("selection");
}

// ============================================================
// HAPTIC
// ============================================================
function haptic(type = "light") {
  try {
    if (tg?.HapticFeedback) {
      if (type === "selection") tg.HapticFeedback.selectionChanged();
      else if (type === "success") tg.HapticFeedback.notificationOccurred("success");
      else if (type === "error") tg.HapticFeedback.notificationOccurred("error");
      else tg.HapticFeedback.impactOccurred(type);
    }
  } catch(e) {}
}

// ============================================================
// КАТАЛОГ
// ============================================================
function initCatalog() {
  renderGrid("all");
}

function renderGrid(cat) {
  const grid = document.getElementById("services-grid");
  const title = document.getElementById("section-title");
  const count = document.getElementById("section-count");
  if (!grid) return;

  const filtered = cat === "all" ? SERVICES : SERVICES.filter(s => s.category === cat);

  const CATEGORY_NAMES = { all: "Все сервисы", streaming: "Стриминг", ai: "AI-сервисы", music: "Музыка", tools: "Инструменты" };
  if (title) title.textContent = CATEGORY_NAMES[cat] || "Сервисы";
  if (count) count.textContent = filtered.length + " сервисов";

  grid.innerHTML = "";
  filtered.forEach(svc => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.style.setProperty("--card-color", svc.color);

    card.innerHTML = `
      <div class="card-logo">${svc.logo}</div>
      ${svc.badge ? `<div class="card-badge">${svc.badge}</div>` : ""}
      <div class="card-name">${svc.name}</div>
      <div class="card-desc">${svc.shortDesc}</div>
      <div class="card-price">от ${formatPrice(svc.plans[0].priceRub)}</div>
    `;

    card.addEventListener("click", () => openService(svc.id));
    grid.appendChild(card);
  });
}

// ============================================================
// ФИЛЬТРЫ
// ============================================================
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.cat;
      renderGrid(currentCategory);
      haptic("light");
    });
  });
}

// ============================================================
// FEATURED СЛАЙДЕР
// ============================================================
function initFeatured() {
  const services = FEATURED_IDS.map(id => SERVICES.find(s => s.id === id)).filter(Boolean);
  const dotsEl = document.getElementById("featured-dots");

  // Dots
  dotsEl.innerHTML = services.map((_, i) =>
    `<div class="featured-dot ${i === 0 ? 'active' : ''}" data-i="${i}"></div>`
  ).join("");
  dotsEl.querySelectorAll(".featured-dot").forEach(d => {
    d.addEventListener("click", () => { clearInterval(featuredInterval); showFeatured(+d.dataset.i); });
  });

  // Featured btn
  document.getElementById("featured-btn")?.addEventListener("click", () => {
    openService(services[featuredIndex]?.id);
  });

  // Swipe support
  const card = document.getElementById("featured-card");
  let touchStartX = 0;
  card?.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  card?.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      clearInterval(featuredInterval);
      if (diff > 0) showFeatured((featuredIndex + 1) % services.length);
      else showFeatured((featuredIndex - 1 + services.length) % services.length);
    } else {
      openService(services[featuredIndex]?.id);
    }
  });

  showFeatured(0);

  featuredInterval = setInterval(() => {
    showFeatured((featuredIndex + 1) % services.length);
  }, 4000);
}

function showFeatured(i) {
  const services = FEATURED_IDS.map(id => SERVICES.find(s => s.id === id)).filter(Boolean);
  const svc = services[i];
  if (!svc) return;
  featuredIndex = i;

  document.getElementById("featured-bg").style.background = svc.bgGradient;
  document.getElementById("featured-logo").innerHTML = svc.logo;
  document.getElementById("featured-name").textContent = svc.name;
  document.getElementById("featured-desc").textContent = svc.shortDesc;
  document.getElementById("featured-price").textContent = "от " + formatPrice(svc.plans[0].priceRub);

  document.querySelectorAll(".featured-dot").forEach((d, idx) => {
    d.classList.toggle("active", idx === i);
  });
}

// ============================================================
// СТРАНИЦА СЕРВИСА
// ============================================================
function openService(id) {
  const svc = SERVICES.find(s => s.id === id);
  if (!svc) return;
  selectedService = svc;
  selectedPlan = svc.plans.find(p => p.popular) || svc.plans[0];

  // Hero
  document.getElementById("svc-hero-bg").style.background = svc.bgGradient;
  document.getElementById("svc-logo").innerHTML = svc.logo;
  document.getElementById("svc-name").textContent = svc.name;
  const badge = document.getElementById("svc-badge");
  badge.textContent = svc.badge || "";
  badge.style.display = svc.badge ? "inline-block" : "none";

  // Body
  document.getElementById("svc-desc").textContent = svc.fullDesc;

  // Features
  document.getElementById("svc-features").innerHTML = svc.features.map(f =>
    `<div class="feature-item">
      <div class="feature-check">✓</div>
      <div class="feature-text">${f}</div>
    </div>`
  ).join("");

  // Plans
  renderPlans();

  // Pay button
  updatePayBtn();

  navigate("service");
}

function renderPlans() {
  const svc = selectedService;
  document.getElementById("svc-plans").innerHTML = svc.plans.map(plan => `
    <div class="plan-item ${plan.id === selectedPlan?.id ? 'selected' : ''}" data-id="${plan.id}">
      <div class="plan-radio"><div class="plan-radio-dot"></div></div>
      <div class="plan-name">
        ${plan.name}
        ${plan.popular ? '<span class="plan-popular">Хит</span>' : ''}
      </div>
      <div class="plan-prices">
        <div class="plan-price">${formatPrice(plan.priceRub)}</div>
        ${plan.origRub ? `<div class="plan-orig">${formatPrice(plan.origRub)}</div>` : ''}
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".plan-item").forEach(item => {
    item.addEventListener("click", () => {
      selectedPlan = svc.plans.find(p => p.id === item.dataset.id);
      renderPlans();
      updatePayBtn();
      haptic("light");
    });
  });
}

function updatePayBtn() {
  const btn = document.getElementById("pay-btn-text");
  if (btn && selectedPlan) {
    btn.textContent = "Оплатить " + formatPrice(selectedPlan.priceRub);
  }
}

// Pay button
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("pay-btn")?.addEventListener("click", handlePay);
});

function handlePay() {
  if (!selectedPlan || !selectedService) return;
  haptic("medium");

  const btn = document.getElementById("pay-btn");
  btn.disabled = true;
  document.getElementById("pay-btn-text").textContent = "Обработка...";

  // Симуляция оплаты (в продакшне — Telegram Payments)
  setTimeout(() => {
    // Добавляем в мои подписки
    mySubscriptions.push({
      service: selectedService,
      plan: selectedPlan,
      date: new Date().toLocaleDateString("ru-RU"),
    });
    updateMySubscriptions();

    // Экран успеха
    showSuccess();

    btn.disabled = false;
    updatePayBtn();
  }, 1500);
}

// ============================================================
// ЭКРАН УСПЕХА + КОНФЕТТИ
// ============================================================
function showSuccess() {
  if (!selectedService || !selectedPlan) return;

  document.getElementById("success-card").innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);">${selectedService.logo}</div>
      <div>
        <div style="font-weight:700;font-size:14px;">${selectedService.name}</div>
        <div style="font-size:12px;color:var(--text-muted);">${selectedPlan.name} — ${formatPrice(selectedPlan.priceRub)}</div>
      </div>
    </div>
  `;

  navigate("success");
  haptic("success");
  launchConfetti();
}

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ["#2563eb", "#f59e0b", "#22c55e", "#ef4444", "#a855f7", "#06b6d4"];
  const pieces = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    r: 4 + Math.random() * 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: 3 + Math.random() * 4,
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 8,
  }));

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vy += 0.05;
    });

    if (pieces.some(p => p.y < canvas.height)) {
      frame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
  setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 3500);
}

// ============================================================
// МОИ ПОДПИСКИ
// ============================================================
function updateMySubscriptions() {
  const empty = document.getElementById("my-empty");
  const list = document.getElementById("my-list");
  if (!empty || !list) return;

  if (mySubscriptions.length === 0) {
    empty.style.display = "flex";
    list.style.display = "none";
  } else {
    empty.style.display = "none";
    list.style.display = "flex";
    list.innerHTML = mySubscriptions.map(item => `
      <div class="my-item">
        <div class="my-item-logo">${item.service.logo}</div>
        <div class="my-item-info">
          <div class="my-item-name">${item.service.name}</div>
          <div class="my-item-plan">${item.plan.name} · ${item.date}</div>
        </div>
        <div class="my-item-status">Активна</div>
      </div>
    `).join("");
  }

  document.getElementById("stat-subs").textContent = mySubscriptions.length;
  const saved = mySubscriptions.reduce((acc, item) => acc + ((item.plan.origRub || item.plan.priceRub) - item.plan.priceRub), 0);
  document.getElementById("stat-saved").textContent = formatPrice(saved);
}
