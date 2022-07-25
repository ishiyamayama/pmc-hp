import { useEffect, useState } from "react"

export const Hello = () => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    !initialized && console.log("パソコン音楽クラブのHPへようこそ!")
    setInitialized(true)
  }, [initialized])
  return null
}
