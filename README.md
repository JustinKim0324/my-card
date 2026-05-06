# Justin — 웹 명함

개인 웹 명함(디지털 비즈니스 카드) 페이지입니다.  
외부 라이브러리 없이 순수 HTML / CSS / JS로 제작되었습니다.

## 미리보기

> `index.html`을 브라우저에서 열거나, 정적 호스팅 서비스에 업로드하면 바로 확인할 수 있습니다.

## 파일 구조

```
MY CARD/
├── index.html      # 마크업 (시맨틱 태그)
├── style.css       # 스타일 (모바일 퍼스트 반응형)
├── script.js       # 이메일 클립보드 복사 인터랙션
├── CLAUDE.md       # Claude Code 작업 가이드
└── README.md
```

## 기능

- **이니셜 아바타** — 이미지 없이 CSS 그라데이션 원형으로 표현
- **이메일 버튼** — 클릭 시 `mailto:` 실행 + 주소 클립보드 자동 복사
- **토스트 알림** — 복사 완료 후 2초간 피드백 메시지 표시
- **반응형** — 모바일(375px) ~ 데스크톱 전 구간 대응
- **안전 영역** — iPhone 노치 / 홈 인디케이터 영역 자동 회피
- **등장 애니메이션** — 카드 및 아바타 부드러운 페이드인 효과

## 콘텐츠 수정 방법

`index.html`에서 아래 항목을 교체하세요.

| 항목 | 위치 |
|------|------|
| 이니셜 | `.avatar` 내부 텍스트 |
| 이름 | `<h1 class="name">` |
| 직함 | `<p class="title">` |
| 한 줄 소개 | `<p class="bio">` |
| 이메일 | `<a>` 태그의 `href`, `data-email`, 텍스트 |

포인트 컬러 변경은 `style.css` `:root`의 `--color-primary` 값을 수정하세요.

## 기술 스택

- HTML5 / CSS3 / Vanilla JS
- CSS 변수, Flexbox, `@media` 쿼리, `env(safe-area-inset-*)`
- Clipboard API (`navigator.clipboard.writeText`)
