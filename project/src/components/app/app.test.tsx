import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORT_TYPE, NameSpace, Status } from '../../const';
import App from './app';
import HistoryRouter from '../history-router/history-router';
import { makeFakeComment, makeFakeOffer, makeFakeUserData } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import { State } from '../../types/store';

const userData = makeFakeUserData();
const comments = Array.from({ length: 5 }, makeFakeComment);
const offers = Array.from({ length: 5 }, makeFakeOffer);
const favoritesOffers = offers;
const nearOffers = offers.slice(0, 3);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  [NameSpace.App]: {
    city: DEFAULT_CITY,
    sortType: DEFAULT_SORT_TYPE
  },
  [NameSpace.Comments]: {
    comments: comments,
    fetchStatus: Status.Success,
    postStatus: Status.Success
  },
  [NameSpace.Favorites]: {
    favorites: favoritesOffers,
    fetchStatus: Status.Success
  },
  [NameSpace.NearOffers]: {
    nearOffers: nearOffers,
    status: Status.Success
  },
  [NameSpace.Offer]: {
    offer: offers[0],
    status: Status.Success
  },
  [NameSpace.Offers]: {
    offers: offers,
    status: Status.Success
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    login: userData.email,
    avatarUrl: userData.avatarUrl,
    status: Status.Success
  }
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });
});
