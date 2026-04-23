# 스튜디오 작업 대시보드 (Studio Scheduler)

오디오 스튜디오 엔지니어를 위한 **초간단 작업 관리 웹앱**입니다.
React + Vite 기반이며, 데이터는 브라우저 `localStorage`에 저장됩니다.

## 1) 프로젝트 폴더 구조

```bash
studio-scheduler-dashboard/
├─ index.html
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ data.js
│  ├─ utils.js
│  ├─ styles.css
│  └─ components/
│     ├─ ProjectForm.jsx
│     ├─ ProjectList.jsx
│     └─ ProjectItem.jsx
└─ README.md
```

## 2) 필요한 설치 명령어

아래 명령어를 순서대로 실행하세요.

```bash
# 1. 프로젝트 폴더로 이동
cd studio-scheduler-dashboard

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

## 3) 기능 설명

- 프로젝트 추가/수정/삭제
- 상태(대기/작업중/피드백 대기/완료), 마감일, 우선순위, 메모 관리
- "오늘 해야 할 작업" 자동 분류 (마감일이 오늘 또는 상태가 작업중)
- 상태별 리스트 보기
- 완료된 프로젝트는 아카이브 섹션에 자동 분리
- localStorage 저장으로 새로고침 후에도 데이터 유지
- 다크모드 기본 + 모바일 대응 레이아웃

## 4) 실행 방법 (완전 초보 기준)

### A. 준비물 설치
1. [Node.js LTS](https://nodejs.org/) 설치
2. 설치 확인:

```bash
node -v
npm -v
```

### B. 프로젝트 실행
1. 터미널 열기
2. 프로젝트 폴더로 이동
3. 아래 실행

```bash
npm install
npm run dev
```

4. 터미널에 표시되는 주소(보통 `http://localhost:5173`)를 브라우저에서 열기

### C. 빌드(배포용 파일 생성)

```bash
npm run build
```

`dist/` 폴더가 생성되면 정적 호스팅(Netlify, Vercel, GitHub Pages 등)에 업로드할 수 있습니다.

## 5) GitHub 새 저장소로 올리는 방법

예시 저장소 이름: `studio-scheduler`

```bash
# 아직 git 초기화를 안 했다면
git init

git add .
git commit -m "feat: create studio scheduler dashboard"

git branch -M main
git remote add origin https://github.com/<YOUR_ID>/studio-scheduler.git
git push -u origin main
```

## 6) 향후 확장 아이디어 3가지

1. **검색/필터 기능 강화**: 아티스트명, 장르, 우선순위로 빠르게 필터링
2. **캘린더 뷰 추가**: 월간 마감일 달력으로 일정 시각화
3. **백업/복원 기능**: JSON 내보내기/가져오기로 데이터 백업

---

원하면 다음 단계로, 제가 이 프로젝트에
- 태그 기능
- 자동 정렬(마감 임박순)
- PWA 오프라인 지원
까지 붙여서 확장해드릴 수 있습니다.

## 7) GitHub Pages 배포 설정 (빈 화면 방지)

이 프로젝트는 아래 두 가지가 설정되어 있습니다.

- `vite.config.js`에 `base: '/simple-studio-task-dashboard/'`
- `.github/workflows/deploy.yml`로 `npm ci` → `npm run build` → `dist` 업로드 → Pages 배포

### GitHub 저장소에서 꼭 선택할 설정

1. GitHub 저장소 → **Settings** → **Pages** 이동
2. **Build and deployment** 항목에서
   - **Source**: `GitHub Actions` 선택
3. `main` 브랜치에 푸시하면 Actions가 자동 배포

배포 후 URL 예시:
`https://<YOUR_ID>.github.io/simple-studio-task-dashboard/`
