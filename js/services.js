const LOGOS = {
  spotify:  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#1ED760"/><path fill="#000" d="M17.9 10.9c-2.8-1.7-7.4-1.8-10.1-1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.1-.9 8.2-.8 11.4 1.1.4.2.5.7.3 1-.3.4-.8.5-1.2.3zm-.2 2.8c-.3.5-.9.6-1.3.3-2.3-1.4-5.9-1.8-8.6-1-.5.1-1-.1-1.1-.6-.1-.5.1-1 .6-1.1 3.1-.9 7.1-.5 9.7 1.1.4.3.6.8.3 1.3h.4zm-1.1 2.8c-.2.4-.8.5-1.1.2-2-1.2-4.6-1.5-7.6-.8-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 3.3-.7 6.2-.4 8.4.9.4.2.7.7.6 1.2z"/></svg>`,

  netflix:  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="#141414"/><path fill="#E50914" d="M6 4h3.3L15 17V4h3v16h-3.3L9 7.5V20H6z"/></svg>`,

  youtube:  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="5" fill="#FF0000"/><path fill="#fff" d="M19.8 8.2a2 2 0 00-1.4-1.4C17.1 6.5 12 6.5 12 6.5s-5.1 0-6.4.3a2 2 0 00-1.4 1.4A20 20 0 004 12a20 20 0 00.2 3.8 2 2 0 001.4 1.4c1.3.3 6.4.3 6.4.3s5.1 0 6.4-.3a2 2 0 001.4-1.4A20 20 0 0020 12a20 20 0 00-.2-3.8zM10.2 14.6V9.4l4.2 2.6-4.2 2.6z"/></svg>`,

  chatgpt:  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="5" fill="#10a37f"/><path fill="#fff" d="M18.5 10.5a4.5 4.5 0 00-3.2-4.3A4.5 4.5 0 007.8 8.5L6 11.5a4.5 4.5 0 003.2 6.8v1.2h1.5v-1.2a4.5 4.5 0 003-1.8l1.8-3a4.5 4.5 0 00-.5-3.7v.7zm-6.5 5a3 3 0 110-6 3 3 0 010 6zm0-4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/></svg>`,

  adobe:    `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#FF0000"/><path fill="#fff" d="M13.5 4L20 20h-4l-1.3-3.5H9.3L8 20H4L10.5 4h3zm-1.5 4L10 14h4l-2-6z"/></svg>`,

  canva:    `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" fill="#00C4CC"/><path fill="#fff" d="M12 6a6 6 0 100 12A6 6 0 0012 6zm2.5 8.5a2 2 0 110-4 2 2 0 010 4zm-5 0a2 2 0 110-4 2 2 0 010 4z"/></svg>`,

  notion:   `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#fff"/><path fill="#000" d="M5 4.5c.7.6 1 .6 2.4.5l11.2-.7v.3L16.5 6c-.4-.3-.9-.6-1.8-.5L3.8 6.2c-.4 0-.5.3-.3.4zM5.7 7V18c0 .6.3.9 1 .8l12.3-.7c.7 0 .8-.5.8-1V6.3c0-.5-.2-.8-.6-.7L6.3 6.5c-.5.1-.6.3-.6.8zm11.8.8c.1.3 0 .7-.4.7l-.6.1V17c-.5.3-1 .5-1.3.5-.6 0-.8-.2-1.3-.8L10.5 11v5.8l1 .2s0 .7-1 .7l-2.7.2c-.1-.2 0-.6.3-.6l.7-.2V9.3l-.8-.1c-.1-.4.1-.9.7-1l2.9-.2L15.5 14V9l-1-.1c-.1-.4.2-.8.6-.8z"/></svg>`,

  figma:    `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#1e1e1e"/><path fill="#F24E1E" d="M8 2h4a4 4 0 010 8H8z"/><path fill="#FF7262" d="M12 2h4a4 4 0 010 8h-4z"/><path fill="#A259FF" d="M8 10h4a4 4 0 010 8H8z"/><path fill="#0ACF83" d="M8 18h4a4 4 0 010 4H8z"/><circle cx="16" cy="14" r="4" fill="#1ABCFE"/></svg>`,

  duolingo: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#58CC02"/><ellipse cx="9" cy="11" rx="1.8" ry="1.8" fill="#fff"/><ellipse cx="15" cy="11" rx="1.8" ry="1.8" fill="#fff"/><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" d="M8.5 15.5c.8 1 4.2 1 5 0"/><path fill="none" stroke="#fff" stroke-width="1.5" d="M4 8C4 4.7 7.6 2 12 2s8 2.7 8 6v7c0 2.8-2 5-4.5 5H12l-1.5 2L9 20H8.5C6 20 4 17.8 4 15z"/></svg>`,
};

const SERVICES = [
  {
    id: "spotify", name: "Spotify", category: "music",
    color: "#1ED760", bgGradient: "linear-gradient(135deg, #0f3d1e 0%, #051a0d 100%)",
    logo: LOGOS.spotify, badge: "Хит", shortDesc: "Музыка без границ",
    fullDesc: "Более 100 млн треков, подкасты и аудиокниги. Слушай без рекламы в отличном качестве.",
    features: ["100+ млн треков", "Скачивание офлайн", "Без рекламы", "Высокое качество звука"],
    plans: [
      { id: "1m", name: "1 месяц", priceRub: 299, popular: false },
      { id: "3m", name: "3 месяца", priceRub: 799, origRub: 897, popular: true },
      { id: "12m", name: "12 месяцев", priceRub: 2499, origRub: 3588, popular: false },
    ],
    payNote: "Доступ активируется в течение 15 минут",
  },
  {
    id: "netflix", name: "Netflix", category: "streaming",
    color: "#E50914", bgGradient: "linear-gradient(135deg, #3d0000 0%, #1a0000 100%)",
    logo: LOGOS.netflix, badge: "Топ", shortDesc: "Фильмы и сериалы",
    fullDesc: "Тысячи фильмов, сериалов и документальных проектов в 4K качестве.",
    features: ["4K Ultra HD", "До 4 экранов", "Загрузка контента", "Оригинальные проекты"],
    plans: [
      { id: "1m", name: "1 месяц", priceRub: 499, popular: false },
      { id: "3m", name: "3 месяца", priceRub: 1399, origRub: 1497, popular: true },
      { id: "12m", name: "12 месяцев", priceRub: 4999, origRub: 5988, popular: false },
    ],
    payNote: "Отправим данные для входа",
  },
  {
    id: "youtube", name: "YouTube Premium", category: "streaming",
    color: "#FF0000", bgGradient: "linear-gradient(135deg, #3d0000 0%, #1a0000 100%)",
    logo: LOGOS.youtube, badge: null, shortDesc: "YouTube без рекламы",
    fullDesc: "Смотри YouTube без рекламы, скачивай видео и слушай фоновое воспроизведение.",
    features: ["Без рекламы", "Фоновое воспроизведение", "Скачивание видео", "YouTube Music включён"],
    plans: [
      { id: "1m", name: "1 месяц", priceRub: 349, popular: false },
      { id: "3m", name: "3 месяца", priceRub: 949, origRub: 1047, popular: true },
      { id: "12m", name: "12 месяцев", priceRub: 3299, origRub: 4188, popular: false },
    ],
    payNote: "Подписка оформляется на ваш аккаунт",
  },
  {
    id: "chatgpt", name: "ChatGPT Plus", category: "ai",
    color: "#10a37f", bgGradient: "linear-gradient(135deg, #0d2d26 0%, #051a14 100%)",
    logo: LOGOS.chatgpt, badge: "AI", shortDesc: "GPT-4 без ограничений",
    fullDesc: "Доступ к GPT-4o, DALL·E 3, Advanced Data Analysis и приоритетный доступ без очередей.",
    features: ["GPT-4o доступ", "DALL·E 3 генерация", "Анализ данных", "Приоритетный доступ"],
    plans: [
      { id: "1m", name: "1 месяц", priceRub: 1799, popular: false },
      { id: "3m", name: "3 месяца", priceRub: 4999, origRub: 5397, popular: true },
      { id: "12m", name: "12 месяцев", priceRub: 17999, origRub: 21588, popular: false },
    ],
    payNote: "Потребуется аккаунт OpenAI",
  },
  {
    id: "adobe", name: "Adobe Creative", category: "tools",
    color: "#FF0000", bgGradient: "linear-gradient(135deg, #3d0000 0%, #1a0000 100%)",
    logo: LOGOS.adobe, badge: "Pro", shortDesc: "Photoshop, Illustrator и др.",
    fullDesc: "Полный доступ к Adobe Creative Cloud: Photoshop, Illustrator, Premiere Pro и 20+ приложений.",
    features: ["20+ приложений", "100 ГБ облако", "Adobe Fonts", "Обновления включены"],
    plans: [
      { id: "1m", name: "1 месяц", priceRub: 2499, popular: false },
      { id: "3m", name: "3 месяца", priceRub: 6999, origRub: 7497, popular: true },
      { id: "12m", name: "12 месяцев", priceRub: 24999, origRub: 29988, popular: false },
    ],
    payNote: "Нужен Adobe ID",
  },
  {
    id: "canva", name: "Canva Pro", category: "tools",
    color: "#00C4CC", bgGradient: "linear-gradient(135deg, #003d3f 0%, #001a1b 100%)",
    logo: LOGOS.canva, badge: null, shortDesc: "Дизайн для всех",
    fullDesc: "Профессиональные шаблоны, удаление фона, планировщик соцсетей и 100 ГБ хранилища.",
    features: ["100 млн+ шаблонов", "Удаление фона", "Планировщик SMM", "Брендбук"],
    plans: [
      { id: "1m", name: "1 месяц", priceRub: 699, popular: false },
      { id: "3m", name: "3 месяца", priceRub: 1899, origRub: 2097, popular: true },
      { id: "12m", name: "12 месяцев", priceRub: 6499, origRub: 8388, popular: false },
    ],
    payNote: "Активация в течение часа",
  },
  {
    id: "notion", name: "Notion Plus", category: "tools",
    color: "#ffffff", bgGradient: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
    logo: LOGOS.notion, badge: null, shortDesc: "База знаний и задачи",
    fullDesc: "Неограниченные блоки, версионирование, гостевой доступ и интеграции для команд.",
    features: ["Без лимита блоков", "История версий", "Гостевой доступ", "API интеграции"],
    plans: [
      { id: "1m", name: "1 месяц", priceRub: 599, popular: false },
      { id: "3m", name: "3 месяца", priceRub: 1599, origRub: 1797, popular: true },
      { id: "12m", name: "12 месяцев", priceRub: 5499, origRub: 7188, popular: false },
    ],
    payNote: "Потребуется Notion аккаунт",
  },
  {
    id: "figma", name: "Figma Professional", category: "tools",
    color: "#F24E1E", bgGradient: "linear-gradient(135deg, #3d1200 0%, #1a0800 100%)",
    logo: LOGOS.figma, badge: null, shortDesc: "Дизайн интерфейсов",
    fullDesc: "Неограниченные проекты, командные библиотеки, продвинутые прототипы и история версий.",
    features: ["Неограниченные проекты", "Командные библиотеки", "Прототипирование", "История версий"],
    plans: [
      { id: "1m", name: "1 месяц", priceRub: 799, popular: false },
      { id: "3m", name: "3 месяца", priceRub: 2199, origRub: 2397, popular: true },
      { id: "12m", name: "12 месяцев", priceRub: 7999, origRub: 9588, popular: false },
    ],
    payNote: "Нужен Figma аккаунт",
  },
  {
    id: "duolingo", name: "Duolingo Super", category: "tools",
    color: "#58CC02", bgGradient: "linear-gradient(135deg, #1a3d00 0%, #0d1f00 100%)",
    logo: LOGOS.duolingo, badge: null, shortDesc: "Изучение языков",
    fullDesc: "Без рекламы, неограниченные жизни, офлайн уроки и персонализированная практика.",
    features: ["Без рекламы", "Неограниченные жизни", "Офлайн уроки", "Персонализация"],
    plans: [
      { id: "1m", name: "1 месяц", priceRub: 249, popular: false },
      { id: "3m", name: "3 месяца", priceRub: 649, origRub: 747, popular: true },
      { id: "12m", name: "12 месяцев", priceRub: 1999, origRub: 2988, popular: false },
    ],
    payNote: "Активируется через ваш аккаунт Duolingo",
  },
];

function formatPrice(rub) {
  return rub.toLocaleString('ru-RU') + ' ₽';
}
