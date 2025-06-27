import React, { ReactNode } from 'react'
import Button from './Button';
import '../style-modules/card-module.css'

type Props = {
    children: ReactNode;
    photo: string;

}

function Card({children, photo}: Props) {
  return (
    <div className="card">
  <img src={photo} className="card-img-top" alt="..."></img>
  <div className="card-body">
    {children}
  </div>
</div> ) }

interface cardBodyProps {
    title: string,
    text?: string
}

export function CardBody(props: cardBodyProps) {
    const {title, text} = props;
    return (
        <>
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{text}</p>
    </>
    )
}
  

export default Card