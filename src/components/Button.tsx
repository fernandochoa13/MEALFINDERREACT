import React, { ReactNode } from 'react'
import styles from "../style-modules/button.module.css"

type Props = {
    children: ReactNode;
    onClick?: () => void;
}

function Button({children, onClick}: Props) {

  return (
    <button onClick={onClick}  className={`${styles.buttonReact}`} >{children}</button>
  )
}

export default Button