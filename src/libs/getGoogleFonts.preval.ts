import axios from 'axios'
import preval from 'next-plugin-preval'

async function getData() {
  const { data } = await axios.get(
    'https://www.googleapis.com/webfonts/v1/webfonts?key=' + process.env.GOOGLE_FONTS_API_KEY,
  )
  const fonts: string[] = []
  data.items.forEach((font: { variants: string | string[]; family: string }) => {
    font.variants?.includes('regular') && fonts.push(font.family)
  })
  return { fonts }
}

export default preval(getData())
