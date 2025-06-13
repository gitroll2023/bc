# 🧠 Brain Meta - 초등학생을 위한 메타인지 학습 도우미

[![GitHub](https://img.shields.io/badge/GitHub-brain_meta-blue?style=flat&logo=github)](https://github.com/gitroll2023/brain_meta)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=flat&logo=google)](https://ai.google.dev/)

## 📝 프로젝트 소개

**Brain Meta**는 초등학생들의 메타인지 능력 향상을 돕는 웹 애플리케이션입니다. 메타인지란 '자신의 사고 과정을 인식하고 조절하는 능력'으로, 학생들의 학습 효율성과 문제 해결 능력을 크게 향상시킵니다.

이 앱은 학생들이 자신의 학습 목표를 설정하고, 일기를 통해 학습 과정을 기록하며, 퀴즈를 통해 지식을 테스트하고, AI 기반 챗봇과 대화하며 메타인지 능력을 키울 수 있도록 설계되었습니다.

## ✨ 주요 기능

### 🤖 브레인봇 (AI 챗봇)
- Google Gemini 1.5 Flash 모델 기반 AI 챗봇
- 학생의 학년에 맞춘 메타인지적 대화 제공
- 모든 페이지에서 접근 가능한 플로팅 UI

### 📊 학습 목표 관리
- 개인 학습 목표 설정 및 진행 상황 추적
- 단계별 목표 달성 체크리스트
- 시각적 진행률 표시

### 📔 메타인지 일기
- 학습 과정과 생각을 기록하는 일기 기능
- 감정 상태 기록을 통한 자기 인식 향상
- 날짜별 일기 관리

### 🧩 퀴즈
- 다양한 주제의 퀴즈로 지식 테스트
- 정답 및 설명 제공으로 학습 강화
- 퀴즈 결과 분석

## 🛠️ 기술 스택

- **프론트엔드**: Next.js 14, React, TypeScript, Tailwind CSS
- **백엔드**: Next.js API Routes
- **AI**: Google Gemini 1.5 Flash API
- **인증**: Clerk Authentication
- **스타일링**: Tailwind CSS

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.17.0 이상
- npm 또는 yarn
- Google Gemini API 키

### 설치 방법

```bash
# 저장소 복제
git clone https://github.com/gitroll2023/brain_meta.git
cd brain_meta

# 의존성 설치
npm install
# 또는
yarn install

# 환경 변수 설정
# .env.local 파일을 생성하고 다음 변수 추가
# GEMINI_API_KEY=your_gemini_api_key

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📱 스크린샷

(스크린샷 이미지는 실제 배포 후 추가될 예정입니다)

## 👥 기여하기

이 프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 포크하세요
2. 새 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

프로젝트 관련 문의는 GitHub 이슈를 통해 해주세요.
