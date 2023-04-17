import { Cities, NameSpace, SortType } from '../../const';
import { State } from '../../types/store';

export const getCurrentCity = (state: State): Cities => state[NameSpace.App].city;
export const getCurrentSortType = (state: State): SortType => state[NameSpace.App].sortType;
