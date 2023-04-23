import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import thunk from 'redux-thunk';
import Page404 from './page-404';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);
const favoriteOffers = [makeFakeOffer()];

describe('Component: Page404', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
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
          <HelmetProvider>
            <Page404 />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
