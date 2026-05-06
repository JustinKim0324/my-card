/* =========================================
   이메일 버튼 — 클립보드 복사 + 토스트
   ========================================= */
const emailBtn = document.getElementById('emailBtn');
const toast    = document.getElementById('toast');
let toastTimer = null;

emailBtn.addEventListener('click', async () => {
  const email = emailBtn.dataset.email;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
      showToast();
    }
  } catch { /* 권한 거부 시 조용히 무시 */ }
});

function showToast() {
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}


/* =========================================
   날씨 위젯 — Open Meteo API (서울)
   ========================================= */
const WX_URL =
  'https://api.open-meteo.com/v1/forecast' +
  '?latitude=37.5665&longitude=126.9780' +
  '&current_weather=true&timezone=Asia%2FSeoul';

/* WMO 코드 → 상태 */
function wmoToState(code) {
  if (code === 0)  return 'sunny';
  if (code <= 3)   return 'cloudy';
  if (code <= 48)  return 'foggy';
  if (code <= 55)  return 'drizzle';
  if (code <= 82)  return 'rainy';
  if (code <= 86)  return 'snowy';
  if (code <= 77)  return 'snowy';
  return 'thundery';
}

/* 상태 → 한국어 표시 텍스트 */
const WX_LABEL = {
  sunny:    '맑음',
  cloudy:   '흐림',
  foggy:    '안개',
  drizzle:  '이슬비',
  rainy:    '비',
  snowy:    '눈',
  thundery: '천둥번개',
};

/* 상태 → 기상캐스터 말풍선 멘트 */
const WX_SPEECH = {
  sunny:    (t) => `서울 현재 ${t}°C, ☀️ 맑음!`,
  cloudy:   (t) => `서울 현재 ${t}°C, ☁️ 흐린 날씨예요.`,
  foggy:    (t) => `서울 현재 ${t}°C, 🌫 안개 주의!`,
  drizzle:  (t) => `서울 현재 ${t}°C, 🌦 이슬비 내려요.`,
  rainy:    (t) => `서울 현재 ${t}°C, 🌧 우산 챙기세요!`,
  snowy:    (t) => `서울 현재 ${t}°C, ❄️ 눈이 내려요!`,
  thundery: (t) => `서울 현재 ${t}°C, ⚡ 천둥번개 조심!`,
};

/* ── 아이콘 렌더 함수 ─────────────────── */
function renderLoading(el) {
  el.innerHTML = [0,1,2].map(i =>
    `<div class="wx-dot" style="--i:${i}"></div>`
  ).join('');
}

function renderSunny(el) {
  el.innerHTML = `
    <div class="wx-sun">
      <div class="wx-rays">
        ${[0,1,2,3,4,5,6,7].map(i=>`<div class="wx-ray" style="--i:${i}"></div>`).join('')}
      </div>
      <div class="wx-sun-core"></div>
    </div>`;
}

function renderCloud(el) {
  el.innerHTML = `<div class="wx-cloud-wrap"><div class="wx-cloud"></div></div>`;
}

function renderRain(el, count = 5) {
  const step  = 40 / Math.max(count - 1, 1);
  const drops = Array.from({length: count}, (_, i) =>
    `<div class="wx-drop" style="--i:${i};left:${Math.round(7 + i * step)}px"></div>`
  ).join('');
  el.innerHTML = `<div class="wx-rain-wrap"><div class="wx-rain-cloud"></div>${drops}</div>`;
}

function renderSnow(el, count = 5) {
  const step   = 40 / Math.max(count - 1, 1);
  const flakes = Array.from({length: count}, (_, i) =>
    `<div class="wx-flake" style="--i:${i};left:${Math.round(7 + i * step)}px">❄</div>`
  ).join('');
  el.innerHTML = `<div class="wx-snow-wrap"><div class="wx-snow-cloud"></div>${flakes}</div>`;
}

function renderThunder(el) {
  el.innerHTML = `<div class="wx-thunder-wrap"><div class="wx-thunder-cloud"></div><div class="wx-bolt">⚡</div></div>`;
}

/* ── 날씨 fetch 및 UI 반영 ─────────────── */
async function initWeather() {
  const castEl   = document.getElementById('weatherCast');
  const animEl   = document.getElementById('weatherAnim');
  const tempEl   = document.getElementById('weatherTemp');
  const descEl   = document.getElementById('weatherDesc');
  const speechEl = document.getElementById('wxSpeech');

  /* 로딩 상태 */
  renderLoading(animEl);

  try {
    const res  = await fetch(WX_URL);
    const data = await res.json();
    const { temperature, weathercode } = data.current_weather;

    const state = wmoToState(weathercode);
    const temp  = Math.round(temperature);

    /* 배경 테마 변경 */
    castEl.dataset.wx = state;

    /* 날씨 아이콘 렌더 */
    switch (state) {
      case 'sunny':   renderSunny(animEl);   break;
      case 'drizzle': renderRain(animEl, 3); break;
      case 'rainy':   renderRain(animEl, 5); break;
      case 'snowy':   renderSnow(animEl, 5); break;
      case 'thundery':renderThunder(animEl); break;
      default:        renderCloud(animEl);   /* cloudy, foggy */
    }

    /* 텍스트 업데이트 */
    tempEl.textContent   = `${temp}°C`;
    descEl.textContent   = WX_LABEL[state] ?? '--';
    speechEl.textContent = (WX_SPEECH[state] ?? WX_SPEECH.cloudy)(temp);

  } catch {
    /* API 오류 폴백 */
    castEl.dataset.wx    = 'cloudy';
    renderCloud(animEl);
    tempEl.textContent   = '--°C';
    descEl.textContent   = '날씨 정보 없음';
    speechEl.textContent = '날씨 정보를 불러올 수 없어요.';
  }
}

initWeather();
