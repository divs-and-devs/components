import '@nuxt/types';
import 'vue';
/**
 * show a toast on screen,
 * for more information about the design
 * @see ?path=/story/alerts-toast--default
 */
export type toastOptions = {
  /** The title to show */
  title: string,
  /**
   * The subtitle to show
   */
  subtitle?: string,
  /**
   * the action description, this shows a button at the end of the toast
   */
  action?: string,
  /**
   * the icon name to show at the start of the toast.
   */
  icon?: string,

  /**
   * How long should this toast stay on screen.
   */
  delay?: number = 5000,
  /**
   * Show the toast as an error.
   */
  error?: boolean;
} | string;

declare module '@nuxt/vue-app' {
  interface Context {
    $toast(options: toastOptions): Promise<boolean>;
  }
  interface NuxtAppOptions {
    $toast(options: toastOptions): Promise<boolean>;
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $toast(options: toastOptions): Promise<boolean>;
  }
  interface NuxtAppOptions {
    $toast(options: toastOptions): Promise<boolean>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast(options: toastOptions): Promise<boolean>;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $toast(options: toastOptions): Promise<boolean>;
  }
}
