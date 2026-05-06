/* =========================================
   이메일 버튼 인터랙션
   - 클릭 시 클립보드 복사 + 토스트 알림
   ========================================= */

const emailBtn = document.getElementById('emailBtn');
const toast    = document.getElementById('toast');

let toastTimer = null; // 중복 타이머 방지용

emailBtn.addEventListener('click', async (e) => {
  /* mailto: 기본 동작은 유지하되, 클립보드 복사도 함께 실행 */
  const email = emailBtn.dataset.email;

  try {
    /* 클립보드 API 지원 환경에서만 복사 시도 */
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(email);
      showToast();
    }
  } catch {
    /* 클립보드 권한 거부 등 오류 시 조용히 무시 (mailto는 정상 작동) */
  }
});

/* 토스트 메시지 표시 후 2초 뒤 자동 숨김 */
function showToast() {
  /* 이미 표시 중이면 타이머 초기화 후 재시작 */
  clearTimeout(toastTimer);

  toast.classList.add('show');

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}
