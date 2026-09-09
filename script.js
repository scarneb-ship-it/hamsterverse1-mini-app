document.addEventListener('DOMContentLoaded', function() {

    /* ========== DATA ========== */
    const WARMUP = {
        title: 'Разминка', subtitle: '5 минут перед каждым днём', totalSeconds: 5 * 60,
        items: [
            { num: '47', name: 'Круги руками', mode: 'time', duration: 30 },
            { num: '50', name: 'Вращение руками', mode: 'time', duration: 30 },
            { num: '85', name: 'Поза кошки-коровы', mode: 'reps', repsLabel: '10 повторов' },
            { num: '15', name: 'Приседания (без веса)', mode: 'reps', repsLabel: '10 повторов' },
            { num: '11', name: 'Отжимание от стены', mode: 'reps', repsLabel: '10 раз' }
        ]
    };
    const COOLDOWN = {
        title: 'Заминка', subtitle: '3 минуты после каждого дня', totalSeconds: 3 * 60,
        numbersText: '116–122, 142–143, 169–171',
        note: 'Выберите любые растяжки из этого списка и удерживайте их всю заминку.'
    };
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
    const TTS_MODEL = 'deepgram/flux-tts:free';
    const DEFAULT_API_KEY = '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';

    function getLog() { try { return JSON.parse(localStorage.getItem(LOG_KEY)) || []; } catch(e) { return []; } }
    function saveLogEntry(dayKey, quality) {
        const log = getLog();
        log.unshift({ day: dayKey, date: new Date().toISOString(), quality: !!quality });
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
    const voiceInputBtn = $('#voiceInputBtn');
    const voiceSelect = $('#voiceSelect'); // если добавлен в HTML

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
    synth.getVoices();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = () => { /* голоса обновятся автоматически */ };
    }

    function speak(text, priority = false) {
        if (!voiceEnabled) return;
        if (synth.speaking && !priority) return;
        if (synth.speaking && priority) synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'ru-RU';
        utter.rate = 1.0;
        utter.pitch = 1.0;
        utter.volume = 1.0;
        synth.speak(utter);
    }
    function announceStep(step) {
        if (!voiceEnabled) return;
        let message = '';
        if (step.kind === 'work') {
            message = `${step.exName}. ${step.setLabel}. `;
            if (step.duration) message += `Длительность ${step.repsLabel}.`;
            else message += `Повторения: ${step.repsLabel}.`;
        } else if (step.kind === 'rest') {
            message = `Отдых ${step.repsLabel}.`;
        }
        speak(message);
    }
    function announceCountdown(seconds) {
        if (!voiceEnabled || seconds > 5 || seconds < 1) return;
        speak(String(seconds), true);
    }

    // Инициализация UI настроек
    voiceToggleCheckbox.checked = voiceEnabled;
    themeSelect.value = localStorage.getItem('theme') || 'system';
    applyTheme(themeSelect.value);
    openaiKeyInput.value = getApiKey();

    // Заполнение списка голосов (если есть voiceSelect)
    function populateVoiceList() {
        if (!voiceSelect) return;
        const voices = synth.getVoices();
        const ruVoices = voices.filter(v => v.lang.toLowerCase().startsWith('ru'));
        while (voiceSelect.options.length > 1) voiceSelect.remove(1);
        ruVoices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
        const savedVoice = localStorage.getItem('selectedVoice');
        if (savedVoice) voiceSelect.value = savedVoice;
    }
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    }
    if (voiceSelect) {
        voiceSelect.addEventListener('change', () => {
            localStorage.setItem('selectedVoice', voiceSelect.value);
        });
    }

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

        const systemPrompt = `Ты — персональный фитнес-тренер в приложении "Домашний фитнес". 
        Отвечай кратко, полезно и мотивирующе. 
        Ты знаешь структуру приложения: есть разминка, три силовых дня (A - силовая база, B - мышечный рост, C - жиросжигание/круговая), и заминка. 
        Пользователь занимается дома с гантелями и турником. 
        Отвечай на русском языке.`;

        const model = FREE_MODELS[0];
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...aiHistory
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            const status = response.status;
            const data = await response.json();

            if (response.ok) {
                if (data.choices && data.choices[0] && data.choices[0].message) {
                    const botReply = data.choices[0].message.content.trim();
                    addMessage('assistant', botReply);
                    speakAIWithTTS(botReply); // <-- используем новую TTS
                } else {
                    addMessage('assistant', 'Неожиданный формат ответа от API.');
                }
            } else {
                const errorMsg = data.error?.message || data.error || `HTTP ${status}`;
                console.error('OpenRouter error:', data);
                addMessage('assistant', `Ошибка API: ${errorMsg}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            addMessage('assistant', `Ошибка сети: ${error.message}. Проверьте подключение и CORS.`);
        }
    }

    // Функция озвучивания ответа ИИ через TTS OpenRouter
    async function speakAIWithTTS(text) {
        if (!voiceEnabled) return;
        const apiKey = getApiKey();
        if (!apiKey) return;

        try {
            const response = await fetch('https://openrouter.ai/api/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: TTS_MODEL,
                    input: text,
                    voice: 'nova' // можно попробовать 'shimmer', 'female' и др.
                })
            });

            if (!response.ok) {
                console.error('TTS API error:', response.status);
                throw new Error('TTS failed');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error('TTS error, falling back to Web Speech:', error);
            // Fallback на Web Speech API
            if (synth.speaking) synth.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'ru-RU';
            utter.rate = 1.0;
            utter.pitch = 1.1;
            const voices = synth.getVoices();
            const ruVoice = voices.find(v => v.lang.startsWith('ru')) || voices[0];
            if (ruVoice) utter.voice = ruVoice;
            synth.speak(utter);
        }
    }

    /* ========== SPEECH RECOGNITION ========== */
    let recognition = null;
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'ru-RU';
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            aiInput.value = transcript;
            aiForm.dispatchEvent(new Event('submit'));
        };

        recognition.onerror = (event) => {
            console.error('Ошибка распознавания речи:', event.error);
            voiceInputBtn.classList.remove('is-active');
            if (event.error === 'not-allowed') {
                addMessage('assistant', 'Разрешите доступ к микрофону в настройках браузера.');
            }
        };

        recognition.onend = () => {
            voiceInputBtn.classList.remove('is-active');
        };
    } else {
        if (voiceInputBtn) voiceInputBtn.style.display = 'none';
    }

    // Обработчики ИИ
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
    voiceInputBtn.addEventListener('click', () => {
        if (!recognition) return;
        if (voiceInputBtn.classList.contains('is-active')) {
            recognition.stop();
        } else {
            try {
                recognition.start();
                voiceInputBtn.classList.add('is-active');
            } catch (e) {
                console.error('Ошибка запуска распознавания:', e);
            }
        }
    });
    openaiKeyInput.addEventListener('change', () => setApiKey(openaiKeyInput.value));

    /* ========== STATE ========== */
    let currentView = 'A';
    const sessionDone = { A: new Set(), B: new Set(), C: new Set(), warmup: new Set(), cooldown: false };
    let steps = [], stepIdx = 0, sessionType = null, timeLeft = 0, totalTime = 0, ticking = false, intervalId = null;
    const dayOrder = ['warmup', 'A', 'B', 'C', 'cooldown'];

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
    function buildFreeformSteps(kind) {
        if (kind==='warmup') return WARMUP.items.map(it=>({kind:'work',exNum:it.num,exName:it.name,exIdx:0,totalEx:WARMUP.items.length,setLabel:'Разминка',duration:it.mode==='time'?it.duration:null,repsLabel:it.mode==='time'?`${it.duration} сек`:it.repsLabel,note:null}));
        return [{kind:'work',exNum:'Z',exName:'Заминка · растяжка',exIdx:0,totalEx:1,setLabel:'Свободный выбор растяжек',duration:COOLDOWN.totalSeconds,repsLabel:`${COOLDOWN.totalSeconds/60} мин`,note:`${COOLDOWN.numbersText}. ${COOLDOWN.note}`}];
    }

    /* ========== SESSION ENGINE ========== */
    function startSession(type, steplist, startIdx=0) {
        sessionType=type; steps=steplist; stepIdx=startIdx;
        player.hidden=false; document.body.style.overflow='hidden';
        speak(`Начинаем ${sessionTitle()}`);
        setupStep();
    }
    function startTimer() {
        ticking=true;
        intervalId=setInterval(()=>{
            timeLeft--;
            if (timeLeft<=3 && timeLeft>0) {
                beep(440,0.06);
                if (steps[stepIdx].kind !== 'rest') announceCountdown(timeLeft);
            }
            if (timeLeft<=0) {
                clearInterval(intervalId); ticking=false;
                beep(880,0.18); haptic([120,60,120]);
                markExerciseProgress(steps[stepIdx]);
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

        ringPhase.textContent = step.kind==='rest'?'ОТДЫХ':(step.duration?'РАБОТА':'ГОТОВ');
        announceStep(step);

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

        if (step.duration) {
            totalTime=step.duration; timeLeft=step.duration;
            updateRing();
            if (step.kind==='rest') {
                mainActionBtn.textContent='Пауза'; skipBtn.hidden=false;
                restAdjust.hidden=false;
                startTimer();
            } else {
                mainActionBtn.textContent='Старт'; skipBtn.hidden=false;
                restAdjust.hidden=true;
            }
        } else {
            totalTime=0; timeLeft=0;
            ringTime.textContent='✓'; ringOuter.style.setProperty('--progress','360deg');
            mainActionBtn.textContent='Готово'; skipBtn.hidden=false;
            restAdjust.hidden=true;
        }
    }
    function sessionTitle() {
        if (sessionType==='warmup') return 'Разминка';
        if (sessionType==='cooldown') return 'Заминка';
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
        else if (sessionType==='warmup') sessionDone.warmup.add(step.exIdx+'-'+step.exNum);
    }
    function closePlayer() {
        clearInterval(intervalId); ticking=false;
        player.hidden=true; document.body.style.overflow='';
        restAdjust.hidden=true;
        if (synth.speaking) synth.cancel();
    }
    function finishSession() {
        speak('Тренировка завершена. Отличная работа!');
        closePlayer();
        if (sessionType==='A'||sessionType==='B'||sessionType==='C') { qualityModal.hidden=false; qualityModal.dataset.day=sessionType; }
        else if (sessionType==='cooldown') { sessionDone.cooldown=true; renderView(); }
        else renderView();
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
    function renderFreeform(kind) {
        const meta = kind==='warmup'?WARMUP:COOLDOWN;
        let list='';
        if (kind==='warmup') {
            list = WARMUP.items.map((it,i)=>{
                const done = sessionDone.warmup.has(i+'-'+it.num);
                const label = it.mode==='time'?`${it.duration} сек`:it.repsLabel;
                return `<div class="free-item ${done?'is-done':''}"><span class="free-item__name">${it.name}</span><span class="free-item__time">${label}</span></div>`;
            }).join('');
        } else {
            list = `<div class="free-item"><span class="free-item__name">Растяжки на выбор: ${COOLDOWN.numbersText}</span><span class="free-item__time">${COOLDOWN.totalSeconds/60} мин</span></div>`;
        }
        mainContent.innerHTML = `<div class="section-head"><div><h2>${meta.title}</h2><p>${meta.subtitle}</p></div></div>
            <div class="free-list" style="display:flex;flex-direction:column;gap:8px;">${list}</div>
            <div class="timer-box"><p>${kind==='warmup'?'Пройдите все упражнения подряд с таймером — точные секунды из плана.':COOLDOWN.note}</p>
            <button class="btn btn--primary" id="startFreeBtn">Начать таймер · ${meta.totalSeconds/60} мин</button></div>`;
        document.getElementById('startFreeBtn').addEventListener('click', ()=>startSession(kind, buildFreeformSteps(kind)));
    }
    function renderView() { renderTabs(); renderBanner(); if (currentView==='warmup') renderFreeform('warmup'); else if (currentView==='cooldown') renderFreeform('cooldown'); else renderDay(currentView); }
    function renderLog() {
        const log = getLog();
        if (!log.length) { logList.innerHTML=`<p class="log-empty">Пока пусто. Заверши первую тренировку — запись появится здесь.</p>`; return; }
        logList.innerHTML = log.map(e=>`<div class="log-item"><span><b>${e.day}</b> · ${dayLabel(e.day)}</span><span>${fmtDate(e.date)}</span><span>${e.quality?'макс.':'норм'}</span></div>`).join('');
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
    document.getElementById('qualityYes').addEventListener('click', ()=>{ saveLogEntry(qualityModal.dataset.day, true); qualityModal.hidden=true; renderView(); });
    document.getElementById('qualityNo').addEventListener('click', ()=>{ saveLogEntry(qualityModal.dataset.day, false); qualityModal.hidden=true; renderView(); });
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
        if (!voiceEnabled && synth.speaking) synth.cancel();
    });

    renderView();
});
