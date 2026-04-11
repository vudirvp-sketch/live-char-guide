import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      // DEP-007 FIX: Add browser globals
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        IntersectionObserver: 'readonly',
        ClipboardItem: 'readonly',
        URL: 'readonly',
        Blob: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        FormData: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        Event: 'readonly',
        CustomEvent: 'readonly',
        KeyboardEvent: 'readonly',
        MouseEvent: 'readonly',
        TouchEvent: 'readonly',
        MutationObserver: 'readonly',
        ResizeObserver: 'readonly',
        performance: 'readonly',
        history: 'readonly',
        location: 'readonly',
        self: 'readonly',
        caches: 'readonly',
        clients: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        Headers: 'readonly',
        crypto: 'readonly',
        atob: 'readonly',
        btoa: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        URLSearchParams: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      // DEP-007 FIX: Enable meaningful rules
      'no-undef': 'warn',
      'no-empty': 'warn'
    }
  }
];
