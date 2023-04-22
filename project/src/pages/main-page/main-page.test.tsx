import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import thunk from 'redux-thunk';
import MainPage from './main-page';
import { AuthorizationStatus, DEFAULT_CITY, NameSpace, Status } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);
const offers = [makeFakeOffer()];

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Offers]: {
        offers: offers,
        status: Status.Success
      },
      [NameSpace.App]: {
        city: DEFAULT_CITY
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.Favorites]: {
        favorites: offers,
        fetchStatus: Status.Success
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });
});
