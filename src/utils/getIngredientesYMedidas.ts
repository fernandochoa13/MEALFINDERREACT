export default function getIngredientesYMedidas(receta: any) {
  const list: {ingrediente: string; medida: string}[] = [];

  for(let i = 1; i <= 20; i++) {
    const ingrediente = receta[`strIngredient${i}`];
    const medida = receta[`strMeasure${i}`];

    if(ingrediente && ingrediente.trim() !== '') {
    list.push({
      ingrediente,
      medida: medida?.trim() ?? 'No especificado',
    })
    }
    
  }
  return list
}