import React, { ReactNode } from 'react'
import '../style-modules/dashboard-module.css'

type Props = {
    children: ReactNode
}

function DashBoard({children}: Props) {
  return (
    <div className="Plataforma">
      {children}
    </div>
  )
}

export default DashBoard