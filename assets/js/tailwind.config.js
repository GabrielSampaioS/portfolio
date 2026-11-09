/* Configuração do Tailwind CDN. Carregada depois do script do CDN (ver _includes/head.html). */
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-primary': '#000000',
        'light-on-primary': '#FFFFFF',
        'light-surface': '#000000',
        'light-on-surface': '#F2F0EB',
        'light-surface-variant': '#171717',
        'light-on-surface-variant': '#A3A3A3',
        'light-outline': '#FFFFFF',
        'light-outline-subtle': '#333333',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        label: ['"JetBrains Mono"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
};
