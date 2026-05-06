# MY CARD — 웹 명함 페이지

개인 웹 명함(디지털 비즈니스 카드) 페이지. 외부 라이브러리 없이 순수 HTML/CSS/JS로 구성.

## 파일 구조

```
MY CARD/
├── index.html   # 마크업 (시맨틱 태그)
├── style.css    # 스타일 (모바일 퍼스트 반응형)
└── script.js    # 이메일 클립보드 복사 인터랙션
```

## 기술 스택

- **HTML5** — 시맨틱 태그 (`<main>`, `<section>`, `<address>`)
- **CSS3** — CSS 변수, Flexbox, 미디어 쿼리 (모바일 퍼스트)
- **Vanilla JS** — Clipboard API, DOM 조작

## 코드 작성 규칙

- **주석은 한국어**로 작성
- CSS 변수는 `:root`에 모아서 관리 (`--color-*`, `--radius-*` 등)
- 모바일 퍼스트: 기본 스타일 → `@media (min-width: 480px)` 순서로 작성
- 호버 효과는 `@media (hover: hover)` 안에 작성 (터치 기기 오작동 방지)
- JS는 `defer` 속성으로 로드, `async/await` 사용

## 콘텐츠 수정 위치

| 항목 | 파일 | 위치 |
|------|------|------|
| 이니셜 | `index.html` | `.avatar` 내부 텍스트 |
| 이름 | `index.html` | `.name` (`<h1>`) |
| 직함 | `index.html` | `.title` (`<p>`) |
| 한 줄 소개 | `index.html` | `.bio` (`<p>`) |
| 이메일 | `index.html` | `.email-btn`의 `href`, `data-email` 속성 |
| 포인트 컬러 | `style.css` | `:root`의 `--color-primary` |

## 반응형 브레이크포인트

| 구간 | 설명 |
|------|------|
| `< 480px` | 모바일 기본 (이메일 버튼 전체 너비) |
| `≥ 480px` | 태블릿/데스크톱 (카드 패딩 확대, 버튼 너비 자동) |
