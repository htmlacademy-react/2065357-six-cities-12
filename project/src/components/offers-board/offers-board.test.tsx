import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import OffersBoard from './offers-board';
import { DEFAULT_CITY, DEFAULT_SORT_TYPE, NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();
const offers = [makeFakeOffer()];

describe('Component: OffersBoard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.App]: {
        city: DEFAULT_CITY,
        sortType: DEFAULT_SORT_TYPE
      },
      [NameSpace.Offers]: {
        offers: offers,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersBoard />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offers-board')).toBeInTheDocument();
  });
});
