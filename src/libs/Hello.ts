import { useEffect, useState } from 'react'

export const Hello = () => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    if (!initialized) {
      console.log('%c\n パソコン音楽クラブのHPへようこそ!\n', 'color: blue')

      console.log(`\n 旧HPはコチラ!\n`, `http://pasoconongaku.jp/Index.html`, ` \n `)
    }
    setInitialized(true)
  }, [initialized])
  return null
}
