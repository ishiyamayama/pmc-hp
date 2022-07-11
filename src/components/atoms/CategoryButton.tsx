type PropsType = {
  categoryName: string
  onClick?: () => void
  current: boolean
  order?: number
  disabled?: boolean
}

export const CategoryButton = ({ categoryName, onClick, current, order, disabled }: PropsType) => (
  <button
    className={`relative p-[.2rem_.6rem_.3rem_.6rem] rounded-lg leading-[1.2] hover:opacity-60
    ${current ? 'bg-white' : 'bg-[#E6E6E6]'} ${disabled ? 'opacity-60 !bg-[#E6E6E6]' : ''}`}
    onClick={onClick}
    style={{ order }}
    disabled={disabled}
  >
    <span className='absolute top-0 left-0 w-full h-full border border-current rounded-lg opacity-50' />
    {categoryName}
  </button>
)
