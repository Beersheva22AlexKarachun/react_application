import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { range } from './util/number-functions';

test("power of 2", () => {
  expect(Math.pow(2, 3)).toEqual(8)
})

test("range test", () => {
  expect(range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})