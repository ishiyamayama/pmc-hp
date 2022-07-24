type NumberWidthUnit = {
  value: number | string
  unit: string
}
type RgbaColor = {
  r: number
  g: number
  b: number
  a: number
}

export type StyleProps = {
  fontFamily: string
  fontSize: NumberWidthUnit
  lineHeight: NumberWidthUnit
  letterSpacing: NumberWidthUnit
  color: RgbaColor
  backgroundColor: RgbaColor
}

export const defaultStyles = {
  fontFamily: 'Noto Serif JP',
  fontSize: { value: 12, unit: 'px' },
  lineHeight: { value: 160, unit: '%' },
  letterSpacing: { value: 0, unit: 'px' },
  color: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  backgroundColor: {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  },
}
