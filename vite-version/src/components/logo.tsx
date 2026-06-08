import * as React from "react"

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number
}

export function Logo({ size = 24, className, style, ...props }: LogoProps) {
  return (
    <img
      src="/ascentrix-logo.png"
      alt="Ascentrix logo"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', ...style }}
      {...props}
    />
  )
}
