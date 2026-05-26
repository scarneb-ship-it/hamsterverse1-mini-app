/* ═══════════════════════════════════════════════════════════
   Games Verse — script.js
   
   ЧТО ИЗМЕНЕНО по сравнению со старым кодом:
   ─────────────────────────────────────────
   1. ИГРА: 2048 → Кликер-симулятор монет.
      Почему кликер? Он удерживает намного лучше: бесконечный
      прогресс, апгрейды, пассивный доход, уровни и XP.
      У игрока всегда есть цель (следующий апгрейд/уровень).
   
   2. РЕФЕРАЛКА: Логика fetch(WORKER_URL) сохранена полностью.
      start_param → ref_userId — работает так же.
      Визуально вынесена в отдельный экран профиля.
      Награды теперь влияют на саму игру (бонус +50% к клику,
      золотая кнопка).
   
   3. ДИЗАЙН: Тёмная «космическая» тема вместо смешанной.
      Один файл CSS, без библиотек.
   
   4. ХРАНИЛИЩЕ: localStorage сохраняет состояние кликера
      (монеты, уровень, апгрейды, клики всего).
      Реферальные данные — через WORKER_URL как и раньше.
   
   5. НАВИГАЦИЯ: 4 вкладки, плавное переключение без скролла.
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Конфигурация (сохранена из старого кода) ─── */
const BOT_USERNAME = 'khadron_bot';
const WORKER_URL   = 'https://gamesverse-bot.scarneb.workers.dev';

/* ─── Состояние приложения ─── */
let currentUserId  = null;
let referralInfo   = { count: 0, frame: false, undo: false, neon: false };

/* ─── Данные игр (сохранены из старого кода) ─── */
const GAMES_DATA = [
    {
        id: 0,
        name: 'Pixel World',
        link: 'https://t.me/pixelworld/play?startapp=r6823288584',
        desc: 'Первый 3D-шутер в Telegram',
        rating: 4.9, players: '34K',
        image: 'images/photo_2026-02-17_13-44-55.jpg',
        emoji: '🌍', badge: 'Beta', highlight: true
    },
    {
        id: 1,
        name: 'Hamster GameDev',
        link: 'https://t.me/Hamster_GAme_Dev_bot/start?startapp=kentId6823288584',
        desc: 'Создай свою студию',
        rating: 4.7, players: '368K',
        image: 'images/hamster-gamedev.jpg',
        emoji: '🎮'
    },
    {
        id: 2,
        name: 'Hamster King',
        link: 'https://t.me/hamsterking_game_bot?startapp=6823288584',
        desc: 'Стань королём хомяков',
        rating: 4.2, players: '188K',
        image: 'images/hamster-king.jpg',
        emoji: '👑'
    },
    {
        id: 3,
        name: 'Hamster Fight Club',
        link: 'https://t.me/hamster_fightclub_bot?startapp=NWE1YjA2YWUtZTAyMS01ZjA1LTg4ZTYtMGZmZjUwNDQwNjU5',
        desc: 'Бойцовский клуб хомяков',
        rating: 4.9, players: '85K',
        image: 'images/hamster-fightclub.jpg',
        emoji: '🥊'
    },
    {
        id: 4,
        name: 'BitQuest',
        link: 'https://t.me/BitquestGameSBot/start?startapp=kentId_6823288584',
        desc: 'Приключения в мире крипты',
        rating: 3.8, players: '281K',
        image: 'images/bitquest.jpg',
        emoji: '💰'
    }
];

/* ─── Данные бирж (сохранены из старого кода) ─── */
const EXCHANGES_DATA = [
    {
        id: 1, name: 'Bybit',
        url: 'https://www.bybit.com/invite?ref=57KXPMO',
        desc: 'Продвинутая торговая платформа',
        image: 'images/bybit.jpg', emoji: '💱'
    },
    {
        id: 2, name: 'BingX',
        url: 'https://bingxdao.com/referral-program/V2TZVA?activityId=g_1529293499868241925',
        desc: 'Социальная торговля и копирование',
        image: 'images/bingx.jpg', emoji: '📈'
    },
    {
        id: 3, name: 'Bitget',
        url: 'https://www.bitgetapps.com/ru/referral/register?clacCode=40FSP70H',
        desc: 'Инновационная торговая платформа',
        image: 'images/bitget.jpg', emoji: '⚡'
    },
    {
        id: 4, name: 'MEXC',
        url: 'https://promote.mexc.com/r/aTSLfdm54W',
        desc: 'Глобальная биржа с низкими комиссиями',
        image: 'images/mexc.jpg', emoji: '🌍'
    }
];

/* ═══════════════════════════════════════════════════════════
   КЛИКЕР — Конфигурация апгрейдов
═══════════════════════════════════════════════════════════ */
const UPGRADES_CONFIG = [
    {
        id: 'click_power',
        icon: '👆',
        name: 'Сила клика',
        desc: 'Монет за один тап',
        maxLevel: 20,
        baseCost: 50,
        costMult: 1.6,
        effect: (level) => level + 1,          // монет за клик
        effectLabel: (level) => `+${level + 1} за клик`
    },
    {
        id: 'auto_miner',
        icon: '⛏️',
        name: 'Авто-майнер',
        desc: 'Пассивный доход в секунду',
        maxLevel: 15,
        baseCost: 200,
        costMult: 2.0,
        effect: (level) => level * 2,          // монет/сек
        effectLabel: (level) => `+${level * 2}/сек`
    },
    {
        id: 'lucky_bonus',
        icon: '🍀',
        name: 'Удача',
        desc: 'Шанс x3 за один клик',
        maxLevel: 10,
        baseCost: 500,
        costMult: 2.5,
        effect: (level) => Math.min(level * 5, 45), // %
        effectLabel: (level) => `${Math.min(level * 5, 45)}% шанс x3`
    },
    {
        id: 'coin_magnet',
        icon: '🧲',
        name: 'Монетный магнит',
        desc: 'Бонус к пассивному доходу',
        maxLevel: 10,
        baseCost: 1000,
        costMult: 2.8,
        effect: (level) => 1 + level * 0.2,    // множитель пассива
        effectLabel: (level) => `×${(1 + level * 0.2).toFixed(1)} к пассиву`
    }
];

/* ─── Конфигурация уровней ─── */
const LEVELS = [0, 100, 300, 700, 1500, 3000, 6000, 12000, 25000, 50000, 100000];

/* ─── Состояние кликера ─── */
let clickerState = {
    coins:         0,       // текущие монеты
    totalCoins:    0,       // всего заработано за всё время
    totalClicks:   0,       // всего кликов
    sessionEarned: 0,       // заработано за текущую сессию
    level:         1,
    xp:            0,
    upgrades: {             // уровни апгрейдов
        click_power: 0,
        auto_miner: 0,
        lucky_bonus: 0,
        coin_magnet: 0
    }
};

/* ─── Вычисляемые параметры кликера ─── */
function getClickValue() {
    const base = UPGRADES_CONFIG.find(u => u.id === 'click_power').effect(clickerState.upgrades.click_power);
    // Бонус +50% за 5 рефералов
    const refBonus = referralInfo.undo ? 1.5 : 1;
    return Math.ceil(base * refBonus);
}

function getPassiveRate() {
    const minerLevel  = clickerState.upgrades.auto_miner;
    const magnetLevel = clickerState.upgrades.coin_magnet;
    const base   = UPGRADES_CONFIG.find(u => u.id === 'auto_miner').effect(minerLevel);
    const mult   = UPGRADES_CONFIG.find(u => u.id === 'coin_magnet').effect(magnetLevel);
    return Math.round(base * mult * 10) / 10;
}

function getLuckyChance() {
    return UPGRADES_CONFIG.find(u => u.id === 'lucky_bonus').effect(clickerState.upgrades.lucky_bonus);
}

function getUpgradeCost(upg) {
    const level = clickerState.upgrades[upg.id];
    if (level >= upg.maxLevel) return Infinity;
    return Math.ceil(upg.baseCost * Math.pow(upg.costMult, level));
}

/* ─── XP и уровень ─── */
function getXpForLevel(level) {
    return LEVELS[Math.min(level, LEVELS.length - 1)] || LEVELS[LEVELS.length - 1] * Math.pow(2, level - LEVELS.length + 1);
}

function addXp(amount) {
    const maxLevel = LEVELS.length;
    if (clickerState.level >= maxLevel) return;
    clickerState.xp += amount;
    const required = getXpForLevel(clickerState.level);
    if (clickerState.xp >= required) {
        clickerState.xp -= required;
        clickerState.level++;
        showToast(`🎉 Уровень ${clickerState.level}!`);
    }
    updateXpBar();
}

/* ═══════════════════════════════════════════════════════════
   ИНИЦИАЛИЗАЦИЯ
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    // Скрываем splash после небольшой задержки
    setTimeout(() => {
        document.getElementById('splash').classList.add('hide');
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'flex';
        }, 500);
    }, 1200);

    initTelegram();
    loadClickerState();
    renderGames();
    renderExchanges();
    renderUpgrades();
    setupNavigation();
    setupClanBanner();
    setupShareButton();
    setupSubCard();
    setupSubModal();
    startPassiveIncome();
    startAutoSave();
}

/* ─── Telegram WebApp ─── */
function initTelegram() {
    if (!window.Telegram?.WebApp) return;
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const user = tg.initDataUnsafe?.user;
    if (user) {
        currentUserId = user.id;
        updateProfileDisplay(user);
        sendMiniAppStat(user); // Сохранена логика из старого кода
        fetchReferralInfo(user.id);
    }
}

/* ─── Отправка статистики (сохранена из старого кода) ─── */
async function sendMiniAppStat(user) {
    if (!user?.id) return;
    let ref = null;
    try {
        const startParam = window.Telegram?.WebApp?.initDataUnsafe?.start_param;
        if (startParam) ref = startParam;
    } catch (e) {}

    try {
        await fetch(WORKER_URL + '/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId:    user.id.toString(),
                firstName: user.first_name || '',
                username:  user.username || '',
                ref:       ref || null
            })
        });
    } catch (err) {
        console.error('Ошибка отправки стата:', err);
    }
}

/* ─── Загрузка реферальной инфы (сохранена из старого кода) ─── */
async function fetchReferralInfo(userId) {
    try {
        const res  = await fetch(`${WORKER_URL}/referral-info?userId=${userId}`);
        const data = await res.json();
        referralInfo = {
            count: data.count  || 0,
            frame: data.frame  || false,
            undo:  data.undo   || false,  // теперь: +50% к клику (было: отмена хода)
            neon:  data.neon   || false   // теперь: золотая кнопка
        };
    } catch (err) {
        referralInfo = { count: 0, frame: false, undo: false, neon: false };
    }
    updateReferralUI();
    // Применяем реферальные бонусы к игре
    applyReferralBonuses();
}

/* ─── Применение реферальных бонусов к кликеру ─── */
function applyReferralBonuses() {
    // Золотая кнопка (10 друзей)
    const coinBtn = document.getElementById('coin-btn');
    if (coinBtn) {
        if (referralInfo.neon) {
            coinBtn.classList.add('golden');
        } else {
            coinBtn.classList.remove('golden');
        }
    }
    // Обновляем апгрейды (бонус к клику пересчитывается через getClickValue)
    renderUpgrades();
}

/* ═══════════════════════════════════════════════════════════
   ПРОФИЛЬ
═══════════════════════════════════════════════════════════ */
function updateProfileDisplay(user) {
    const el = (id) => document.getElementById(id);
    el('profile-name').textContent = user.first_name + (user.last_name ? ' ' + user.last_name : '');
    el('profile-handle').textContent = user.username ? '@' + user.username : 'Telegram User';

    if (user.is_premium) el('premium-badge').style.display = 'inline-block';

    const img = el('avatar-img');
    const letter = el('avatar-letter');
    if (user.photo_url) {
        img.src = user.photo_url;
        img.style.display = 'block';
        img.onerror = () => {
            img.style.display = 'none';
            letter.textContent = (user.first_name || 'U')[0].toUpperCase();
        };
        letter.style.display = 'none';
    } else {
        img.style.display = 'none';
        letter.textContent = (user.first_name || 'U')[0].toUpperCase();
    }

    // Рамка профиля (реферальный бонус за 3 друга)
    if (referralInfo.frame) {
        el('profile-avatar').style.boxShadow =
            '0 0 0 3px #ffd700, 0 0 20px rgba(255,215,0,0.5)';
    }
}

/* ─── Обновление UI реферальной программы ─── */
function updateReferralUI() {
    const count = referralInfo.count || 0;

    // Счётчик друзей
    const badge = document.getElementById('ref-count-badge');
    if (badge) badge.textContent = `${count} ${pluralFriends(count)}`;

    // Прогресс-бар (0–10)
    const progress = Math.min(100, (count / 10) * 100);
    const bar = document.getElementById('ref-progress');
    if (bar) bar.style.width = progress + '%';

    // Лесенка наград
    updateRung('rung-3',  count >= 3,  '✅');
    updateRung('rung-5',  count >= 5,  '✅');
    updateRung('rung-10', count >= 10, '✅');

    // Обновляем статистику на экране профиля
    updateProfileStats();
}

function updateRung(id, unlocked, icon) {
    const el = document.getElementById(id);
    if (!el) return;
    if (unlocked) {
        el.classList.add('unlocked');
        const status = document.getElementById(id + '-status');
        if (status) status.textContent = icon;
    }
}

function pluralFriends(n) {
    if (n % 10 === 1 && n % 100 !== 11) return 'друг';
    if (n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)) return 'друга';
    return 'друзей';
}

function updateProfileStats() {
    const el = (id) => document.getElementById(id);
    const formatNum = (n) => n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n >= 1e3 ? (n/1e3).toFixed(1)+'K' : String(Math.floor(n));
    if (el('pstat-coins'))  el('pstat-coins').textContent  = formatNum(clickerState.totalCoins);
    if (el('pstat-clicks')) el('pstat-clicks').textContent = formatNum(clickerState.totalClicks);
    if (el('pstat-level'))  el('pstat-level').textContent  = clickerState.level;
}

/* ═══════════════════════════════════════════════════════════
   КЛИКЕР — Логика
═══════════════════════════════════════════════════════════ */

/* ─── Клик по монете ─── */
function handleCoinClick(e) {
    vibrate();

    let earned = getClickValue();

    // Проверка удачи (тройной клик)
    const lucky = getLuckyChance();
    const isLucky = lucky > 0 && Math.random() * 100 < lucky;
    if (isLucky) {
        earned *= 3;
        spawnFloat(e, `×3 🍀`, 'var(--cyan)');
    } else {
        spawnFloat(e, `+${earned}`, 'var(--gold)');
    }

    addCoins(earned);
    clickerState.totalClicks++;
    addXp(1);

    // Пульс-эффект на кнопке
    spawnPulse();

    updateClickerUI();
    scheduleRender();
}

function addCoins(amount) {
    clickerState.coins         += amount;
    clickerState.totalCoins    += amount;
    clickerState.sessionEarned += amount;
}

/* ─── Летящие цифры ─── */
function spawnFloat(e, text, color) {
    const container = document.getElementById('float-container');
    if (!container) return;

    const rect   = container.getBoundingClientRect();
    const x      = (e.clientX || rect.left + rect.width/2)  - rect.left;
    const y      = (e.clientY || rect.top  + rect.height/2) - rect.top;

    const div = document.createElement('div');
    div.className = 'float-num';
    div.textContent = text;
    div.style.left  = x + 'px';
    div.style.top   = y + 'px';
    div.style.color = color;
    container.appendChild(div);
    setTimeout(() => div.remove(), 950);
}

/* ─── Пульс-кольцо ─── */
function spawnPulse() {
    const area = document.querySelector('.coin-btn-area');
    if (!area) return;
    const pulse = document.createElement('div');
    pulse.className = 'coin-pulse';
    area.appendChild(pulse);
    setTimeout(() => pulse.remove(), 500);
}

/* ─── Пассивный доход ─── */
function startPassiveIncome() {
    setInterval(() => {
        const rate = getPassiveRate();
        if (rate > 0) {
            addCoins(rate);
            updateClickerUI();
        }
    }, 1000);
}

/* ─── Авто-сохранение ─── */
function startAutoSave() {
    setInterval(saveClickerState, 5000);
}

/* ─── Обновление UI кликера ─── */
let renderPending = false;
function scheduleRender() {
    if (!renderPending) {
        renderPending = true;
        requestAnimationFrame(() => {
            updateClickerUI();
            renderPending = false;
        });
    }
}

function updateClickerUI() {
    const formatNum = (n) => {
        n = Math.floor(n);
        if (n >= 1e9) return (n/1e9).toFixed(2) + 'B';
        if (n >= 1e6) return (n/1e6).toFixed(2) + 'M';
        if (n >= 1e3) return (n/1e3).toFixed(1) + 'K';
        return String(n);
    };

    const el = (id) => document.getElementById(id);
    if (el('coins-display'))  el('coins-display').textContent  = formatNum(clickerState.coins);
    if (el('level-badge'))    el('level-badge').textContent    = `Ур. ${clickerState.level}`;
    if (el('passive-rate'))   el('passive-rate').textContent   = getPassiveRate();
    if (el('session-earned')) el('session-earned').textContent = `Сессия: ${formatNum(clickerState.sessionEarned)}`;
    updateXpBar();
    updateProfileStats();
}

function updateXpBar() {
    const bar   = document.getElementById('xp-bar');
    const label = document.getElementById('xp-label');
    if (!bar || !label) return;
    const required = getXpForLevel(clickerState.level);
    const pct = Math.min(100, (clickerState.xp / required) * 100);
    bar.style.width = pct + '%';
    label.textContent = `${Math.floor(clickerState.xp)} / ${required} XP`;
}

/* ─── Рендер апгрейдов ─── */
function renderUpgrades() {
    const grid = document.getElementById('upgrades-grid');
    if (!grid) return;

    grid.innerHTML = UPGRADES_CONFIG.map(upg => {
        const level  = clickerState.upgrades[upg.id];
        const cost   = getUpgradeCost(upg);
        const isMax  = level >= upg.maxLevel;
        const canBuy = !isMax && clickerState.coins >= cost;
        const effectText = upg.effectLabel(level + (isMax ? 0 : 0));

        return `
        <div class="upgrade-card ${isMax ? 'maxed' : ''}" data-upg-id="${upg.id}">
            <div class="upg-icon">${upg.icon}</div>
            <div class="upg-body">
                <div class="upg-name">${upg.name}</div>
                <div class="upg-desc">${upg.desc}</div>
                <div class="upg-level">${isMax ? '✨ МАКС' : effectText} · Ур. ${level}/${upg.maxLevel}</div>
            </div>
            <button class="upg-btn ${isMax ? 'maxed-label' : canBuy ? '' : 'cant-afford'}"
                    data-upg-id="${upg.id}" ${isMax || !canBuy ? 'disabled' : ''}>
                ${isMax ? 'МАКС' : formatCoins(cost) + ' 🪙'}
            </button>
        </div>`;
    }).join('');

    // Обработчики кнопок апгрейда
    grid.querySelectorAll('.upg-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            buyUpgrade(btn.dataset.upgId);
        });
    });
}

function formatCoins(n) {
    if (n >= 1e9) return (n/1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n/1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n/1e3).toFixed(0) + 'K';
    return String(n);
}

/* ─── Покупка апгрейда ─── */
function buyUpgrade(upgId) {
    const upg  = UPGRADES_CONFIG.find(u => u.id === upgId);
    if (!upg) return;
    const level = clickerState.upgrades[upgId];
    if (level >= upg.maxLevel) return;
    const cost = getUpgradeCost(upg);
    if (clickerState.coins < cost) { showToast('Недостаточно монет 🪙'); return; }

    vibrate();
    clickerState.coins -= cost;
    clickerState.upgrades[upgId]++;
    showToast(`${upg.icon} ${upg.name} улучшен! (Ур. ${clickerState.upgrades[upgId]})`);
    renderUpgrades();
    updateClickerUI();
    saveClickerState();
}

/* ─── Сохранение / загрузка (localStorage) ─── */
function saveClickerState() {
    try {
        localStorage.setItem('gv_clicker_v2', JSON.stringify(clickerState));
    } catch (e) {}
}

function loadClickerState() {
    try {
        const saved = localStorage.getItem('gv_clicker_v2');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Сброс session-earned при новой сессии
            parsed.sessionEarned = 0;
            Object.assign(clickerState, parsed);
        }
    } catch (e) {}
    updateClickerUI();
}

/* ═══════════════════════════════════════════════════════════
   РЕНДЕР ИГРЫ И БИРЖ
═══════════════════════════════════════════════════════════ */
function renderGames() {
    const list = document.getElementById('games-list');
    if (!list) return;
    list.innerHTML = GAMES_DATA.map(g => `
        <div class="game-card ${g.highlight ? 'highlight' : ''}">
            <div class="game-thumb">
                <span style="position:relative;z-index:1">${g.emoji}</span>
                <img src="${g.image}" alt="${g.name}" loading="lazy"
                     onerror="this.style.display='none'">
            </div>
            <div class="game-body">
                <div class="game-name">
                    ${escHtml(g.name)}
                    ${g.badge ? `<span class="game-badge">${g.badge}</span>` : ''}
                </div>
                <div class="game-desc">${escHtml(g.desc)}</div>
                <div class="game-meta">
                    <span class="game-rating">${renderStars(g.rating)} ${g.rating}</span>
                    <span class="game-players">👥 ${g.players}</span>
                </div>
            </div>
            <button class="play-btn" data-link="${g.link}">Играть</button>
        </div>
    `).join('');

    list.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            vibrate();
            openLink(btn.dataset.link, true);
        });
    });
}

function renderExchanges() {
    const list = document.getElementById('exchanges-list');
    if (!list) return;
    list.innerHTML = EXCHANGES_DATA.map(ex => `
        <div class="exchange-card">
            <div class="ex-logo">
                <span style="position:relative;z-index:1">${ex.emoji}</span>
                <img src="${ex.image}" alt="${ex.name}" loading="lazy"
                     onerror="this.style.display='none'">
            </div>
            <div class="ex-info">
                <h3>${escHtml(ex.name)}</h3>
                <p>${escHtml(ex.desc)}</p>
            </div>
            <button class="ex-btn" data-url="${ex.url}">Перейти</button>
        </div>
    `).join('');

    list.querySelectorAll('.ex-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            vibrate();
            openLink(btn.dataset.url, false);
        });
    });
}

function renderStars(rating) {
    const full  = Math.floor(rating);
    const empty = 5 - Math.ceil(rating);
    let s = '';
    for (let i = 0; i < full; i++) s += '★';
    if (rating % 1 >= 0.5) s += '½';  // упрощённо
    for (let i = 0; i < empty; i++) s += '<span class="empty">★</span>';
    return `<span class="stars">${s}</span>`;
}

/* ═══════════════════════════════════════════════════════════
   НАВИГАЦИЯ
═══════════════════════════════════════════════════════════ */
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const screens = document.querySelectorAll('.screen');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.screen;
            vibrate();

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            screens.forEach(s => s.classList.remove('active'));
            const targetScreen = document.getElementById(`screen-${target}`);
            if (targetScreen) targetScreen.classList.add('active');

            // При открытии профиля — обновляем данные
            if (target === 'profile' && currentUserId) {
                fetchReferralInfo(currentUserId);
            }
            // При открытии кликера — рендерим апгрейды
            if (target === 'game') {
                renderUpgrades();
                updateClickerUI();
            }
        });
    });

    // Кнопка клика на монету
    const coinBtn = document.getElementById('coin-btn');
    if (coinBtn) {
        coinBtn.addEventListener('click', handleCoinClick);
        coinBtn.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    }
}

/* ═══════════════════════════════════════════════════════════
   БАННЕР КЛАНА (сохранён из старого кода)
═══════════════════════════════════════════════════════════ */
function setupClanBanner() {
    const banner = document.getElementById('clan-banner');
    if (!banner) return;
    banner.addEventListener('click', () => {
        vibrate();
        openLink('https://t.me/pixelworld/play?startapp=eyJ0ZWFtIjoyN30', true);
    });
}

/* ═══════════════════════════════════════════════════════════
   КНОПКА ПОДЕЛИТЬСЯ (реферальная механика сохранена)
═══════════════════════════════════════════════════════════ */
function setupShareButton() {
    const btn = document.getElementById('share-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        vibrate();
        const botUrl = currentUserId
            ? `https://t.me/${BOT_USERNAME}?start=ref_${currentUserId}`
            : `https://t.me/${BOT_USERNAME}`;
        const shareText = '🎮 Зарабатывай монеты в Games Verse — кликер, игры и биржи в одном месте!';

        if (window.Telegram?.WebApp) {
            const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(botUrl)}&text=${encodeURIComponent(shareText)}`;
            try {
                window.Telegram.WebApp.openTelegramLink(shareUrl);
            } catch {
                copyToClipboard(botUrl);
            }
        } else if (navigator.share) {
            navigator.share({ title: 'Games Verse', text: shareText, url: botUrl })
                .catch(() => copyToClipboard(botUrl));
        } else {
            copyToClipboard(botUrl);
        }
    });
}

/* ─── Кнопка «Подписаться» в профиле ─── */
function setupSubCard() {
    const btn = document.getElementById('sub-go-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        vibrate();
        document.getElementById('sub-modal').style.display = 'flex';
    });
}

/* ─── Модальное окно подписки (логика сохранена из старого кода) ─── */
function setupSubModal() {
    const modal    = document.getElementById('sub-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const checkBtn = document.getElementById('modal-check-btn');
    const statusEl = document.getElementById('modal-status');

    if (!modal) return;

    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    if (closeBtn) closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });

    if (checkBtn) {
        checkBtn.addEventListener('click', async () => {
            statusEl.textContent = 'Проверяем...';
            try {
                const res  = await fetch(`${WORKER_URL}/check-subscription?userId=${currentUserId}`);
                const data = await res.json();
                if (data.subscribed) {
                    statusEl.textContent = '✅ Вы подписаны! Спасибо!';
                    setTimeout(() => { modal.style.display = 'none'; statusEl.textContent = ''; }, 1500);
                } else {
                    statusEl.textContent = '❌ Подписка не найдена. Подпишитесь на канал.';
                }
            } catch {
                statusEl.textContent = 'Ошибка проверки. Попробуйте позже.';
            }
        });
    }
}

/* ═══════════════════════════════════════════════════════════
   ВСПОМОГАТЕЛЬНЫЕ УТИЛИТЫ
═══════════════════════════════════════════════════════════ */

/* ─── Открыть ссылку ─── */
function openLink(url, isTelegram) {
    if (!url) return;
    if (window.Telegram?.WebApp) {
        if (isTelegram && url.startsWith('https://t.me/')) {
            window.Telegram.WebApp.openTelegramLink(url);
        } else {
            window.Telegram.WebApp.openLink(url);
        }
    } else {
        window.open(url, '_blank');
    }
}

/* ─── Копирование в буфер ─── */
function copyToClipboard(text) {
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Ссылка скопирована! 🔗');
    } catch {
        showToast('Не удалось скопировать');
    }
}

/* ─── Тост ─── */
let toastTimer = null;
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ─── Вибрация ─── */
function vibrate() {
    if (navigator.vibrate) navigator.vibrate(30);
}

/* ─── Экранирование HTML ─── */
function escHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
