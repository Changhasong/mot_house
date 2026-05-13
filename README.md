# 용문동 맛집 블로그

대전 서구 용문동 맛집을 소개하는 정적 HTML 블로그 사이트입니다.

---

## 파일 구조

```
yongmun-food-blog/
├── index.html              ← 메인 페이지 (맛집 카드 목록)
├── restaurant.html         ← 상세 페이지 (restaurant.html?id=N 형태로 동적 렌더링)
├── about.html              ← 블로그 소개 & 문의 페이지
│
├── 맛집데이터.xlsx          ← ★ 맛집 정보 입력 파일 (여기만 수정!)
├── 데이터변환.bat           ← ★ 더블클릭하면 웹사이트 자동 업데이트
├── convert.py              ← 변환 스크립트 (bat 파일이 자동 실행)
│
├── data/
│   └── restaurants.js      ← 변환된 데이터 (convert.py가 자동 생성, 직접 수정 X)
├── css/
│   └── style.css           ← 커스텀 스타일 (Bootstrap 5 보완)
├── js/
│   ├── main.js             ← 메인 페이지: 카드 렌더링 + 카테고리 필터
│   └── detail.js           ← 상세 페이지: 동적 렌더링 (restaurant.html용)
├── images/
│   └── placeholder.svg     ← 이미지 폴더 (음식점 사진을 여기에)
└── README.md               ← 이 파일
```

---

## 맛집 추가 / 수정 방법

### 1단계 — 엑셀 편집

`맛집데이터.xlsx`를 Excel로 열어 내용을 입력합니다.

#### 카드 정보 (A~G열) — 목록 화면에 표시

| 열 | 항목 | 설명 |
|----|------|------|
| A | **이름** | 음식점 이름 |
| B | **카테고리** | 아래 표의 값 중 하나 (여러 개는 쉼표로 구분) |
| C | **설명** | 카드에 표시할 간단 소개 (2~3줄) |
| D | **위치(짧게)** | 카드에 표시할 짧은 주소 |
| E | **추천메뉴** | 쉼표로 구분 |
| F | **별점** | 1~5 사이 숫자, 0.5 단위 |
| G | **이미지파일** | `images/` 폴더 안의 파일명 (없으면 빈칸) |

#### 상세 정보 (H~U열) — 상세 페이지에 표시

| 열 | 항목 | 설명 |
|----|------|------|
| H | **주소(전체)** | 상세 페이지에 표시할 전체 주소 |
| I | **영업시간** | 여러 줄은 셀 안에서 **Alt+Enter**로 줄바꿈 |
| J | **가격대** | 예: 8,000 – 12,000원 |
| K | **주차** | 주차 가능 여부 |
| L | **전화번호** | |
| M | **방문일** | 예: 2025-03-15 |
| N | **후기** | 긴 텍스트. 문단 구분은 **빈 줄(Alt+Enter 두 번)** |
| O | **맛별점** | 1~5 (0.5 단위) |
| P | **가성비별점** | 1~5 (0.5 단위) |
| Q | **분위기별점** | 1~5 (0.5 단위) |
| R | **방문팁** | 노란 알림박스에 표시 |
| S | **추천태그** | 쉼표로 구분: `가성비 찾는 분, 점심 혼밥러` |
| T | **추가사진** | 쉼표로 구분된 파일명 (images/ 폴더 기준) |
| U | **지도URL** | 카카오맵 / 네이버지도 공유 링크 |

#### 카테고리 값

| 값 | 화면 표시 |
|---|--------|
| `korean` | 한식 |
| `chinese` | 중식 |
| `japanese` | 일식 |
| `cafe` | 카페 |
| `bar` | 술집 |
| `lunch` | 점심맛집 |

복수 카테고리는 쉼표로 구분합니다. 예: `korean,lunch`

### 2단계 — 변환 실행

`데이터변환.bat`을 더블클릭합니다. 완료 메시지가 뜨면 성공입니다.

> **Python이 없을 경우:** https://python.org 에서 설치 후 "Add Python to PATH"를 반드시 체크하세요.

### 3단계 — 브라우저 새로고침

`index.html`을 열고 **F5**를 눌러 새로고침하면 변경 사항이 반영됩니다.

---

## 상세 페이지 동작 방식

별도 HTML 파일을 만들 필요 없이 **`restaurant.html?id=N`** 방식으로 동작합니다.

- `restaurant.html?id=0` → 첫 번째 맛집 상세 페이지
- `restaurant.html?id=1` → 두 번째 맛집 상세 페이지
- 카드의 **상세보기** 버튼이 자동으로 올바른 URL로 연결됩니다.

---

## 실행 방법

`index.html`을 브라우저로 직접 열면 됩니다. 서버 설치 불필요.

```
index.html → 우클릭 → 브라우저로 열기
```

VS Code의 **Live Server** 확장을 사용하면 저장 시 자동 새로고침됩니다.

---

## 이미지 추가 방법

1. 음식점 사진을 `images/` 폴더에 복사합니다.
   - 권장 크기: 가로 800px 이상, 파일명은 영문으로
   - 예: `images/yongmun-gamasot.jpg`
2. 엑셀에서 해당 음식점 행의 **G열(이미지파일)** 에 파일명을 입력합니다.
   - 예: `yongmun-gamasot.jpg`
3. 추가 사진(상세 페이지용)은 **T열(추가사진)** 에 쉼표로 구분해 입력합니다.
   - 예: `menu1.jpg, interior.jpg`
4. `데이터변환.bat`을 실행하고 브라우저를 새로고침합니다.

---

## 사이트명 변경

`index.html`, `restaurant.html`, `about.html` 각 파일에서 아래 부분을 찾아 변경합니다.

```html
<a class="navbar-brand fw-bold" href="index.html">
  <i class="bi bi-bowl-hot-fill me-2 text-warning"></i>용문동 맛집  ← 여기 변경
</a>
```

---

## 색상 테마 변경

`css/style.css` 최상단의 CSS 변수를 수정합니다.

```css
:root {
  --primary:        #e67e22;   /* 주색상 (버튼, 강조) */
  --primary-dark:   #d35400;
  --primary-light:  #f39c12;
  --bg-warm:        #fdf8f3;   /* 페이지 배경색 */
}
```

---

## 기술 스택

- HTML5 / CSS3 (CSS Variables)
- Bootstrap 5.3 (CDN)
- Bootstrap Icons 1.11 (CDN)
- Google Fonts — Noto Sans KR (CDN)
- Vanilla JavaScript (카드 렌더링, 카테고리 필터, 상세 페이지 렌더링)
- Python 3 + openpyxl (데이터 변환 스크립트)
