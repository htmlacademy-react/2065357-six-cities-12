import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import FavoritesPage from './favorites-page';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const favoriteOffers = [makeFakeOffer()];

describe('Component: FavoritesPage', () => {
  it('should render correctly when have favorite offers', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Favorites]: {
        favorites: favoriteOffers
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FavoritesPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.queryByText(/Nothing yet saved./i)).not.toBeInTheDocument();
  });

  it('should render correctly when favorite offers list is empty', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Favorites]: {
        favorites: []
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FavoritesPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
