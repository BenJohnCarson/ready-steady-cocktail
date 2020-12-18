import React from 'react';
import { render } from '@testing-library/react';
import Ingredient from './ingredient';

describe('Ingredient', () => {
  test('should display ingredient title', () => {
    const ingredient = { title: 'Rum' };
    const { getByText } = render(<Ingredient ingredient={ingredient} />);

    expect(getByText(ingredient.title)).toBeInTheDocument();
  });
});
