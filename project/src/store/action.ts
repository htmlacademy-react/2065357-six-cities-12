import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../const';

export const changeCity = createAction('changeCity', (city: string) => ({ payload: city }));
export const addOffers = createAction('addOffers');
export const changeSortType = createAction('changeSortType', (sortType: SortType) => ({ payload: sortType }));
