export type ThemeMode = 'auto' | 'light' | 'dark';

export const THEME_KEY = 'seckc-theme';

export const getStoredTheme = (): ThemeMode => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'auto' || stored === 'light' || stored === 'dark') {
    return stored;
  }
  return 'dark'; // Default to dark
};

export const setStoredTheme = (theme: ThemeMode): void => {
  localStorage.setItem(THEME_KEY, theme);
};

export const applyTheme = (theme: ThemeMode): void => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDark = theme === 'dark' || (theme === 'auto' && prefersDark);
  
  // Remove existing theme classes
  document.body.classList.remove('dark');
  document.documentElement.classList.remove('ion-palette-dark');
  
  if (shouldUseDark) {
    // Apply dark theme
    document.body.classList.add('dark');
    document.documentElement.classList.add('ion-palette-dark');
  }
  
  console.log(`Theme applied: ${theme} (using ${shouldUseDark ? 'dark' : 'light'} mode)`);
};

export const initializeTheme = (): void => {
  const theme = getStoredTheme();
  applyTheme(theme);
};

// Listen for system theme changes when in auto mode
export const watchSystemTheme = (): (() => void) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = () => {
    const currentTheme = getStoredTheme();
    if (currentTheme === 'auto') {
      applyTheme('auto');
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handleChange);
};