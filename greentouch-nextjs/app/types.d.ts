// Types for image modules in TypeScript
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

// Add additional type declarations as needed
declare module '*.json' {
  const content: any;
  export default content;
}

// Cloudflare Turnstile (loaded via <script> in the contact form).
interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
  action?: string;
}

interface TurnstileApi {
  render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
}

interface Window {
  turnstile?: TurnstileApi;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
} 