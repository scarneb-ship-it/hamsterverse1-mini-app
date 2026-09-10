document.addEventListener('DOMContentLoaded', function() {

    /* ========== DATA ========== */
    const DAYS = {
        A: {
            title: 'День A · Силовая база', subtitle: 'Турник + гантели · развиваем силу спины, ног и плеч',
            exercises: [
                { num: '238', name: 'Подтягивания широким хватом', sets: 4, mode: 'reps', repsLabel: 'Максимум', rest: 135, restLabel: '120–150 сек' },
                { num: '15', name: 'Приседания (с гантелью у груди)', sets: 4, mode: 'reps', repsLabel: '8–10', rest: 120, restLabel: '120 сек' },
                { num: '178', name: 'Жим гантелей над головой (сидя)', sets: 4, mode: 'reps', repsLabel: '8–10', rest: 105, restLabel: '90–120 сек' },
                { num: '179', name: 'Гребля в наклоне (с гантелями)', sets: 3, mode: 'reps', repsLabel: '10–12', rest: 90, restLabel: '90 сек' },
                { num: '39', name: 'Ягодичный мостик (с гантелью на тазу)', sets: 3, mode: 'reps', repsLabel: '12–15', rest: 60, restLabel: '60 сек' },
                { num: '4', name: 'Планка', sets: 3, mode: 'time', duration: 55, durationLabel: '45–60 сек', rest: 45, restLabel: '45 сек' }
            ]
        },
        B: {
            title: 'День B · Мышечный рост', subtitle: 'Гипертрофия и изоляция · акцент на ноги и руки',
            exercises: [
                { num: '58 / 66', name: 'Болгарский сплит-присед (левая / правая)', sets: 3, mode: 'reps', repsLabel: '10 на каждую', sides: true, rest: 90, restLabel: '90 сек' },
                { num: '14', name: 'Отжимания от пола (классические)', sets: 3, mode: 'reps', repsLabel: '10–15', rest: 75, restLabel: '60–90 сек' },
                { num: '241', name: 'Подтягивания обратным хватом', sets: 3, mode: 'reps', repsLabel: 'Максимум', rest: 90, restLabel: '90 сек' },
                { num: '182', name: 'Подъём гантелей в стороны', sets: 3, mode: 'reps', repsLabel: '12–15', rest: 50, restLabel: '45–60 сек' },
                { num: '195 / 196', name: 'Подъём гантели сидя на бицепс (левая / правая)', sets: 3, mode: 'reps', repsLabel: '10–12 на каждую', sides: true, rest: 60, restLabel: '60 сек' },
                { num: '181', name: 'Подъём гантели на трицепс (стоя)', sets: 3, mode: 'reps', repsLabel: '10–12', rest: 60, restLabel: '60 сек' },
                { num: '5', name: 'Обратные скручивания', sets: 3, mode: 'reps', repsLabel: '15–20', rest: 30, restLabel: '30 сек' }
            ]
        },
        C: {
            title: 'День C · Жиросжигание и кор', subtitle: 'Круговая тренировка · 4 круга · отдых 90 сек между кругами',
            circuit: true, rounds: 4, restBetweenRounds: 90,
            exercises: [
                { num: '221', name: 'Медленный альпинист', mode: 'time', duration: 40, tech: 'Без прыжков. Плавно подтягиваем колено к локтю.' },
                { num: '75 / 74', name: 'Мостик на одной ноге (правая / левая)', mode: 'reps', repsLabel: '12 на каждую', sides: true, tech: 'В верхней точке — сильное сжатие ягодицы.' },
                { num: '95', name: 'Жук на спине', mode: 'reps', repsLabel: '10 раз', tech: 'Идеальное упражнение для глубоких мышц живота.' },
                { num: '12', name: 'Обратные отжимания от стула', mode: 'reps', repsLabel: '12–15 раз', tech: 'Ноги прямые, локти назад.' },
                { num: '101', name: 'Гиперэкстензии (лёжа на животе)', mode: 'reps', repsLabel: '15 раз', tech: 'Оторвать грудь и ноги от пола, задержаться 2 сек.' },
                { num: '23 / 29', name: 'Планка на правом / левом боку', mode: 'time', duration: 30, sides: true, tech: 'Без прогиба в пояснице.' }
            ]
        }
    };
    const exerciseImages = {
        'Подтягивания широким хватом': 'icons/podtiagivaniechirokim.jpg',
        'Приседания (с гантелью у груди)': 'icons/prisedansgantel.jpg',
        'Жим гантелей над головой (сидя)': 'icons/chimgantelnadgolov.jpg',
        'Гребля в наклоне (с гантелями)': 'icons/greblavnaklon.jpg',
        'Ягодичный мостик (с гантелью на тазу)': 'icons/godicnmostik.jpg',
        'Планка': 'icons/planka.jpg',
        'Болгарский сплит-присед (левая / правая)': 'icons/bolgarskisplitpris.jpg',
        'Отжимания от пола (классические)': 'icons/otchimania.jpg',
        'Подтягивания обратным хватом': 'icons/podtiagivaniaobratnimhvat.jpg',
        'Подъём гантелей в стороны': 'icons/podemgantelvstoronu.jpg',
        'Подъём гантели сидя на бицепс (левая / правая)': 'icons/podemgantelsidnabiceps.jpg',
        'Подъём гантели на трицепс (стоя)': 'icons/podemgantelnatriceps.jpg',
        'Обратные скручивания': 'icons/obratnskruchiv.jpg',
        'Медленный альпинист': 'icons/medlennalpinist.jpg',
        'Мостик на одной ноге (правая / левая)': 'icons/mostiknaodnounage.jpg',
        'Жук на спине': 'icons/csuknaspine.jpg',
        'Обратные отжимания от стула': 'icons/obratnotchimotstula.jpg',
        'Гиперэкстензии (лёжа на животе)': 'icons/giperextenzia.jpg',
        'Планка на правом / левом боку': 'icons/plankanaboku.jpg'
    };

    /* ========== STORAGE ========== */
    const LOG_KEY = 'ironplan_log_v2';
    const AI_KEY_STORAGE = 'ai_api_key';
    const AI_HISTORY_STORAGE = 'ai_chat_history';
    const FREE_MODELS = ['nex-agi/nex-n2.5-pro:free'];
    const DEFAULT_API_KEY = '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';

    function getLog() { try { return JSON.parse(localStorage.getItem(LOG_KEY)) || []; } catch(e) { return []; } }
    function saveLogEntry(dayKey, quality, weight) {
        const log = getLog();
        log.unshift({
            day: dayKey,
            date: new Date().toISOString(),
            quality: !!quality,
            weight: weight || null
        });
        localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(0, 200)));
    }
    function checkProgression(dayKey) {
        const entries = getLog().filter(e => e.day === dayKey).slice(0, 2);
        if (entries.length === 2 && entries.every(e => e.quality)) {
            return `${entries.length}/2 последних тренировок «${dayLabel(dayKey)}» — максимум повторений. Пора добавить гантелям 1–2 кг.`;
        }
        return null;
    }
    function dayLabel(k) { if (k==='A') return 'Силовая база'; if (k==='B') return 'Мышечный рост'; if (k==='C') return 'Жиросжигание'; return k; }
    function fmtDate(iso) { const d = new Date(iso); return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit'})+' '+d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}); }

    function getApiKey() {
        return localStorage.getItem(AI_KEY_STORAGE) || DEFAULT_API_KEY;
    }
    function setApiKey(key) {
        localStorage.setItem(AI_KEY_STORAGE, key);
    }
    function getAiHistory() {
        try { return JSON.parse(localStorage.getItem(AI_HISTORY_STORAGE)) || []; } catch(e) { return []; }
    }
    function saveAiHistory(history) {
        localStorage.setItem(AI_HISTORY_STORAGE, JSON.stringify(history));
    }

    function buildProgramDescription() {
        const parts = [];
        parts.push('== ПРОГРАММА ТРЕНИРОВОК ==');
        Object.keys(DAYS).forEach(dayKey => {
            const day = DAYS[dayKey];
            parts.push(`День ${dayKey}: ${day.title}`);
            parts.push(day.subtitle);
            if (day.circuit) {
                parts.push(`Круговая тренировка: ${day.rounds} круга, отдых между кругами ${day.restBetweenRounds} сек.`);
                day.exercises.forEach(ex => {
                    const params = ex.mode==='time' ? `${ex.duration} сек` : ex.repsLabel;
                    const sides = ex.sides ? ' (на каждую сторону)' : '';
                    parts.push(`- ${ex.name}${sides}: ${params}${ex.tech ? ' | Техника: '+ex.tech : ''}`);
                });
            } else {
                day.exercises.forEach(ex => {
                    const sets = ex.sets;
                    const params = ex.mode==='time' ? `${ex.duration} сек` : ex.repsLabel;
                    const sides = ex.sides ? ' (на каждую сторону)' : '';
                    parts.push(`- ${ex.name}${sides}: ${sets} подход(а) × ${params}, отдых ${ex.restLabel}${ex.note ? ' | '+ex.note : ''}`);
                });
            }
            parts.push('');
        });
        return parts.join('\n');
    }

    function buildWorkoutHistoryDescription() {
        const log = getLog();
        if (!log.length) return 'История тренировок пока пуста.';
        const lastEntries = log.slice(0, 10);
        const lines = lastEntries.map(e => {
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
    const progressionBanner = $('#progressionBanner');
    const progressionText = $('#progressionText');
    const player = $('#player');
    const playerCrumbs = $('#playerCrumbs');
    const playerNum = $('#playerNum');
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
    const logDrawer = $('#logDrawer');
    const logList = $('#logList');
    const playerImageContainer = $('#playerImageContainer');
    const playerImage = $('#playerImage');
    const restAdjust = $('#restAdjust');
    const restMinus = $('#restMinus');
    const restPlus = $('#restPlus');
    const settingsBtn = $('#settingsBtn');
    const settingsModal = $('#settingsModal');
    const themeSelect = $('#themeSelect');
    const voiceToggleCheckbox = $('#voiceToggle');
    const closeSettingsBtn = $('#closeSettingsBtn');

    const aiTrainerBtn = $('#aiTrainerBtn');
    const aiModal = $('#aiModal');
    const aiMessages = $('#aiMessages');
    const aiForm = $('#aiForm');
    const aiInput = $('#aiInput');
    const closeAiBtn = $('#closeAiBtn');
    const openaiKeyInput = $('#openaiKey');

    /* ========== THEME ========== */
    function applyTheme(mode) {
        if (mode === 'light') document.documentElement.setAttribute('data-theme', 'light');
        else if (mode === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
        else document.documentElement.removeAttribute('data-theme');
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) metaThemeColor.setAttribute('content', mode === 'light' ? '#FFFFFF' : '#FF5A1F');
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
        utter.rate = 0.98;
        utter.pitch = 1.05;
        utter.volume = 1.0;
        synth.speak(utter);
    }
    function announceCountdown(seconds) {
        if (!voiceEnabled || seconds > 5 || seconds < 1) return;
        speak(String(seconds), true);
    }

    voiceToggleCheckbox.checked = voiceEnabled;
    themeSelect.value = localStorage.getItem('theme') || 'system';
    applyTheme(themeSelect.value);
    openaiKeyInput.value = getApiKey();

    /* ========== AI TRAINER LOGIC ========== */
    let aiHistory = getAiHistory();
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
    }
    function addMessage(role, content) {
        aiHistory.push({ role, content });
        saveAiHistory(aiHistory);
        addMessageToDOM(role, content);
    }

    async function sendToAI(userMessage) {
        const apiKey = getApiKey();
        if (!apiKey) {
            addMessage('assistant', 'Пожалуйста, укажите API-ключ OpenRouter в настройках.');
            return;
        }

        addMessage('user', userMessage);

        const programInfo = buildProgramDescription();
        const historyInfo = buildWorkoutHistoryDescription();
        const systemPrompt = `Ты — персональный фитнес-тренер в приложении "Домашний фитнес". 
Отвечай кратко, полезно и мотивирующе на русском языке.

Ты имеешь полное знание программы тренировок и истории пользователя.

${programInfo}

${historyInfo}

Учитывай эти данные при ответах: давай советы по прогрессии, технике, отдыху, изменению веса, питанию. 
Если пользователь спрашивает о конкретном упражнении, уточняй его параметры из программы.
Если просят список упражнений — перечисляй их по дням, кратко и структурированно.`;

        const model = FREE_MODELS[0];
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': location.origin || 'https://localhost'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...aiHistory
                    ],
                    max_tokens: 2000,
                    temperature: 0.7
                })
            });

            const status = response.status;
            let data = null;
            try { data = await response.json(); } catch (e) { data = null; }

            if (response.ok && data) {
                const choice = data.choices && data.choices[0];
                const message = choice && choice.message;
                let botReply = '';
                if (message) {
                    if (typeof message.content === 'string' && message.content.length) {
                        botReply = message.content;
                    } else if (typeof message.reasoning === 'string' && message.reasoning.length) {
                        botReply = message.reasoning;
                    }
                }
                botReply = String(botReply || '').trim();
                if (!botReply) {
                    botReply = 'Модель вернула пустой ответ. Попробуйте переформулировать запрос или повторить.';
                }
                addMessage('assistant', botReply);
            } else {
                const errorMsg = (data && (data.error?.message || data.error)) || `HTTP ${status}`;
                console.error('OpenRouter error:', data || response);
                addMessage('assistant', `Ошибка API: ${typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg)}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            addMessage('assistant', `Ошибка сети: ${error.message}. Проверьте подключение и CORS.`);
        }
    }

    aiTrainerBtn.addEventListener('click', () => {
        aiModal.hidden = false;
        renderAiHistory();
        aiInput.focus();
    });
    closeAiBtn.addEventListener('click', () => aiModal.hidden = true);
    aiModal.addEventListener('click', (e) => { if (e.target === aiModal) aiModal.hidden = true; });
    aiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = aiInput.value.trim();
        if (!text) return;
        aiInput.value = '';
        sendToAI(text);
    });

    openaiKeyInput.addEventListener('change', () => {
        const val = openaiKeyInput.value.trim();
        if (!val) {
            localStorage.removeItem(AI_KEY_STORAGE);
            openaiKeyInput.value = DEFAULT_API_KEY;
        } else {
            setApiKey(val);
        }
    });

    const resetKeyBtn = document.getElementById('resetKeyBtn');
    if (resetKeyBtn) {
        resetKeyBtn.addEventListener('click', () => {
            localStorage.removeItem(AI_KEY_STORAGE);
            openaiKeyInput.value = DEFAULT_API_KEY;
            alert('Ключ сброшен к стандартному.');
        });
    }

    /* ========== STATE ========== */
    let currentView = 'A';
    const sessionDone = { A: new Set(), B: new Set(), C: new Set() };
    let steps = [], stepIdx = 0, sessionType = null, timeLeft = 0, totalTime = 0, ticking = false, intervalId = null;
    let currentPhase = 'idle';
    const dayOrder = ['A', 'B', 'C'];

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
    function haptic(ms) { if (navigator.vibrate) navigator.vibrate(ms); }

    /* ========== STEP GENERATION ========== */
    function enrichStep(step, ex) { if (ex && exerciseImages[ex.name]) step.image = exerciseImages[ex.name]; return step; }
    function makeWorkStep(ex, exIdx, totalEx, setNum, totalSets, side) {
        return {
            kind:'work', exNum:ex.num, exName:ex.name, exIdx, totalEx,
            setLabel:`Подход ${setNum} из ${totalSets}`+(side?` · ${side}`:''),
            duration: ex.mode==='time'?ex.duration:null,
            repsLabel: ex.mode==='time'?(ex.durationLabel||`${ex.duration} сек`):ex.repsLabel,
            note:null
        };
    }
    function makeRestStep(ex, exIdx, totalEx, label, duration, restLabel) {
        return {
            kind:'rest', exNum:ex.num, exName:'Отдых', exIdx, totalEx,
            setLabel:label, duration, repsLabel:restLabel, note:null
        };
    }
    function makeCircuitWorkStep(ex, exIdx, totalEx, round, totalRounds, side) {
        return {
            kind:'work', exNum:ex.num, exName:ex.name, exIdx, totalEx,
            setLabel:`Круг ${round} из ${totalRounds}`+(side?` · ${side}`:''),
            duration: ex.mode==='time'?ex.duration:null,
            repsLabel: ex.mode==='time'?`${ex.duration} сек`:ex.repsLabel,
            note: ex.tech||null
        };
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
    function buildCircuitSteps(dayKey) {
        const day = DAYS[dayKey]; const list = [];
        for (let r=1; r<=day.rounds; r++) {
            day.exercises.forEach((ex,exIdx)=>{
                if (ex.sides) {
                    ['правая','левая'].forEach(side=>list.push(enrichStep(makeCircuitWorkStep(ex,exIdx,day.exercises.length,r,day.rounds,side),ex)));
                } else {
                    list.push(enrichStep(makeCircuitWorkStep(ex,exIdx,day.exercises.length,r,day.rounds,null),ex));
                }
            });
            if (r<day.rounds) list.push({kind:'rest',exNum:'',exName:'Отдых между кругами',exIdx:-1,totalEx:day.exercises.length,setLabel:`Круг ${r} из ${day.rounds}`,duration:day.restBetweenRounds,note:null});
        }
        return list;
    }

    /* ========== SESSION ENGINE ========== */
    function startSession(type, steplist, startIdx=0) {
        sessionType=type; steps=steplist; stepIdx=startIdx;
        player.hidden=false; document.body.style.overflow='hidden';
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
            if (nextWorkStep) {
                nextExerciseBlock.hidden = false;
                nextExerciseName.textContent = nextWorkStep.exName;
            } else {
                nextExerciseBlock.hidden = true;
            }
        } else {
            nextExerciseBlock.hidden = true;
        }

        if (step.kind === 'work') {
            if (shouldPrep(step)) startPrep(step);
            else beginWork(step);
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
        skipBtn.hidden = false;
        skipBtn.textContent = 'Пропустить';
        restAdjust.hidden = true;

        speak(`Приготовься. ${step.exName}.`, true);

        ticking = true;
        intervalId = setInterval(() => {
            prepLeft--;
            if (prepLeft > 0) {
                ringTime.textContent = String(prepLeft);
                ringOuter.style.setProperty('--progress', `${(prepLeft/5)*360}deg`);
                speak(String(prepLeft), true);
            } else {
                clearInterval(intervalId);
                ticking = false;
                speak('Начали!', true);
                beep(880, 0.15);
                haptic([80, 40, 80]);
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
            skipBtn.hidden = false;
            skipBtn.textContent = 'Пропустить';
            restAdjust.hidden = true;
            startTimer();
        } else {
            ringPhase.textContent = 'РАБОТА';
            ringTime.textContent = '✓';
            ringOuter.style.setProperty('--progress', '360deg');
            mainActionBtn.textContent = 'Готово';
            skipBtn.hidden = false;
            skipBtn.textContent = 'Пропустить';
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
            skipBtn.hidden = false;
            skipBtn.textContent = 'Пропустить';
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

    function sessionTitle() {
        return DAYS[sessionType].title;
    }

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
        updateRing();
    }
    function toggleTimer() {
        const step = steps[stepIdx];
        if (currentPhase === 'prep') {
            clearInterval(intervalId);
            ticking = false;
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
    function skipStep() { clearInterval(intervalId); ticking=false; nextStep(); }
    function nextStep() {
        stepIdx++;
        if (stepIdx >= steps.length) { finishSession(); return; }
        setupStep();
    }
    function markExerciseProgress(step) {
        if (step.kind!=='work') return;
        if (sessionType==='A'||sessionType==='B'||sessionType==='C') sessionDone[sessionType].add(step.exIdx);
    }
    function closePlayer() {
        clearInterval(intervalId); ticking=false;
        player.hidden=true; document.body.style.overflow='';
        restAdjust.hidden=true;
        if (synth && synth.speaking) synth.cancel();
    }
    function finishSession() {
        speak('Тренировка завершена. Отличная работа!', true);
        closePlayer();
        if (sessionType==='A'||sessionType==='B'||sessionType==='C') {
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
    function renderBanner() {
        if (['A','B','C'].includes(currentView)) {
            const msg = checkProgression(currentView);
            if (msg) { progressionBanner.hidden=false; progressionText.textContent=msg; return; }
        }
        progressionBanner.hidden=true;
    }
    function exerciseCard(ex, exIdx, dayKey) {
        const done = sessionDone[dayKey].has(exIdx);
        const repsText = ex.mode==='time'?(ex.durationLabel||`${ex.duration} сек`):ex.repsLabel;
        const imgSrc = exerciseImages[ex.name];
        const plateContent = imgSrc ? `<img src="${imgSrc}" alt="${ex.name}" class="plate">` : ``;
        return `<div class="card ${done?'is-done':''}" data-day="${dayKey}" data-ex="${exIdx}" style="animation-delay:${exIdx*0.04}s">
            ${plateContent}
            <div class="card__body">
                <p class="card__name">${ex.name}</p>
                <div class="card__stats"><span>${ex.sets} подх.</span><span>${repsText}</span><span>отдых ${ex.restLabel}</span></div>
                ${ex.note?`<span class="card__alt">${ex.note}</span>`:''}
            </div>
            <button class="card__go" aria-label="Начать"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></button>
        </div>`;
    }
    function renderDay(dayKey) {
        const day = DAYS[dayKey];
        if (day.circuit) {
            const rows = day.exercises.map(ex=>{
                const imgSrc = exerciseImages[ex.name];
                const plateContent = imgSrc ? `<img src="${imgSrc}" alt="${ex.name}" class="plate">` : ``;
                return `<div class="circuit-item">${plateContent}<div class="card__body"><p class="card__name">${ex.name}</p><div class="card__stats"><span>${ex.mode==='time'?ex.duration+' сек':ex.repsLabel}</span></div></div></div>`;
            }).join('');
            mainContent.innerHTML = `<div class="section-head"><div><h2>${day.title}</h2><p>${day.subtitle}</p></div></div>
                <div class="circuit-block"><div class="circuit-block__head"><h3>Круг × ${day.rounds}, отдых ${day.restBetweenRounds} сек между кругами</h3><span>без пауз внутри круга</span></div>
                <div class="circuit-list">${rows}</div>
                <button class="start-circuit" id="startCircuitBtn">Начать круговую тренировку</button></div>`;
            document.getElementById('startCircuitBtn').addEventListener('click', ()=>startSession('C', buildCircuitSteps('C')));
            return;
        }
        const cards = day.exercises.map((ex,i)=>exerciseCard(ex,i,dayKey)).join('');
        mainContent.innerHTML = `<div class="section-head"><div><h2>${day.title}</h2><p>${day.subtitle}</p></div><span class="section-meta" style="display:none;">${day.exercises.length} упр.</span></div>${cards}`;
        mainContent.querySelectorAll('.card').forEach(card=>{
            card.addEventListener('click', e=>{
                if (!e.target.closest('.card__go')) return;
                const idx = Number(card.dataset.ex);
                startSession(dayKey, buildDaySteps(dayKey, idx));
            });
        });
    }
    function renderView() { renderTabs(); renderBanner(); renderDay(currentView); }
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
        if (player.hidden) { touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; }
    }, {passive:true});
    app.addEventListener('touchend', e=>{
        if (!player.hidden) return;
        const dx = (e.changedTouches[0].clientX - touchStartX);
        const dy = (e.changedTouches[0].clientY - touchStartY);
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
            const dir = dx > 0 ? -1 : 1;
            const curIdx = dayOrder.indexOf(currentView);
            const newIdx = Math.min(Math.max(curIdx+dir, 0), dayOrder.length-1);
            if (newIdx !== curIdx) {
                currentView = dayOrder[newIdx];
                renderView();
            }
        }
    });
    player.addEventListener('touchstart', e=>{ touchStartY = e.touches[0].clientY; }, {passive:true});
    player.addEventListener('touchend', e=>{
        const dy = (e.changedTouches[0].clientY - touchStartY);
        if (dy < -50 && !e.target.closest('button')) {
            closePlayer();
            renderView();
        }
    });

    /* ========== EVENTS ========== */
    dayTabs.addEventListener('click', e=>{
        const tab = e.target.closest('.tab');
        if (!tab) return;
        currentView = tab.dataset.view;
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
    document.getElementById('rulesToggle').addEventListener('click', ()=>document.getElementById('rulesCard').classList.toggle('is-open'));
    document.getElementById('openLogBtn').addEventListener('click', ()=>{ renderLog(); logDrawer.hidden=false; });
    document.getElementById('closeLogBtn').addEventListener('click', ()=>{ logDrawer.hidden=true; });
    logDrawer.addEventListener('click', e=>{ if (e.target===logDrawer) logDrawer.hidden=true; });
    document.getElementById('dismissBanner').addEventListener('click', ()=>{ progressionBanner.hidden=true; });

    settingsBtn.addEventListener('click', ()=> settingsModal.hidden = false);
    closeSettingsBtn.addEventListener('click', ()=> settingsModal.hidden = true);
    settingsModal.addEventListener('click', e=>{ if (e.target===settingsModal) settingsModal.hidden = true; });
    themeSelect.addEventListener('change', e=>{
        localStorage.setItem('theme', e.target.value);
        applyTheme(e.target.value);
    });
    voiceToggleCheckbox.addEventListener('change', e=>{
        voiceEnabled = e.target.checked;
        localStorage.setItem('voiceEnabled', voiceEnabled);
        if (!voiceEnabled && synth && synth.speaking) synth.cancel();
        else if (voiceEnabled) speak('Голосовые подсказки включены', true);
    });

    renderView();
});
