# 위치 기록 크롬 확장프로그램 개발 TODO

## 🎯 프로젝트 목표

카카오 지도 API를 사용하여 위치정보를 기록하는 크롬 확장프로그램 개발

## ✅ 완료된 작업

- [x] 기본 HTML 파일 생성 (index.html)
- [x] 카카오 지도 API 키 설정
- [x] 기본 지도 표시 코드 작성
- [x] manifest.json 기본 설정

## 📋 해야 할 작업

### 1. 기본 파일 구조 완성

- [ ] popup.html 파일 생성/수정
- [ ] popup.js 파일 생성
- [ ] background.js 파일 생성
- [ ] CSS 스타일 파일 생성
- [ ] 아이콘 파일들 생성 (16px, 48px, 128px)

### 2. manifest.json 설정 완료

- [x] 기본 메타데이터 설정
- [ ] 권한 설정 (geolocation, storage, activeTab)
- [ ] host_permissions 설정 (카카오 API 도메인)
- [ ] content_security_policy 설정
- [ ] action 설정 (팝업 연결)

### 4. 핵심 기능 구현

- [ ] 현재 위치 받아오기
- [ ] 아이콘 라이브러리 사용(fontawesome)
- [ ] 지도 클릭으로 위치 선택 기능
- [ ] 위치 정보 저장 기능 (Chrome Storage API)
- [ ] 저장된 위치 목록 표시 기능
- [ ] 위치 정보 삭제 기능

### 5. 사용자 인터페이스

- [ ] 팝업 UI 디자인
- [ ] 버튼 및 컨트롤 요소 추가
- [ ] 위치 정보 표시 영역
- [ ] 저장된 위치 목록 UI
- [ ] 반응형 디자인 적용

## 📝 참고사항

- API 키: `e8b07775c6893c65166dea7b59c8aa14`
- 카카오 개발자 센터에서 도메인 등록 필요
- Manifest V3 형식 사용
- Chrome Storage API 사용 예정

## 🔗 유용한 링크

- [카카오 개발자 센터](https://developers.kakao.com/)
- [Chrome 확장프로그램 개발 가이드](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 가이드](https://developer.chrome.com/docs/extensions/mv3/)
