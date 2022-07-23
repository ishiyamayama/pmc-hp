type PropsType = {
  categoryName: string
  onClick?: () => void
  current: boolean
  order?: number
  disabled?: boolean
}

export const CategoryButton = ({ categoryName, onClick, current, order, disabled }: PropsType) => (
  <button
    className={`relative p-[.2rem_.6rem_.3rem_.6rem] leading-[1.2] hover:opacity-60
    ${current ? 'opacity-80 hover:opacity-80' : ''} ${disabled ? 'opacity-60 !bg-[#E6E6E6]' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    <span className={`absolute top-0 left-0 w-full h-full border border-current rounded-lg opacity-40 bg-gray
    ${current ? 'border-0' : ''}`} />
    <span className='relative z-10'>{categoryName}</span>
  </button>
)
