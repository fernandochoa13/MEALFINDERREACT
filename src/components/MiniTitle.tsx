import React, { ReactNode } from 'react'
import styles from '../style-modules/title.module.css'

type Props = {
    children: ReactNode;
}

function MiniTitle({children}: Props) {
  return (
    <div className={`${styles.titleMiniCards}`}>{children}</div>
  )
}

export default MiniTitle