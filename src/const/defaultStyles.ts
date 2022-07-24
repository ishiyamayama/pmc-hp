export type StyleProps = {
  fontFamily: string
  fontSize: {
    value: number | string
    unit: string
  }
  lineHeight: {
    value: number | string
    unit: string
  }
  letterSpacing: {
    value: number | string
    unit: string
  }
  color: string
  backgroundColor: string
}

export const defaultStyles = {
  fontFamily: 'Noto Serif JP',
  fontSize: { value: 12, unit: 'px' },
  lineHeight: { value: 160, unit: '%' },
  letterSpacing: { value: 0, unit: 'px' },
  color: '#000000',
  backgroundColor: '#ffffff',
}
