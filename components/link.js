import * as React from 'react'
import NextLink from 'next/link'
import {useRouter} from 'next/router'

const Link = ({href, children}) => {
  const router = useRouter()

  let className = children.props.className || ''
  if (router.pathname === href) {
    className = `${className} font-bold`
  }

  return (
    <NextLink href={href}>{React.cloneElement(children, {className})}</NextLink>
  )
}

export default Link
