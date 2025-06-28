import React, { ReactNode } from 'react'
import styles from '../style-modules/title.module.css'

type Props = {
    children: ReactNode
}

function Title({children}: Props) {
  return (
    <div className={`${styles.titleCards}`}>{children}</div>
  )
}

export default Title