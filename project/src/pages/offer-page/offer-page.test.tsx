import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace, Status } from '../../const';
import { makeFakeComment, makeFakeOffer } from '../../utils/mocks';
import OfferPage from './offer-page';

const mockStore = configureMockStore([thunk]);
const offers = [makeFakeOffer()];
const comments = [makeFakeComment()];

describe('Component: OfferPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Offers]: {
        offers: offers,
        status: Status.Success
      },
      [NameSpace.Offer]: {
        offer: offers[0],
        status: Status.Success
      },
      [NameSpace.NearOffers]: {
        nearOffers: offers,
        status: Status.Success
      },
      [NameSpace.Comments]: {
        comments: comments,
        fetchStatus: Status.Success
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.Favorites]: {
        favorites: offers,
        fetchStatus: Status.Success
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });
});
