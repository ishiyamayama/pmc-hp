type NumberWidthUnit = {
  value: number | string
  unit: string
}

export type StyleProps = {
  fontFamily: string
  fontSize: NumberWidthUnit
  lineHeight: NumberWidthUnit
  letterSpacing: NumberWidthUnit
  color: string
  backgroundColor: string
}

export const defaultStyles = {
  fontFamily: 'Noto Serif JP',
  fontSize: { value: 12, unit: 'px' },
  lineHeight: { value: 160, unit: '%' },
  letterSpacing: { value: 0, unit: 'px' },
  color: "#000000",
  backgroundColor: "#FFFFFF",
}
