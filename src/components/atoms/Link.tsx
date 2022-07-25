import NextLink from 'next/link'

type Props = {
  href?: string
  className?: string
  children: React.ReactNode
  target?: string
  style?: React.CSSProperties
}

const Link = ({ href, className, children, target = '_self', style }: Props) => {
  return href ? (
    <NextLink href={href} scroll={false} passHref>
      <a
        className={'block ' + className}
        target={target}
        rel={target === '_blank' ? 'noreferrer' : undefined}
        style={style}
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
