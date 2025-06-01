declare module 'tailwind-scrollbar' {
  import { PluginCreator } from 'tailwindcss/types/config'
  
  interface ScrollbarOptions {
    nocompatible?: boolean;
  }
  
  function scrollbarPlugin(options?: ScrollbarOptions): PluginCreator;
  export = scrollbarPlugin;
} 