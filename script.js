document.addEventListener('DOMContentLoaded', function() {

    /* ========== DATA ========== */
    const DAYS = {
        A: {
            title: 'День A · Верх (тяговый)',
            subtitle: 'Турник, тяги, лопатки. Фокус: нижняя трапеция, ромбовидные, передняя зубчатая.',
            exercises: [
                { num: 'TE', name: 'Разгибание грудного отдела на валике (разминка)', sets: 1, mode: 'reps', repsLabel: '10', rest: 20, restLabel: '20 сек', tech: 'Валик под верхнюю спину. Руки за голову. Мягко разгибайся, не прогибай поясницу.' },
                { num: 'SPU', name: 'Лопаточные подтягивания (активация)', sets: 2, mode: 'reps', repsLabel: '8', rest: 30, restLabel: '30 сек', tech: 'Вис на турнике, руки прямые. Тяни лопатки вниз к тазу. Держи 1 сек внизу. Локти не сгибаются.' },

                { num: 'PU', name: 'Подтягивания / негативы', sets: 4, mode: 'reps', repsLabel: '5–8 (RPE 7)', rest: 120, restLabel: '120 сек', tech: 'Начни с активного виса: лопатки вниз. Тяни локти вниз, не подбородок вверх. Не выдвигай голову вперёд.' },
                { num: 'ROW1', name: 'Тяга гантели одной рукой в наклоне (левая / правая)', sets: 3, mode: 'reps', repsLabel: '8–10 на сторону', sides: true, rest: 90, restLabel: '90 сек', tech: 'Колено и рука на опоре, спина прямая. Локоть к поясу, пауза 1 сек, лопатка вниз и к позвоночнику.' },
                { num: 'PP', name: 'Отжимания с протракцией', sets: 3, mode: 'reps', repsLabel: '10–15', rest: 60, restLabel: '60 сек', tech: 'В верхней точке оттолкнись дальше, округли верх спины. Двигаются именно лопатки.' },

                { num: 'BFP', name: 'Тяга резинки к лицу', sets: 3, mode: 'reps', repsLabel: '15', rest: 45, restLabel: '45 сек', tech: 'Резинка на уровне лица. Тяни к лицу, локти в стороны, лопатки вниз.' },
                { num: 'CT', name: 'Ретракция шеи (chin tucks)', sets: 3, mode: 'reps', repsLabel: '10', rest: 30, restLabel: '30 сек', tech: 'Мягко тяни затылок назад, пауза 2 сек в конце. Плечи расслаблены.' },
                { num: 'PTW', name: 'Лёжа на животе: Y + T + W', sets: 2, mode: 'reps', repsLabel: '8 каждое', rest: 45, restLabel: '45 сек', tech: 'Лёжа на животе. Y — руки вперёд под углом, T — в стороны, W — локти согнуты. Шея нейтрально.' }
            ]
        },
        B: {
            title: 'День B · Ноги + кор',
            subtitle: 'Приседы, тяги, ягодицы · стабильный кор.',
            exercises: [
                { num: 'GM', name: 'Ягодичный мостик (разминка)', sets: 1, mode: 'reps', repsLabel: '10', rest: 20, restLabel: '20 сек', tech: 'В верхней точке сильно сожми ягодицы. Рёбра вниз, не выгибай поясницу.' },

                { num: 'SQ', name: 'Приседания с гантелью у груди', sets: 4, mode: 'reps', repsLabel: '8–10 (RPE 7)', rest: 120, restLabel: '120 сек', tech: 'Колени по носкам, спина прямая, грудь вверх. Пятки не отрываются. Темп 3-1-1.' },
                { num: 'RDL', name: 'Румынская тяга с гантелями', sets: 3, mode: 'reps', repsLabel: '10–12', rest: 90, restLabel: '90 сек', tech: 'Таз назад, спина прямая. Чувствуй растяжение в бицепсе бедра, не округляй поясницу.' },
                { num: 'BSS', name: 'Болгарский сплит-присед (левая / правая)', sets: 3, mode: 'reps', repsLabel: '8–10 на сторону', sides: true, rest: 90, restLabel: '90 сек', tech: 'Опора на заднюю ногу минимальна. Колено не заходит за носок. Таз не разворачивается.' },
                { num: 'SLB', name: 'Мостик на одной ноге (правая / левая)', sets: 3, mode: 'reps', repsLabel: '10–12 на сторону', sides: true, rest: 60, restLabel: '60 сек', tech: 'Не разворачивай таз. В верхней точке — сильное сжатие ягодицы.' },

                { num: 'DB', name: '«Мёртвый жук» (левая / правая)', sets: 3, mode: 'reps', repsLabel: '10 на сторону', sides: true, rest: 45, restLabel: '45 сек', tech: 'Поясница прижата к полу. Медленно выпрямляй противоположные руку и ногу.' },
                { num: 'SP', name: 'Планка на боку (правая / левая)', sets: 3, mode: 'time', duration: 35, durationLabel: '30–40 сек', sides: true, rest: 45, restLabel: '45 сек', tech: 'Без прогиба в пояснице. Тело — прямая линия от головы до стоп.' },
                { num: 'PL', name: 'Планка', sets: 3, mode: 'time', duration: 45, durationLabel: '45 сек', rest: 45, restLabel: '45 сек', tech: 'Рёбра вниз, ягодицы сжаты. Тело — прямая линия.' }
            ]
        },
        C: {
            title: 'День C · Верх (жимовой)',
            subtitle: 'Жимы + лопатки + зубчатая. Без перегрузки шеи и поясницы.',
            exercises: [
                { num: 'SWS', name: 'Скольжение по стене для зубчатой мышцы (разминка)', sets: 2, mode: 'reps', repsLabel: '10', rest: 30, restLabel: '30 сек', tech: 'Руки на стене на уровне плеч. Протрагируй — оттолкнись от стены, округли верх спины. Двигаются лопатки, не поясница.' },

                { num: 'SPL', name: 'Жим гантели одной рукой в полувыпаде (левая / правая)', sets: 3, mode: 'reps', repsLabel: '8–10 на сторону', sides: true, rest: 90, restLabel: '90 сек', tech: 'Колено на полу, таз нейтрально, рёбра вниз. Жми вверх, не выгибая поясницу и не выдвигая голову.' },
                { num: 'PP', name: 'Отжимания с протракцией', sets: 4, mode: 'reps', repsLabel: '10–15', rest: 60, restLabel: '60 сек', tech: 'В верхней точке оттолкнись дальше, округли верх спины. Двигаются именно лопатки.' },
                { num: 'PU', name: 'Подтягивания / негативы', sets: 3, mode: 'reps', repsLabel: '5–8', rest: 90, restLabel: '90 сек', tech: 'Начни с активного виса: лопатки вниз. Тяни локти вниз. Не выдвигай голову вперёд.' },

                { num: 'BFP', name: 'Тяга резинки к лицу', sets: 3, mode: 'reps', repsLabel: '15', rest: 45, restLabel: '45 сек', tech: 'Резинка на уровне лица. Тяни к лицу, локти в стороны, лопатки вниз.' },
                { num: 'FW', name: 'Прогулка фермера', sets: 3, mode: 'time', duration: 35, durationLabel: '30–40 сек', rest: 60, restLabel: '60 сек', tech: 'Две гантели в руках. Плечи вниз и назад, рёбра вниз, иди ровно, смотри вперёд.' },
                { num: 'CT', name: 'Ретракция шеи (chin tucks)', sets: 3, mode: 'reps', repsLabel: '10', rest: 30, restLabel: '30 сек', tech: 'Мягко тяни затылок назад, пауза 2 сек. Плечи расслаблены.' },
                { num: 'PTW', name: 'Лёжа на животе: Y + T + W', sets: 2, mode: 'reps', repsLabel: '8 каждое', rest: 45, restLabel: '45 сек', tech: 'Лёжа на животе. По 8 Y, T, W. Шея нейтрально, голову не поднимай.' }
            ]
        },
        D: {
            title: 'День D · Мини-рутина осанки (4 мин)',
            subtitle: 'Минимум для переобучения мозга. Делай каждый день или встрой в быт.',
            exercises: [
                { num: 'CT', name: 'Ретракция шеи (chin tucks)', sets: 2, mode: 'reps', repsLabel: '10', rest: 15, restLabel: '15 сек', tech: 'Мягко тяни затылок назад, пауза 2 сек. Не кивай. Плечи расслаблены.' },
                { num: 'SWS', name: 'Скольжение по стене для зубчатой мышцы', sets: 2, mode: 'reps', repsLabel: '10', rest: 15, restLabel: '15 сек', tech: 'Руки на стене на уровне плеч. Протрагируй — округли верх спины, оттолкнись от стены.' },
                { num: 'PTW', name: 'Лёжа на животе: Y + T + W', sets: 1, mode: 'reps', repsLabel: '8 каждое', rest: 30, restLabel: '30 сек', tech: 'Лёжа на животе. По 8 Y, T, W. Шея нейтрально, голову не поднимай.' },
                { num: 'DH', name: 'Вис на турнике (расслабленный)', sets: 2, mode: 'time', duration: 20, durationLabel: '20 сек', rest: 20, restLabel: '20 сек', tech: 'Вис на турнике, руки прямые. Расслабь плечи, тянись вниз, дыши.' }
            ]
        }
    };

    // Картинки — только там, где изображение точно соответствует упражнению.
    // Если для упражнения картинки нет — плитка просто не показывается.
    const exerciseImages = {
        // Day A
        'Разгибание грудного отдела на валике (разминка)': 'icons/giperextenzia.jpg',
        'Лопаточные подтягивания (активация)': null,
        'Подтягивания / негативы': 'icons/podtiagivaniechirokim.jpg',
        'Тяга гантели одной рукой в наклоне (левая / правая)': 'icons/greblavnaklon.jpg',
        'Отжимания с протракцией': 'icons/otchimania.jpg',
        'Тяга резинки к лицу': null,
        'Ретракция шеи (chin tucks)': null,
        'Лёжа на животе: Y + T + W': null,
        // Day B
        'Ягодичный мостик (разминка)': 'icons/godicnmostik.jpg',
        'Приседания с гантелью у груди': 'icons/prisedansgantel.jpg',
        'Румынская тяга с гантелями': null,
        'Болгарский сплит-присед (левая / правая)': 'icons/bolgarskisplitpris.jpg',
        'Мостик на одной ноге (правая / левая)': 'icons/mostiknaodnounage.jpg',
        '«Мёртвый жук» (левая / правая)': null,
        'Планка на боку (правая / левая)': 'icons/plankanaboku.jpg',
        'Планка': 'icons/planka.jpg',
        // Day C
        'Скольжение по стене для зубчатой мышцы (разминка)': null,
        'Жим гантели одной рукой в полувыпаде (левая / правая)': null,
        'Прогулка фермера': null,
        // Day D
        'Скольжение по стене для зубчатой мышцы': null,
        'Вис на турнике (расслабленный)': null
    };

    /* ========== STORAGE ========== */
    const LOG_KEY = 'ironplan_log_v2';
    const AI_KEY_STORAGE = 'openrouter_api_key';
    const AI_HISTORY_STORAGE = 'ai_chat_history';
    const FREE_MODELS = ['nex-agi/nex-n2.5-pro:free'];

    function getApiKey() { return (localStorage.getItem(AI_KEY_STORAGE) || '').trim(); }
    function setApiKey(key) {
        const clean = (key || '').trim();
        if (clean) localStorage.setItem(AI_KEY_STORAGE, clean);
        else localStorage.removeItem(AI_KEY_STORAGE);
    }

    function getLog() { try { return JSON.parse(localStorage.getItem(LOG_KEY)) || []; } catch(e) { return []; } }
    function saveLogEntry(dayKey, quality, weight) {
        const log = getLog();
        log.unshift({ day: dayKey, date: new Date().toISOString(), quality: !!quality, weight: weight || null });
        localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(0, 200)));
    }
    function dayLabel(k) {
        if (k === 'A') return 'Верх (тяговый)';
        if (k === 'B') return 'Ноги + кор';
        if (k === 'C') return 'Верх (жимовой)';
        if (k === 'D') return 'Мини-рутина осанки';
        return k;
    }
    function fmtDate(iso) { const d = new Date(iso); return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit'})+' '+d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}); }

    function getAiHistory() { try { return JSON.parse(localStorage.getItem(AI_HISTORY_STORAGE)) || []; } catch(e) { return []; } }
    function saveAiHistory(history) { localStorage.setItem(AI_HISTORY_STORAGE, JSON.stringify(history)); }

    function buildProgramDescription() {
        const parts = [];
        parts.push('== ПРОГРАММА ТРЕНИРОВОК (акцент — коррекция осанки) ==');
        parts.push('Цель: выровнять осанку (крыловидные лопатки, волна позвоночника, наклон головы, перекос плеч), сохранить мышечную массу и силу.');
        parts.push('Сплит: 3 силовых в неделю (Пн A, Ср B, Пт C) + мини-рутина D ежедневно 4 минуты.');
        parts.push('Инвентарь: 2 разборные гантели (до 12 кг каждая), турник, резинка 10 кг, валик/полотенце.');
        parts.push('');
        Object.keys(DAYS).forEach(dayKey => {
            const day = DAYS[dayKey];
            parts.push(`День ${dayKey}: ${day.title}`);
            parts.push(day.subtitle);
            day.exercises.forEach(ex => {
                const params = ex.mode==='time' ? `${ex.duration} сек` : ex.repsLabel;
                const sides = ex.sides ? ' (на каждую сторону)' : '';
                parts.push(`- ${ex.name}${sides}: ${ex.sets} подход(а) × ${params}, отдых ${ex.restLabel}${ex.tech ? ' | Cue: '+ex.tech : ''}`);
            });
            parts.push('');
        });
        parts.push('Принципы: качество > вес; RPE 6–8; линейная прогрессия +0.5–1 кг, когда верх диапазона повторов даётся при RPE ≤ 7; deload каждые 6–8 недель.');
        return parts.join('\n');
    }

    function buildWorkoutHistoryDescription() {
        const log = getLog();
        if (!log.length) return 'История тренировок пока пуста.';
        const lines = log.slice(0, 10).map(e => {
            const date = new Date(e.date);
            const dateStr = date.toLocaleDateString('ru-RU', { day:'2-digit', month:'2-digit', year:'2-digit' });
            const weight = e.weight ? `, вес гантелей: ${e.weight} кг` : '';
            return `${dateStr} — День ${e.day} (${dayLabel(e.day)}), качество: ${e.quality?'максимум':'не максимум'}${weight}`;
        });
        return 'Последние тренировки:\n' + lines.join('\n');
    }

    /* ========== DOM ========== */
    const $ = sel => document.querySelector(sel);
    const app = $('#appContainer');
    const dayTabs = $('#dayTabs');
    const mainContent = $('#mainContent');
    const player = $('#player');
    const playerCrumbs = $('#playerCrumbs');
    const playerName = $('#playerName');
    const playerMeta = $('#playerMeta');
    const playerNote = $('#playerNote');
    const ring = $('#ring');
    const ringOuter = $('#ringOuter');
    const ringTime = $('#ringTime');
    const ringPhase = $('#ringPhase');
    const mainActionBtn = $('#mainActionBtn');
    const skipBtn = $('#skipBtn');
    const qualityModal = $('#qualityModal');
    const logList = $('#logList');
    const playerImageContainer = $('#playerImageContainer');
    const playerImage = $('#playerImage');
    const restAdjust = $('#restAdjust');
    const restMinus = $('#restMinus');
    const restPlus = $('#restPlus');
    const themeSelect = $('#themeSelect');
    const voiceToggleCheckbox = $('#voiceToggle');
    const openaiKeyInput = $('#openaiKey');
    const saveKeyBtn = $('#saveKeyBtn');
    const aiMessages = $('#aiMessages');
    const aiForm = $('#aiForm');
    const aiInput = $('#aiInput');
    const bottomNav = $('#bottomNav');
    const aiScreenEl = $('#screenAi');
    const screens = document.querySelectorAll('.screen');

    /* ========== SCREEN ROUTER ========== */
    let currentScreen = 'home';

    function showScreen(name, options = {}) {
        if (!name) name = 'home';
        currentScreen = name;

        screens.forEach(s => {
            const isMatch = s.dataset.screen === name;
            s.classList.toggle('is-active', isMatch);
            s.hidden = !isMatch;
        });

        if (bottomNav) {
            bottomNav.querySelectorAll('.bottom-nav__item').forEach(b => {
                b.classList.toggle('is-active', b.dataset.action === name);
            });
        }

        if (!options.keepScroll) {
            window.scrollTo({ top: 0, behavior: 'auto' });
            if (name === 'ai') {
                requestAnimationFrame(() => {
                    aiMessages.scrollTop = aiMessages.scrollHeight;
                    if (typeof window.__updateAiViewport === 'function') window.__updateAiViewport();
                });
            }
            if (name === 'log') {
                renderLog();
            }
        }

        if (name !== 'home') {
            try { history.pushState({ screen: name }, ''); } catch(_) {}
        }
    }

    if (bottomNav) {
        bottomNav.addEventListener('click', (e) => {
            const item = e.target.closest('.bottom-nav__item');
            if (!item) return;
            const action = item.dataset.action;
            if (navigator.vibrate) { try { navigator.vibrate(8); } catch(_){} }

            if (action === currentScreen) {
                if (action === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
                if (action === 'log') window.scrollTo({ top: 0, behavior: 'smooth' });
                if (action === 'ai') aiMessages.scrollTo({ top: aiMessages.scrollHeight, behavior: 'smooth' });
                if (action === 'settings') window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            showScreen(action);
        });
    }

    /* ========== THEME ========== */
    function applyTheme(mode) {
        if (mode === 'light') document.documentElement.setAttribute('data-theme', 'light');
        else if (mode === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
        else document.documentElement.removeAttribute('data-theme');

        const isLight = mode === 'light' ||
            (mode !== 'dark' && window.matchMedia('(prefers-color-scheme: light)').matches);

        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) metaThemeColor.setAttribute('content', isLight ? '#FFFFFF' : '#0A0A0A');
    }

    /* ========== VOICE ========== */
    let voiceEnabled = localStorage.getItem('voiceEnabled') !== 'false';
    const synth = window.speechSynthesis;
    let selectedVoice = null;

    function pickVoice() {
        if (!synth) return;
        const voices = synth.getVoices();
        if (!voices || !voices.length) return;
        const priorities = [
            v => v.lang === 'ru-RU' && /google/i.test(v.name) && /female|женский/i.test(v.name),
            v => v.lang === 'ru-RU' && /google/i.test(v.name),
            v => v.lang === 'ru-RU' && /(milena|alena|alyona|katya|yuri|dmitri)/i.test(v.name),
            v => v.lang === 'ru-RU' && !v.localService,
            v => v.lang === 'ru-RU',
            v => v.lang && v.lang.toLowerCase().startsWith('ru'),
            v => v.default
        ];
        for (const test of priorities) {
            const found = voices.find(test);
            if (found) { selectedVoice = found; return; }
        }
    }
    if (synth) {
        pickVoice();
        synth.onvoiceschanged = pickVoice;
        setTimeout(pickVoice, 200);
        setTimeout(pickVoice, 1000);
    }

    function speak(text, priority = false) {
        if (!voiceEnabled || !synth || !text) return;
        if (synth.speaking && !priority) return;
        if (synth.speaking && priority) synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'ru-RU';
        if (selectedVoice) utter.voice = selectedVoice;
        utter.rate = 0.98; utter.pitch = 1.05; utter.volume = 1.0;
        synth.speak(utter);
    }
    function announceCountdown(seconds) {
        if (!voiceEnabled || seconds > 5 || seconds < 1) return;
        speak(String(seconds), true);
    }

    if (voiceToggleCheckbox) voiceToggleCheckbox.checked = voiceEnabled;
    if (themeSelect) {
        themeSelect.value = localStorage.getItem('theme') || 'system';
        applyTheme(themeSelect.value);
    }
    if (openaiKeyInput) openaiKeyInput.value = getApiKey();

    /* ========== AI TRAINER ========== */
    let aiHistory = getAiHistory();
    let aiBusy = false;

    function renderAiHistory() {
        aiMessages.innerHTML = '';
        if (aiHistory.length === 0) {
            addMessageToDOM('assistant', 'Привет! Я твой фитнес-помощник. Задай вопрос о тренировках, упражнениях или плане.');
        } else {
            aiHistory.forEach(msg => addMessageToDOM(msg.role, msg.content));
        }
    }

    function addMessageToDOM(role, content) {
        const div = document.createElement('div');
        div.classList.add('ai-message');
        div.classList.add(role === 'user' ? 'ai-message--user' : 'ai-message--bot');
        div.textContent = content;
        aiMessages.appendChild(div);
        aiMessages.scrollTop = aiMessages.scrollHeight;
        return div;
    }

    function addMessage(role, content) {
        aiHistory.push({ role, content });
        saveAiHistory(aiHistory);
        addMessageToDOM(role, content);
    }

    function showTypingIndicator() {
        removeTypingIndicator();
        const div = document.createElement('div');
        div.id = 'typingIndicator';
        div.classList.add('ai-message', 'ai-message--bot', 'ai-message--typing');
        div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        aiMessages.appendChild(div);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }
    function removeTypingIndicator() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }

    async function sendToAI(userMessage) {
        if (aiBusy) return;
        const apiKey = getApiKey();
        if (!apiKey) {
            addMessage('assistant', 'API-ключ не указан. Откройте «Ещё → Настройки» и вставьте ключ с openrouter.ai/keys.');
            return;
        }
        addMessage('user', userMessage);
        aiBusy = true;
        showTypingIndicator();

        const systemPrompt = `Ты — персональный фитнес-тренер в приложении "Домашний фитнес".
Отвечай кратко, полезно и мотивирующе на русском языке.

Ты имеешь полное знание программы тренировок и истории пользователя.

${buildProgramDescription()}

${buildWorkoutHistoryDescription()}

Учитывай эти данные при ответах: давай советы по технике, отдыху, изменению веса, питанию, коррекции осанки.
Если пользователь спрашивает о конкретном упражнении, уточняй его параметры из программы.
Если просят список упражнений — перечисляй их по дням, кратко и структурированно.`;

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': location.origin || 'https://localhost'
                },
                body: JSON.stringify({
                    model: FREE_MODELS[0],
                    messages: [{ role: 'system', content: systemPrompt }, ...aiHistory],
                    max_tokens: 2000,
                    temperature: 0.7
                })
            });
            let data = null;
            try { data = await response.json(); } catch (e) { data = null; }

            removeTypingIndicator();

            if (response.ok && data) {
                const choice = data.choices && data.choices[0];
                const message = choice && choice.message;
                let botReply = '';
                if (message) {
                    if (typeof message.content === 'string' && message.content.length) botReply = message.content;
                    else if (typeof message.reasoning === 'string' && message.reasoning.length) botReply = message.reasoning;
                }
                botReply = String(botReply || '').trim();
                if (!botReply) botReply = 'Модель вернула пустой ответ. Попробуйте переформулировать запрос.';
                addMessage('assistant', botReply);
            } else {
                const errorMsg = (data && (data.error?.message || data.error)) || `HTTP ${response.status}`;
                addMessage('assistant', `Ошибка API: ${typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg)}`);
            }
        } catch (error) {
            removeTypingIndicator();
            addMessage('assistant', `Ошибка сети: ${error.message}.`);
        } finally {
            aiBusy = false;
        }
    }

    if (aiForm) aiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = aiInput.value.trim();
        if (!text || aiBusy) return;
        aiInput.value = '';
        aiInput.style.height = '';
        sendToAI(text);
    });

    if (saveKeyBtn) {
        saveKeyBtn.addEventListener('click', () => {
            if (!openaiKeyInput) return;
            const val = openaiKeyInput.value.trim();
            setApiKey(val);
            if (navigator.vibrate) { try { navigator.vibrate(20); } catch(_){} }
            alert(val ? 'Ключ сохранён.' : 'Ключ удалён.');
        });
    }

    /* ========== KEYBOARD / VISUAL VIEWPORT ========== */
    function setupAiKeyboard() {
        const vv = window.visualViewport;
        if (!vv || !aiScreenEl) return;

        function update() {
            if (currentScreen !== 'ai') {
                aiScreenEl.classList.remove('is-keyboard-open');
                aiScreenEl.style.height = '';
                aiScreenEl.style.top = '';
                return;
            }
            const keyboardOpen = (window.innerHeight - vv.height) > 120;
            if (keyboardOpen) {
                aiScreenEl.classList.add('is-keyboard-open');
                aiScreenEl.style.height = vv.height + 'px';
                aiScreenEl.style.top = vv.offsetTop + 'px';
                aiMessages.scrollTop = aiMessages.scrollHeight;
            } else {
                aiScreenEl.classList.remove('is-keyboard-open');
                aiScreenEl.style.height = '';
                aiScreenEl.style.top = '';
            }
        }
        vv.addEventListener('resize', update);
        vv.addEventListener('scroll', update);
        window.__updateAiViewport = update;

        aiInput.addEventListener('focus', () => setTimeout(update, 120));
        aiInput.addEventListener('blur', () => setTimeout(update, 120));
    }
    setupAiKeyboard();

    /* ========== STATE ========== */
    let currentView = 'A';
    const sessionDone = { A: new Set(), B: new Set(), C: new Set(), D: new Set() };
    let steps = [], stepIdx = 0, sessionType = null, timeLeft = 0, totalTime = 0, ticking = false, intervalId = null;
    let currentPhase = 'idle';
    const dayOrder = ['A', 'B', 'C', 'D'];

    /* ========== AUDIO / HAPTICS ========== */
    let audioCtx = null;
    function beep(freq=880, dur=0.12) {
        try {
            audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
            const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
            osc.type='sine'; osc.frequency.value=freq;
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime+dur);
            osc.connect(gain).connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime+dur);
        } catch(e) {}
    }
    function haptic(ms) { if (navigator.vibrate) { try { navigator.vibrate(ms); } catch(_){} } }

    /* ========== STEP GENERATION ========== */
    function enrichStep(step, ex) { if (ex && exerciseImages[ex.name]) step.image = exerciseImages[ex.name]; return step; }
    function makeWorkStep(ex, exIdx, totalEx, setNum, totalSets, side) {
        return {
            kind:'work', exNum:ex.num, exName:ex.name, exIdx, totalEx,
            setLabel:`Подход ${setNum} из ${totalSets}`+(side?` · ${side}`:''),
            duration: ex.mode==='time'?ex.duration:null,
            repsLabel: ex.mode==='time'?(ex.durationLabel||`${ex.duration} сек`):ex.repsLabel,
            note: ex.tech||null
        };
    }
    function makeRestStep(ex, exIdx, totalEx, label, duration, restLabel) {
        return { kind:'rest', exNum:ex.num, exName:'Отдых', exIdx, totalEx, setLabel:label, duration, repsLabel:restLabel, note:null };
    }

    function buildDaySteps(dayKey, fromExerciseIdx=0) {
        const day = DAYS[dayKey]; const list = [];
        day.exercises.forEach((ex,exIdx)=>{
            if (exIdx < fromExerciseIdx) return;
            for (let s=1; s<=ex.sets; s++) {
                if (ex.sides) {
                    ['левая','правая'].forEach(side=>list.push(enrichStep(makeWorkStep(ex,exIdx,day.exercises.length,s,ex.sets,side),ex)));
                } else {
                    list.push(enrichStep(makeWorkStep(ex,exIdx,day.exercises.length,s,ex.sets,null),ex));
                }
                const lastSet = s===ex.sets, lastEx = exIdx===day.exercises.length-1;
                if (!lastSet) list.push(makeRestStep(ex,exIdx,day.exercises.length,`Подход ${s} из ${ex.sets}`,ex.rest,ex.restLabel));
                else if (!lastEx) list.push(makeRestStep(ex,exIdx,day.exercises.length,`Перед следующим упражнением`,ex.rest,ex.restLabel));
            }
        });
        return list;
    }

    /* ========== SESSION ENGINE ========== */
    function startSession(type, steplist, startIdx=0) {
        sessionType=type; steps=steplist; stepIdx=startIdx;
        player.hidden=false;
        document.body.style.overflow='hidden';
        haptic(15);
        setupStep();
    }

    function startTimer() {
        ticking = true;
        intervalId = setInterval(() => {
            timeLeft--;
            const step = steps[stepIdx];

            if (step.kind === 'rest' && !step.halfAnnounced && totalTime >= 20 &&
                timeLeft > 0 && timeLeft <= Math.floor(totalTime / 2)) {
                step.halfAnnounced = true;
                speak('Осталась половина отдыха', true);
            }
            if (timeLeft <= 5 && timeLeft > 0) {
                beep(440,0.06);
                if (step.kind !== 'rest') announceCountdown(timeLeft);
            }
            if (timeLeft <= 0) {
                clearInterval(intervalId); ticking=false;
                beep(880,0.18); haptic([120,60,120]);
                markExerciseProgress(step);
                nextStep();
                return;
            }
            updateRing();
        },1000);
    }

    function setupStep() {
        clearInterval(intervalId); ticking=false;
        const step = steps[stepIdx];
        if (!step) { finishSession(); return; }

        ring.classList.remove('is-rest','is-go','pulse');
        ring.classList.add(step.kind==='rest'?'is-rest':'is-go');
        playerCrumbs.textContent = `${sessionTitle()} · ${stepIdx+1}/${steps.length}`;
        playerName.textContent = step.exName;
        playerMeta.textContent = step.setLabel+(step.repsLabel?` · ${step.repsLabel}`:'');
        if (step.note) { playerNote.hidden=false; playerNote.textContent=step.note; }
        else { playerNote.hidden=true; }
        if (step.image) { playerImage.src=step.image; playerImage.alt=step.exName; playerImageContainer.hidden=false; }
        else { playerImageContainer.hidden=true; }

        const nextExerciseBlock = document.getElementById('nextExercise');
        const nextExerciseName = document.getElementById('nextExerciseName');
        if (step.kind === 'rest') {
            let nextWorkStep = null;
            for (let i = stepIdx + 1; i < steps.length; i++) {
                if (steps[i].kind === 'work') { nextWorkStep = steps[i]; break; }
            }
            if (nextWorkStep) { nextExerciseBlock.hidden = false; nextExerciseName.textContent = nextWorkStep.exName; }
            else { nextExerciseBlock.hidden = true; }
        } else {
            nextExerciseBlock.hidden = true;
        }

        if (step.kind === 'work') {
            if (shouldPrep(step)) startPrep(step); else beginWork(step);
        } else {
            startRest(step);
        }
    }

    function shouldPrep(step) {
        if (stepIdx === 0) return true;
        const prev = steps[stepIdx - 1];
        if (!prev) return true;
        if (prev.kind === 'work' && prev.exName === step.exName) return false;
        return true;
    }

    function startPrep(step) {
        currentPhase = 'prep';
        let prepLeft = 5;
        timeLeft = prepLeft; totalTime = prepLeft;
        ringPhase.textContent = 'ПРИГОТОВЬСЯ';
        ringTime.textContent = String(prepLeft);
        ringOuter.style.setProperty('--progress', '360deg');
        mainActionBtn.textContent = 'Начать сейчас';
        skipBtn.hidden = false; skipBtn.textContent = 'Пропустить';
        restAdjust.hidden = true;
        speak(`Приготовься. ${step.exName}.`, true);
        haptic(20);

        ticking = true;
        intervalId = setInterval(() => {
            prepLeft--;
            if (prepLeft > 0) {
                ringTime.textContent = String(prepLeft);
                ringOuter.style.setProperty('--progress', `${(prepLeft/5)*360}deg`);
                speak(String(prepLeft), true);
            } else {
                clearInterval(intervalId); ticking = false;
                speak('Начали!', true);
                beep(880, 0.15); haptic([80, 40, 80]);
                beginWork(step);
            }
        }, 1000);
    }

    function beginWork(step) {
        currentPhase = 'work';
        ring.classList.remove('is-rest','pulse');
        ring.classList.add('is-go');
        if (step.duration) {
            ringPhase.textContent = 'РАБОТА';
            timeLeft = step.duration; totalTime = step.duration;
            updateRing();
            mainActionBtn.textContent = 'Пауза';
            skipBtn.hidden = false; skipBtn.textContent = 'Пропустить';
            restAdjust.hidden = true;
            startTimer();
        } else {
            ringPhase.textContent = 'РАБОТА';
            ringTime.textContent = '✓';
            ringOuter.style.setProperty('--progress', '360deg');
            mainActionBtn.textContent = 'Готово';
            skipBtn.hidden = false; skipBtn.textContent = 'Пропустить';
            restAdjust.hidden = true;
        }
    }

    function startRest(step) {
        currentPhase = 'rest';
        ringPhase.textContent = 'ОТДЫХ';
        if (step.duration) {
            timeLeft = step.duration; totalTime = step.duration;
            step.halfAnnounced = false;
            updateRing();
            mainActionBtn.textContent = 'Пауза';
            skipBtn.hidden = false; skipBtn.textContent = 'Пропустить';
            restAdjust.hidden = false;
            announceRest(step);
            startTimer();
        } else {
            ringTime.textContent = '✓';
            ringOuter.style.setProperty('--progress', '360deg');
            mainActionBtn.textContent = 'Готово';
            skipBtn.hidden = false;
            restAdjust.hidden = true;
        }
    }

    function announceRest(step) {
        if (!voiceEnabled) return;
        let message = `Отдых ${step.repsLabel}. `;
        const prevWork = [...steps.slice(0, stepIdx)].reverse().find(s => s.kind === 'work');
        for (let i = stepIdx + 1; i < steps.length; i++) {
            if (steps[i].kind === 'work') {
                if (!prevWork || steps[i].exName !== prevWork.exName) {
                    message += `Следующее упражнение: ${steps[i].exName}.`;
                }
                break;
            }
        }
        speak(message, true);
    }

    function sessionTitle() { return DAYS[sessionType].title; }

    function updateRing() {
        const mins = Math.floor(timeLeft/60), secs = timeLeft%60;
        ringTime.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
        const progress = totalTime>0 ? (timeLeft/totalTime)*360 : 0;
        ringOuter.style.setProperty('--progress',`${progress}deg`);
        if (timeLeft <= 3 && timeLeft > 0 && steps[stepIdx].kind !== 'rest') ring.classList.add('pulse');
        else ring.classList.remove('pulse');
    }
    function adjustRest(amount) {
        if (steps[stepIdx].kind !== 'rest' || !ticking) return;
        const newTime = timeLeft + amount;
        if (newTime < 0 || newTime > 600) return;
        timeLeft = newTime;
        totalTime = totalTime + amount;
        haptic(10);
        updateRing();
    }
    function toggleTimer() {
        const step = steps[stepIdx];
        haptic(12);
        if (currentPhase === 'prep') {
            clearInterval(intervalId); ticking = false;
            if (synth) synth.cancel();
            beep(880, 0.15);
            beginWork(step);
            return;
        }
        if (!step.duration) {
            markExerciseProgress(step); beep(660,0.08); nextStep(); return;
        }
        if (ticking) { clearInterval(intervalId); ticking=false; mainActionBtn.textContent='Продолжить'; }
        else { mainActionBtn.textContent='Пауза'; startTimer(); }
    }
    function skipStep() { haptic(15); clearInterval(intervalId); ticking=false; nextStep(); }
    function nextStep() {
        stepIdx++;
        if (stepIdx >= steps.length) { finishSession(); return; }
        setupStep();
    }
    function markExerciseProgress(step) {
        if (step.kind!=='work') return;
        if (sessionDone[sessionType]) sessionDone[sessionType].add(step.exIdx);
    }
    function closePlayer() {
        clearInterval(intervalId); ticking=false;
        player.hidden=true; document.body.style.overflow='';
        restAdjust.hidden=true;
        if (synth && synth.speaking) synth.cancel();
    }
    function finishSession() {
        speak('Тренировка завершена. Отличная работа!', true);
        haptic([100, 60, 100, 60, 100]);
        closePlayer();
        if (sessionDone[sessionType]) {
            qualityModal.hidden=false;
            qualityModal.dataset.day=sessionType;
            document.getElementById('workoutWeight').value = '';
        }
        renderView();
    }

    /* ========== RENDERING ========== */
    function scrollToTab(view) {
        const activeTab = [...dayTabs.children].find(t=>t.dataset.view===view);
        if (activeTab) activeTab.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
    }
    function renderTabs() {
        [...dayTabs.querySelectorAll('.tab')].forEach(t=>t.classList.toggle('is-active', t.dataset.view===currentView));
        scrollToTab(currentView);
    }
    function exerciseCard(ex, exIdx, dayKey) {
        const done = sessionDone[dayKey] && sessionDone[dayKey].has(exIdx);
        const repsText = ex.mode==='time'?(ex.durationLabel||`${ex.duration} сек`):ex.repsLabel;
        const imgSrc = exerciseImages[ex.name];
        const plateContent = imgSrc ? `<img src="${imgSrc}" alt="${ex.name}" class="plate">` : ``;
        return `<div class="card ${done?'is-done':''}" data-day="${dayKey}" data-ex="${exIdx}" style="animation-delay:${exIdx*0.04}s">
            ${plateContent}
            <div class="card__body">
                <p class="card__name">${ex.name}</p>
                <div class="card__stats"><span>${ex.sets} подх.</span><span>${repsText}</span><span>отдых ${ex.restLabel}</span></div>
                ${ex.tech?`<span class="card__alt">${ex.tech}</span>`:''}
            </div>
            <button class="card__go" aria-label="Начать"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></button>
        </div>`;
    }
    function renderDay(dayKey) {
        const day = DAYS[dayKey];
        const cards = day.exercises.map((ex,i)=>exerciseCard(ex,i,dayKey)).join('');
        mainContent.innerHTML = `<div class="section-head"><div><h2>${day.title}</h2><p>${day.subtitle}</p></div></div>${cards}`;
        mainContent.querySelectorAll('.card').forEach(card=>{
            card.addEventListener('click', e=>{
                if (!e.target.closest('.card__go')) return;
                const idx = Number(card.dataset.ex);
                startSession(dayKey, buildDaySteps(dayKey, idx));
            });
        });
    }
    function renderView() { renderTabs(); renderDay(currentView); }
    function renderLog() {
        const log = getLog();
        if (!log.length) { logList.innerHTML=`<p class="log-empty">Пока пусто. Заверши первую тренировку — запись появится здесь.</p>`; return; }
        logList.innerHTML = log.map(e=>{
            const weightText = e.weight ? ` · ${e.weight} кг` : '';
            return `<div class="log-item">
                <span><b>${e.day}</b> · ${dayLabel(e.day)}${weightText}</span>
                <span>${fmtDate(e.date)}</span>
                <span>${e.quality?'макс.':'норм'}</span>
            </div>`;
        }).join('');
    }

    /* ========== GESTURES ========== */
    let touchStartX=0, touchStartY=0;
    app.addEventListener('touchstart', e=>{
        if (player.hidden && currentScreen === 'home') {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, {passive:true});
    app.addEventListener('touchend', e=>{
        if (!player.hidden || currentScreen !== 'home') return;
        const dx = (e.changedTouches[0].clientX - touchStartX);
        const dy = (e.changedTouches[0].clientY - touchStartY);
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
            const dir = dx > 0 ? -1 : 1;
            const curIdx = dayOrder.indexOf(currentView);
            const newIdx = Math.min(Math.max(curIdx+dir, 0), dayOrder.length-1);
            if (newIdx !== curIdx) {
                currentView = dayOrder[newIdx];
                haptic(8);
                renderView();
            }
        }
    }, {passive:true});

    player.addEventListener('touchstart', e=>{ touchStartY = e.touches[0].clientY; }, {passive:true});
    player.addEventListener('touchend', e=>{
        const dy = (e.changedTouches[0].clientY - touchStartY);
        if (dy < -50 && !e.target.closest('button')) {
            closePlayer(); renderView();
        }
    });

    /* ========== EVENTS ========== */
    dayTabs.addEventListener('click', e=>{
        const tab = e.target.closest('.tab');
        if (!tab) return;
        currentView = tab.dataset.view;
        haptic(8);
        renderView();
    });
    document.getElementById('playerClose').addEventListener('click', ()=>{ closePlayer(); renderView(); });
    mainActionBtn.addEventListener('click', toggleTimer);
    skipBtn.addEventListener('click', skipStep);
    restMinus.addEventListener('click', ()=>adjustRest(-5));
    restPlus.addEventListener('click', ()=>adjustRest(5));
    document.getElementById('qualityYes').addEventListener('click', ()=>{
        const weight = parseFloat(document.getElementById('workoutWeight').value) || null;
        saveLogEntry(qualityModal.dataset.day, true, weight);
        qualityModal.hidden = true;
        renderView();
    });
    document.getElementById('qualityNo').addEventListener('click', ()=>{
        const weight = parseFloat(document.getElementById('workoutWeight').value) || null;
        saveLogEntry(qualityModal.dataset.day, false, weight);
        qualityModal.hidden = true;
        renderView();
    });

    if (themeSelect) themeSelect.addEventListener('change', e=>{
        localStorage.setItem('theme', e.target.value);
        applyTheme(e.target.value);
    });
    if (voiceToggleCheckbox) voiceToggleCheckbox.addEventListener('change', e=>{
        voiceEnabled = e.target.checked;
        localStorage.setItem('voiceEnabled', voiceEnabled);
        haptic(10);
        if (!voiceEnabled && synth && synth.speaking) synth.cancel();
        else if (voiceEnabled) speak('Голосовые подсказки включены', true);
    });

    /* ========== КНОПКА "НАЗАД" ANDROID ========== */
    window.addEventListener('popstate', () => {
        if (!player.hidden) {
            closePlayer(); renderView();
            history.pushState({ screen: currentScreen }, '');
            return;
        }
        if (!qualityModal.hidden) {
            qualityModal.hidden = true;
            history.pushState({ screen: currentScreen }, '');
            return;
        }
        if (currentScreen !== 'home') {
            showScreen('home');
            return;
        }
    });

    history.replaceState({ screen: 'home' }, '');

    /* ========== INIT ========== */
    renderView();
    renderAiHistory();
});
