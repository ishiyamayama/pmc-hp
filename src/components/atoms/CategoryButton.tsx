type PropsType = {
  categoryName: string
  onClick?: () => void
  current: boolean
  order?: number
  disabled?: boolean
}

export const CategoryButton = ({ categoryName, onClick, current, disabled }: PropsType) => (
  <button
    className={`relative p-[2px_6px_3px_6px] md:p-[3px_6px_3px_6px] leading-[1.2] border border-current mdMin:hover:opacity-60 focus-visible:text-[blue] rounded-lg group
    ${current ? 'border-bg bg-text text-background !opacity-100' : ''} ${disabled ? 'opacity-60 !bg-[#E6E6E6]' : ''}`}
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
