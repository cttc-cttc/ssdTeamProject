/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_WS_URL: string;
  // 여기에 필요한 환경변수 추가
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
