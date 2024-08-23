declare module 'react-dom/client' {
    import { ReactElement } from 'react';
    import { Root } from 'react-dom';
  
    interface CreateRootOptions {
      hydrate?: boolean;
      identifierPrefix?: string;
      onRecoverableError?: (error: Error) => void;
    }
  
    function createRoot(container: HTMLElement | DocumentFragment, options?: CreateRootOptions): Root;
    function hydrateRoot(container: HTMLElement | DocumentFragment, initialChildren: ReactElement, options?: CreateRootOptions): Root;
  }
  