## 위치기반 날씨 메모 앱

간단한 크롬 확장 프로그램으로, 현재 위치의 날씨를 확인하면서 하루를 한 줄로 기록하고 저장/삭제할 수 있습니다. 메모는 `chrome.storage.local`에 저장되며, 위치 정보를 이용해 OpenWeatherMap API로 현재 날씨를 표시합니다.

### 주요 기능

- 한줄 일기 작성, 목록 표시, 항목 삭제
- 작성 시 날짜 자동 포맷팅 (`dayjs`)
- 크롬 확장 팝업 UI 제공
- 현재 위치 기반 날씨 표시 (기온/날씨 아이콘)
- 데이터는 브라우저 로컬 스토리지(`chrome.storage.local`)에 저장

### 기술 스택 및 권한

- Manifest V3 크롬 확장
- jQuery 3.7, Day.js
- `geolocation`, `storage` 권한 사용
- OpenWeatherMap Current Weather Data API 사용

### 디렉토리 구조

```
d:\github\location_app\
  ├─ content.js            # 팝업 동작 및 데이터/날씨 로직
  ├─ dayjs.min.js          # 날짜 유틸 라이브러리
  ├─ jquery-3.7.1.js       # jQuery
  ├─ manifest.json         # 확장 설정 (MV3)
  ├─ popup.html            # 팝업 UI 마크업
  ├─ style.css             # 팝업 스타일
  ├─ image\sun.svg         # 아이콘(예시)
  ├─ info.md               # 기타 문서(있다면)
  └─ README.md             # 본 문서
```

### 파일 설명

- `manifest.json`: MV3 구성, `content_scripts`로 jQuery/Day.js/`content.js`를 로드, `geolocation`/`storage` 권한, `popup.html`을 액션 팝업으로 설정.
- `popup.html`: 팝업 레이아웃. 헤더(날씨/아이콘), 일기 리스트, 추가 버튼, `dialog` 모달과 폼.
- `style.css`: 팝업 전반의 UI 스타일, `dialog` 기본 스타일 포함.
- `content.js`:
  - 초기 로드 시 `chrome.storage.local`에서 `diaryItems` 불러와 목록 렌더링
  - 추가 버튼 클릭 → `dialog` 열기, 제출 시 새 항목 추가 및 저장
  - 각 항목의 삭제 버튼으로 UI/스토리지 동기 삭제
  - `navigator.geolocation.getCurrentPosition`으로 좌표 획득 → OpenWeatherMap API 요청 → 아이콘/날씨/기온 표시

### 설치 및 실행 (개발용 로컬 로드)

1. OpenWeatherMap API 키 준비
2. 크롬 주소창에 `chrome://extensions` 입력 후 접속
3. 우측 상단 개발자 모드 활성화
4. "압축해제된 확장 프로그램을 로드" 클릭 → 프로젝트 루트(`location_app`) 선택
5. 브라우저 툴바의 확장 아이콘에서 본 확장을 고정한 뒤 팝업을 열어 사용

### 환경 설정

- OpenWeatherMap API 키: `content.js` 내 `API_KEY` 상수로 사용됩니다.
  - 데모/개인용이 아니라면 키를 코드에 직접 하드코딩하지 말고, 빌드 시 주입하거나 원격에서 안전하게 제공하는 방식을 권장합니다.
- 날씨 언어/단위: 요청 URL의 `units=metric&lang=kr`를 변경하여 조정 가능

### 개인정보 및 보안 참고사항

- 본 확장은 사용자의 현재 위치(위도/경도)를 1회 가져와 외부 API에 요청합니다.
- 메모 데이터는 브라우저의 `chrome.storage.local`에 저장되며 외부로 전송하지 않습니다.
- 배포 시 API 키 노출 방지 방안을 고려하세요.

### 한계 및 개선 아이디어

- 네트워크/권한 거부 시 예외 처리 및 사용자 피드백 보강
- 항목 편집 기능 추가, 검색/필터, 페이지네이션
- 날씨 아이콘 에셋 캐싱, 오프라인 모드
- 동기화 저장(`chrome.storage.sync`) 옵션 지원

### 라이선스

프로젝트 라이선스가 있다면 이 섹션을 업데이트하세요.
