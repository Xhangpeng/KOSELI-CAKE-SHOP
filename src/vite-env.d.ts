/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ESEWA_PRODUCT_CODE: string
  readonly VITE_ESEWA_GATEWAY_URL: string
  readonly VITE_KHALTI_GATEWAY_URL: string
  readonly VITE_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
