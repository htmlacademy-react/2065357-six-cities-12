import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('changeCity', (city: string) => ({ payload: city }));
export const addOffers = createAction('addOffers');
