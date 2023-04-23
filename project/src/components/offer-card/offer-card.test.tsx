import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeOffer } from '../../utils/mocks';
import OfferCard from './offer-card';
import { AuthorizationStatus, NameSpace, OfferCardType } from '../../const';

const mockStore = configureMockStore();
const offer = makeFakeOffer();

describe('Component: OfferCard', () => {
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
          <OfferCard offerCardType={OfferCardType.Main} offer={offer} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offer-card')).toBeInTheDocument();
  });
});
