import NextLink from 'next/link'

type Props = {
  href?: string
  scroll?: boolean
  className?: string
  children: React.ReactNode
  target?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLAnchorElement>
}

const Link = ({ href, scroll = false, className, children, target = '_self', style, ref }: Props) => {
  return href ? (
    <NextLink href={href} scroll={scroll} passHref>
      <a
        className={'block ' + className}
        target={target}
        rel={target === '_blank' ? 'noreferrer' : undefined}
        style={style}
        ref={ref}
      >
        {children}
      </a>
    </NextLink>
  ) : (
    // {"リンクがない場合の出し分けを楽に"}
    <div className={className}>{children}</div>
  )
}

export { Link }
