import React from 'react';
import '../style-modules/categoryItem-module.css'

type Props = {
  category: string;
  isSelected: boolean,
  onClick: (category: string) => void;
};

function categoryItem({category, isSelected, onClick}: Props) {

  return (
    <li
      className={`CategoryItem btn ${isSelected ? 'active' : ''}`}
      onClick={() => onClick(category)}
    >
      {category}
    </li>
  )
}

export default categoryItem