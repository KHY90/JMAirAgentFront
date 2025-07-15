# JMAir Front-End Project

## 📜 프로젝트 소개

JMAir는 에어컨 이전, 설치, 수리 및 청소 서비스를 중개하는 플랫폼의 프론트엔드 프로젝트입니다. 사용자 친화적인 인터페이스를 통해 고객과 서비스 전문가를 연결하고, 편리한 예약 및 관리 기능을 제공하는 것을 목표로 합니다.

## ✨ 주요 기능

*   **사용자 인증**: 회원가입, 로그인, 소셜 로그인(카카오, 네이버), 마이페이지 기능
*   **서비스 신청**: 간편한 폼을 통한 에어컨 설치, 청소, 수리 서비스 접수
*   **견적 및 예약 관리**: 서비스 신청 내역 확인 및 관리자 페이지를 통한 견적 관리
*   **정보 제공**: 서비스 비용 안내, 공지사항, 중고 에어컨 정보 조회
*   **관리자 페이지**: 회원 관리, 서비스 신청 관리, 공지사항 등록 및 수정 등 관리자 전용 기능
*   **반응형 디자인**: 데스크톱, 태블릿, 모바일 등 다양한 디바이스 지원

## 🛠️ 기술 스택

*   **Framework**: Next.js
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **State Management**: MobX
*   **HTTP Client**: Axios
*   **Linting/Formatting**: ESLint

## 📁 프로젝트 구조

```
JMAirFront/
├── public/              # 정적 파일 (이미지 등)
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (admin)/     # 관리자 페이지
│   │   ├── (common)/    # 공통 레이아웃 (헤더, 푸터)
│   │   ├── (domain)/    # 주요 도메인 페이지 (서비스 소개, 비용, 공지 등)
│   │   ├── (home)/      # 메인 페이지
│   │   └── (user)/      # 사용자 관련 페이지 (로그인, 회원가입, 마이페이지)
│   ├── components/      # 공통 컴포넌트
│   ├── hoc/             # 고차 컴포넌트 (HOC)
│   ├── hooks/           # 커스텀 훅
│   ├── types/           # 타입 정의
│   └── utils/           # 유틸리티 함수, 전역 상태 관리
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 시작 가이드

### 1. 저장소 복제

```bash
git clone <repository-url>
cd JMAirFront
```

### 2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하여 개발 서버를 확인할 수 있습니다.

### 4. 빌드 및 프로덕션 실행

```bash
# 빌드
npm run build

# 프로덕션 서버 시작
npm run start
```

## 📄 라이선스

본 프로젝트는 [LICENSE](LICENSE) 파일에 명시된 라이선스를 따릅니다.