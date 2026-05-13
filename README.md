# 용문동 맛집 블로그

대전 서구 용문동 맛집을 소개하는 블로그 사이트입니다.  
**Next.js 15** 기반으로 제작되었으며 **Vercel**을 통해 배포됩니다.

---

## 파일 구조

```
yongmun-food-blog/
├── app/
│   ├── layout.js                ← 루트 레이아웃 (Navbar, Footer, Bootstrap)
│   ├── page.js                  ← 홈 (히어로 + 카테고리 필터 + 카드 목록)
│   ├── about/page.js            ← 소개 / 문의 페이지
│   └── restaurant/[id]/page.js  ← 맛집 상세 페이지 (동적 라우트)
├── components/
│   ├── Navbar.js                ← 네비게이션 바
│   ├── Footer.js                ← 푸터
│   ├── BootstrapInit.js         ← Bootstrap JS 초기화 (클라이언트)
│   ├── StarRating.js            ← 별점 컴포넌트
│   ├── RestaurantCard.js        ← 맛집 카드
│   ├── RestaurantGrid.js        ← 카테고리 필터 + 카드 목록 (클라이언트)
│   └── RelatedRestaurants.js    ← 관련 맛집 목록
├── data/
│   └── restaurants.json         ← 맛집 데이터 (convert.py가 자동 생성)
├── public/
│   └── images/                  ← 음식 사진 저장 위치
├── styles/
│   └── globals.css              ← 커스텀 CSS 스타일
├── 맛집데이터.xlsx               ← 맛집 정보 입력 파일 (직접 수정)
├── convert.py                   ← 엑셀 → JSON 변환 스크립트
└── 데이터변환.bat                ← 변환 실행 스크립트 (더블클릭)
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
| G | **이미지파일** | `public/images/` 폴더 안의 파일명 (없으면 빈칸) |

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
| S | **추천태그** | 쉼표로 구분: `가성비, 혼밥, 데이트 코스` |
| T | **추가사진** | 쉼표로 구분된 파일명 (`public/images/` 폴더 기준) |
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

`데이터변환.bat`을 더블클릭합니다. `data/restaurants.json`이 자동으로 업데이트됩니다.

> **Python이 없을 경우:** https://python.org 에서 설치 후 "Add Python to PATH"를 반드시 체크하세요.

### 3단계 — 배포

```powershell
git add data/restaurants.json
git commit -m "맛집 추가: [음식점 이름]"
git push
```

push하면 Vercel이 자동으로 감지해 재배포합니다.

---

## 상세 페이지 URL 구조

별도 HTML 파일 없이 **동적 라우트** 방식으로 동작합니다.

- `/restaurant/0` → 첫 번째 맛집 상세 페이지
- `/restaurant/1` → 두 번째 맛집 상세 페이지
- 카드의 **상세보기** 버튼이 자동으로 올바른 URL로 연결됩니다.

---

## 로컬 개발

```powershell
# 의존성 설치 (최초 1회)
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 으로 접속합니다.

---

## Vercel 배포 방법

### 최초 배포

1. [github.com](https://github.com) 에서 새 저장소 생성
2. 로컬에서 push:
   ```powershell
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/계정명/저장소명.git
   git push -u origin main
   ```
3. [vercel.com](https://vercel.com) 접속 → GitHub 로그인
4. **Add New Project** → 저장소 선택 → **Deploy**

Next.js 프로젝트를 자동으로 감지해 설정 없이 배포됩니다.

### 이후 업데이트

```powershell
git add .
git commit -m "업데이트 내용"
git push
```

push할 때마다 Vercel이 자동으로 재빌드 및 재배포합니다.

---

## 이미지 추가 방법

1. 음식점 사진을 `public/images/` 폴더에 복사합니다.
   - 권장 크기: 가로 800px 이상
   - 파일명은 영문으로 작성 (예: `okdang-sundae.jpg`)
2. 엑셀 **G열(이미지파일)** 에 파일명을 입력합니다.
   - 예: `okdang-sundae.jpg`
3. 추가 사진(상세 페이지용)은 **T열(추가사진)** 에 쉼표로 구분해 입력합니다.
   - 예: `okdang-inside.jpg, okdang-menu.jpg`
4. `데이터변환.bat` 실행 후 `git push`합니다.

---

## 사이트명 변경

[components/Navbar.js](components/Navbar.js) 와 [components/Footer.js](components/Footer.js) 에서 `용문동 맛집` 텍스트를 수정합니다.

```jsx
// components/Navbar.js
<i className="bi bi-bowl-hot-fill me-2 text-warning"></i>용문동 맛집  ← 여기 변경
```

---

## 색상 테마 변경

[styles/globals.css](styles/globals.css) 최상단의 CSS 변수를 수정합니다.

```css
:root {
  --primary:       #e67e22;   /* 주색상 (버튼, 강조) */
  --primary-dark:  #d35400;
  --primary-light: #f39c12;
  --bg-warm:       #fdf8f3;   /* 페이지 배경색 */
}
```

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| UI 라이브러리 | React 19 |
| CSS 프레임워크 | Bootstrap 5.3 (npm) |
| 아이콘 | Bootstrap Icons 1.11 (npm) |
| 폰트 | Google Fonts — Noto Sans KR |
| 데이터 | JSON (Python + openpyxl로 엑셀 변환) |
| 배포 | Vercel |
