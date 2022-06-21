import { EditorArea } from 'components/organisms'

type Props = { children?: React.ReactNode }
const AppLayout = ({ children }: Props) => {
  return (
    <main>
      <EditorArea />
      {children}
    </main>
  )
}

export { AppLayout }
