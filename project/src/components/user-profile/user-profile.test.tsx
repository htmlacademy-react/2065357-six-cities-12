import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { AuthorizationStatus, NameSpace } from '../../const';
import UserProfile from './user-profile';
import { makeFakeOffer } from '../../utils/mocks';

const favoriteOffers = [makeFakeOffer()];
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UserProfile', () => {
  it('should render correctly when user authorizated', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.Favorites]: {
        favorites: favoriteOffers
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserProfile />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render correctly when user no authorizated', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      },
      [NameSpace.Favorites]: {
        favorites: []
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserProfile />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
