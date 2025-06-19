import React, { ReactNode, useState } from 'react';
import CategoryList from './categoryList';
import CategoryItem from './categoryItem';



type Meal = {
  strCategory: string;
};

type Props = {
  data: Meal[];
  onClick?: (categoria: string) => void;
};

function NavBar({ data, onClick }: Props) {
  const [index, setIndex] = useState(0);

  const handleClick = (i: number, categoria: string) => {
    setIndex(i);
    onClick?.(categoria);
  };

  return (
    <CategoryList>
      {data.map((elemento, i) => (
        <CategoryItem
          key={i}
          category={elemento.strCategory}
          isSelected={i === index}
          onClick={(categoria: string) => handleClick(i, categoria)}
        />
      ))}
    </CategoryList>
  );
}

export default NavBar;
