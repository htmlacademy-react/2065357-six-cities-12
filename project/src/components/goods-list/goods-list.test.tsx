import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeOffer } from '../../utils/mocks';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import GoodsList from './goods-list';

const mockStore = configureMockStore();

describe('Component: GoodsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = makeFakeOffer();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <GoodsList goods={offer.goods} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('goods-list')).toBeInTheDocument();
  });
});
