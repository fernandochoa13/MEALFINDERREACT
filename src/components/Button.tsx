import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    onClick: () => void;

}

function Button({children, onClick}: Props) {

  return (
    <button onClick={onClick} >{children}</button>
  )
}

export default Button