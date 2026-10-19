// Safeguard for fetch property setter in sandboxed iframe environments
if (typeof window !== 'undefined') {
  try {
    let currentFetch = window.fetch ? window.fetch.bind(window) : undefined;
    const patch = (target: any) => {
      try {
        const desc = Object.getOwnPropertyDescriptor(target, 'fetch');
        if (!desc || desc.configurable) {
          Object.defineProperty(target, 'fetch', {
            get: () => currentFetch,
            set: (fn) => {
              currentFetch = fn;
            },
            configurable: true,
            enumerable: true,
          });
        }
      } catch (_) {}
    };
    patch(window);
    if (typeof Window !== 'undefined' && Window.prototype) {
      patch(Window.prototype);
    }
  } catch (_) {}
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
