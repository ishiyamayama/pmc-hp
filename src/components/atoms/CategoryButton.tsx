type PropsType = {
  categoryName: string
  onClick?: () => void
  current: boolean
  order?: number
  disabled?: boolean
}

export const CategoryButton = ({ categoryName, onClick, current, order, disabled }: PropsType) => (
  <button
    className={`relative p-[.2rem_.6rem_.3rem_.6rem] md:p-[.3rem_.6rem_.3rem_.6rem] leading-[1.2] border border-current mdMin:hover:opacity-60 focus-visible:text-[blue] rounded-lg group
    ${current ? 'border-bg bg-text text-background' : ''} ${disabled ? 'opacity-60 !bg-[#E6E6E6]' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    <span
      className={`absolute top-0 left-0 w-full h-full rounded-lg opacity-0 bg-current group-focus-visible:opacity-200
    ${current ? 'border-0' : ''}`}
    />
    <span className='relative z-10'>{categoryName}</span>
  </button>
)
