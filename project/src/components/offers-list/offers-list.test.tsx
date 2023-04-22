import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus, NameSpace, OfferCardType } from '../../const';
import OffersList from './offers-list';

const mockStore = configureMockStore();
const offers = [makeFakeOffer()];

describe('Component: OffersList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersList offers={offers} classNames="test" offerCardType={OfferCardType.Main} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
  });
});
