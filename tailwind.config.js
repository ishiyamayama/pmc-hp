module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'white': 'var(--color-white)',
        'black': 'var(--color-black)',
        'gray': 'var(--color-gray)',
        'line': 'var(--color-line)',
      },
      fontFamily: {
        avenir: 'var(--font-avenir)',
        noto: 'var(--font-noto)',
        metro: 'var(--font-metro)',
        roboto: 'var(--font-roboto)',
        helvetica: 'var(--font-helvetica)',
      },
    },
  },
};
