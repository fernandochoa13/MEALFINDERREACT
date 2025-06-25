import React, { ReactNode } from 'react'
import Button from './Button';
import  '../style-modules/modal-module.css'

type Props = {
    children: ReactNode;
    onClose: () => void;
}



function Modal({children, onClose}: Props) {
  return (
   <>
   <div onClick={onClose} className="Modal-Background">
<div className="Modal-Content">
  {children}
</div>
<Button onClick={onClose}>Cerrar</Button>
   </div>
   
   </>
  )
}

export default Modal