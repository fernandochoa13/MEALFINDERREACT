import React from 'react';

type Props = {
  category: string;
  isSelected: boolean,
  onClick: (category: string) => void;
};

function categoryItem({category, isSelected, onClick}: Props) {

  return (
    <li
      className={`nav-item btn btn-outline-primary my-1 ${isSelected ? 'active' : ''}`}
      onClick={() => onClick(category)}
    >
      {category}
    </li>
  )
}

export default categoryItem