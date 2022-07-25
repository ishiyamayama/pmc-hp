module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xl: { max: '1440px' },
        lg: { max: '1080px' },
        md: { max: '800px' },
        sm: { max: '540px' },
        xlMin: { min: '1441px' },
        lgMin: { min: '1081px' },
        mdMin: { min: '801px' },
        smMin: { min: '541px' },
      },
      colors: {
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
        green: 'var(--color-green)',
        blue: 'var(--color-blue)',
        brown: 'var(--color-brown)',
        gray: 'var(--color-gray)',
        yellow: 'var(--color-yellow)',
        orange: 'var(--color-orange)',
      },
      fontFamily: {
        noto: 'var(--font-noto)',
        inter: 'var(--font-inter)',
      },
    },
  },
}
